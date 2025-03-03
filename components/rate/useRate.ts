import { computed, ref } from 'vue';
import { type RateItem, type RateInnerProps } from './props';

export const useRate = (props: RateInnerProps, emit: any) => {
    const rateItemArr = ref<RateItem[]>([]);

    const isHover = ref(false);

    // 根据props 生成评分数组
    const getRateArr = () => {
        const res: RateItem[] = [];
        // 向下取整是满星数 Math.floor(null) 为 0
        const fullStarsNum = Math.floor(props.modelValue);
        // 半星数最多为1
        const halfStar = props.modelValue
            ? Math.floor(props.modelValue) === props.modelValue
                ? 0
                : 1
            : 0;

        const emptyStarsNum = props.count - fullStarsNum - halfStar;
        fullStarsNum &&
            [...Array(fullStarsNum)].map(() => {
                res.push({
                    active: true,
                    hover: true,
                });
            });
        // 存在半星情况
        if (halfStar) {
            res.push({
                active: true,
                hover: true,
                half: true,
            });
        }

        if (emptyStarsNum >= 0) {
            [...Array(emptyStarsNum)].map(() => {
                res.push({
                    active: false,
                });
            });
        }

        rateItemArr.value = res;
    };

    const clearRate = () => {
        rateItemArr.value = rateItemArr.value.map(() => {
            return {
                active: false,
            };
        });
    };

    const curActiveIndex = computed(() => {
        if (!props.allowHalf) {
            return props.modelValue - 1;
        } else {
            return Math.ceil(props.modelValue) - 1;
        }
    });

    // 判断是否能取消
    const handleHalfClearable = (isLeft: boolean, index: number) => {
        if (props.clearable && !isLeft && props.modelValue === index + 1) {
            return true;
        }
        // 半星可以取消的场景
        if (props.clearable && isLeft && props.modelValue === index + 0.5) {
            return true;
        }

        return false;
    };

    // 点击事件，点击的第几个，第几个之前的全亮
    const rateClick = (event: MouseEvent, index: number) => {
        const target = event.currentTarget as HTMLElement;
        const halfWidth = target.offsetWidth / 2;
        // 非半星模式不做判断
        const isLeft = props.allowHalf ? event.offsetX <= halfWidth : false;

        const newValue = isLeft ? index + 0.5 : index + 1;

        // 设定 clearable 后，点击当前值对应的图标后值会被设为null。
        if (handleHalfClearable(isLeft, index)) {
            clearRate();
            emit('update:modelValue', null);
            // clear事件也会触发change事件
            emit('change', null);
            emit('clear');
            return;
        }

        if (newValue !== props.modelValue) {
            emit('change', newValue);
            // 改变value值，视图的rateItemArr会自动变更
            emit('update:modelValue', newValue);
        }
    };

    // hover 会改变rate组件的展示，但是只要不点击，鼠标移开后仍然维持原状
    const hoverMove = (event: MouseEvent, curIndex: number) => {
        const target = event.currentTarget as HTMLElement;
        const halfWidth = target.offsetWidth / 2;
        // 非半星模式不做判断
        const isLeft = props.allowHalf ? event.offsetX <= halfWidth : false;

        rateItemArr.value.forEach((item, i) => {
            if (i < curIndex) {
                rateItemArr.value[i] = {
                    ...item,
                    hover: true,
                    half: false,
                };
            }
            if (i === curIndex) {
                rateItemArr.value[i] = {
                    ...item,
                    hover: true,
                    half: isLeft,
                };
            }
            if (i > curIndex) {
                rateItemArr.value[i] = {
                    ...item,
                    hover: false,
                    half: false,
                };
            }
        });
    };

    const hoverLeave = () => {
        rateItemArr.value = rateItemArr.value.map((item, index) => {
            if (
                index === curActiveIndex.value &&
                Math.floor(props.modelValue) !== props.modelValue
            ) {
                // 半星场景 hover离开
                return {
                    ...item,
                    half: true,
                };
            }
            return {
                ...item,
                half: false,
            };
        });
    };

    return {
        rateItemArr,
        isHover,
        curActiveIndex,
        getRateArr,
        rateClick,
        hoverLeave,
        hoverMove,
    };
};
