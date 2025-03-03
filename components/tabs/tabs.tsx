import {
    computed,
    defineComponent,
    nextTick,
    provide,
    ref,
    toRef,
    TransitionGroup,
    watch,
    onMounted,
    type ComponentPublicInstance,
    type Slots,
} from 'vue';
import {
    CLOSE_EVENT,
    CHANGE_EVENT,
    UPDATE_MODEL_EVENT,
} from '../_util/constants';
import getPrefixCls from '../_util/getPrefixCls';
import { useNormalModel } from '../_util/use/useModel';
import useScrollX from '../_util/use/useScrollX';
import { flatten } from '../_util/vnode';
import { useTheme } from '../_theme/useTheme';
import PlusOutlined from '../icon/PlusOutlined';
import { TABS_INJECTION_KEY } from './constants';
import { computeTabBarStyle, mapTabPane } from './helper';
import FTab from './tab';
import TabPane from './tab-pane.vue';
import { tabsProps } from './props';
import type { Value } from './interface';

const prefixCls = getPrefixCls('tabs');
const ADD_EVENT = 'add';

export default defineComponent({
    name: 'FTabs',
    props: tabsProps,
    emits: [UPDATE_MODEL_EVENT, CHANGE_EVENT, CLOSE_EVENT, ADD_EVENT],
    setup(props, ctx) {
        useTheme();
        const tabPaneLazyCache: Record<string, boolean> = {};
        const tabRefs = ref([]);
        const isScroll = ref(false);
        const [currentValue, updateCurrentValue] = useNormalModel(
            props,
            ctx.emit,
        );
        const tabsLength = ref(0);
        const isCard = computed(() => props.type === 'card');
        const position = computed(() =>
            isCard.value ? 'top' : props.position,
        );

        const showBeforeScrollBar = ref(false);
        const showAfterScrollBar = ref(false);
        const tabNavRef = ref(null);

        onMounted(() => {
            if (!tabNavRef.value) return;
            useScrollX(tabNavRef);
        });

        const barStyle = ref({});

        function setTabRefs(el?: ComponentPublicInstance, index?: number) {
            if (el) tabRefs.value[index] = el;
        }

        function handleTabClick(key: Value) {
            updateCurrentValue(key);
            ctx.emit(CHANGE_EVENT, key);
        }

        function handleAddClick(event: Event) {
            ctx.emit(ADD_EVENT, event);
        }

        function handleClose(key: Value) {
            ctx.emit(CLOSE_EVENT, key);
        }

        function handleTabNavScroll(event?: Event) {
            event?.preventDefault();
            if (!tabNavRef.value) return;
            if (!isScroll.value) return;
            const {
                scrollWidth,
                scrollHeight,
                scrollLeft,
                scrollTop,
                offsetWidth,
                offsetHeight,
            } = tabNavRef.value;

            showBeforeScrollBar.value = scrollLeft > 0 || scrollTop > 0;
            showAfterScrollBar.value =
                // 猜测可能是浏览器触发 scroll 事件的时机不一致，此处允许 1px 的误差
                Math.abs(scrollLeft + offsetWidth - scrollWidth) > 1 ||
                Math.abs(scrollTop + offsetHeight - scrollHeight) > 1;
        }

        function autoScrollTab(el?: HTMLElement) {
            if (!tabNavRef.value || !el) return;
            if (!isScroll.value) return;
            const { scrollLeft, scrollTop, offsetWidth, offsetHeight } =
                tabNavRef.value;
            if (
                ['top', 'bottom'].includes(props.position) &&
                (scrollLeft + offsetWidth < el.offsetLeft + el.offsetWidth ||
                    el.offsetLeft < scrollLeft)
            ) {
                tabNavRef.value.scrollTo({
                    left: el.offsetLeft - offsetWidth + el.offsetWidth,
                });
            } else if (
                ['left', 'right'].includes(props.position) &&
                (scrollTop + offsetHeight < el.offsetTop + el.offsetHeight ||
                    el.offsetTop < scrollTop)
            ) {
                tabNavRef.value.scrollTo({
                    top: el.offsetTop - offsetHeight + el.offsetHeight,
                });
            }
            handleTabNavScroll();
        }

        // 当没有默认值时，设置第一项为默认值，在Tab组件调用
        const setDefaultValue = (value: Value) => {
            if (!currentValue.value && currentValue.value !== 0) {
                updateCurrentValue(value);
            }
        };

        provide(TABS_INJECTION_KEY, {
            valueRef: currentValue,
            closableRef: toRef(props, 'closable'),
            closeModeRef: toRef(props, 'closeMode'),
            isCard,
            tabsLength,
            handleTabClick,
            handleClose,
            setDefaultValue,
        });

        watch(
            () => [currentValue.value, position.value],
            () => {
                nextTick(() => {
                    const tab = tabRefs.value.find(
                        (item) => item.value === currentValue.value,
                    );
                    if (!isCard.value) {
                        barStyle.value = computeTabBarStyle(
                            tab?.$el,
                            position.value,
                        );
                    }
                    autoScrollTab(tab?.$el);
                });
            },
            { immediate: true },
        );

        watch(tabsLength, () => {
            nextTick(() => {
                if (!tabNavRef.value) return;
                const { scrollWidth, offsetWidth, scrollHeight, offsetHeight } =
                    tabNavRef.value;
                if (scrollWidth > offsetWidth || scrollHeight > offsetHeight) {
                    isScroll.value = true;
                }
            });
        });

        const mergeRenderPans = () => {
            const children =
                (ctx.slots.default &&
                    flatten(ctx.slots.default()).filter(
                        (vNode) => (vNode.type as any).name === 'FTabPane',
                    )) ||
                [];
            if (props.panes?.length) {
                return children.concat(
                    props.panes.map((pane) => {
                        const { render, renderTab, ...paneProps } = pane;
                        if (!render) {
                            console.warn('[FTab]: panes需要提供render');
                        }
                        const slots: Slots = {
                            default: () => render?.(paneProps),
                            tab: renderTab ? () => renderTab(paneProps) : null,
                        };
                        return (
                            <TabPane
                                {...paneProps}
                                value={paneProps.value}
                                v-slots={slots}
                            />
                        );
                    }),
                );
            }
            return children;
        };

        return () => {
            const children = mergeRenderPans();

            let navItems = children.map((vNode, index) => {
                const tabSlot = (vNode.children as any)?.tab;
                return (
                    <FTab
                        {...(vNode.props as any)}
                        ref={(el: ComponentPublicInstance) =>
                            setTabRefs(el, index)
                        }
                        v-slots={{ default: tabSlot }}
                    />
                );
            });
            if (isCard.value) {
                if (props.addable) {
                    navItems.push(
                        <div
                            onClick={handleAddClick}
                            class={`${prefixCls}-tab ${prefixCls}-tab-card addable`}
                        >
                            <PlusOutlined />
                        </div>,
                    );
                }
                // 添加 card pad
                navItems = navItems
                    .map((item, index) => [
                        item,
                        <div
                            class={
                                index !== navItems.length - 1
                                    ? `${prefixCls}-tab-pad`
                                    : `${prefixCls}-tab-pad--last`
                            }
                        />,
                    ])
                    .flat(1);
            }

            return (
                <div
                    class={{
                        [`${prefixCls}`]: true,
                        [`${prefixCls}-${position.value}`]: true,
                        [`${prefixCls}-card`]: isCard.value,
                    }}
                >
                    <div class={`${prefixCls}-nav`}>
                        {ctx.slots.prefix && (
                            <div class={`${prefixCls}-nav-prefix`}>
                                {ctx.slots.prefix()}
                            </div>
                        )}
                        <div
                            class={{
                                [`${prefixCls}-nav-wrapper`]: true,
                                [`${prefixCls}-nav-wrapper--before`]:
                                    showBeforeScrollBar.value,
                                [`${prefixCls}-nav-wrapper--after`]:
                                    showAfterScrollBar.value,
                            }}
                        >
                            <div
                                class={`${prefixCls}-nav-scroll`}
                                onScroll={handleTabNavScroll}
                                ref={tabNavRef}
                            >
                                {navItems}
                                {!isCard.value && (
                                    <div
                                        class={`${prefixCls}-nav-bar`}
                                        style={barStyle.value}
                                    ></div>
                                )}
                            </div>
                        </div>
                        {ctx.slots.suffix && (
                            <div class={`${prefixCls}-nav-suffix`}>
                                {ctx.slots.suffix()}
                            </div>
                        )}
                    </div>
                    <div class={`${prefixCls}-tab-pane-wrapper`}>
                        <TransitionGroup
                            name={
                                props.transition
                                    ? props.transition === true
                                        ? `${prefixCls}-slide-fade`
                                        : props.transition
                                    : null
                            }
                        >
                            {mapTabPane(
                                children,
                                currentValue.value,
                                tabPaneLazyCache,
                            )}
                        </TransitionGroup>
                    </div>
                </div>
            );
        };
    },
});
