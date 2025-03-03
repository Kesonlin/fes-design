import {
    type ComponentObjectPropsOptions,
    defineComponent,
    inject,
    type PropType,
} from 'vue';
import { DownOutlined } from '../../icon';
import FCheckbox from '../../checkbox/checkbox.vue';
import { provideKey } from '../const';
import FRadio from '../../radio';
import Cell from './cell';

import type { ColumnInst } from '../column';

export default defineComponent({
    name: 'FTableBodyTd',
    props: {
        columns: {
            type: Array as PropType<ColumnInst[]>,
            required: true,
        },
        row: {
            type: Object,
            required: true,
        },
        rowIndex: Number,
        column: {
            type: Object as PropType<ColumnInst>,
            required: true,
        },
        columnIndex: Number,
        onClick: Function as PropType<(e: Event) => void>,
    } satisfies ComponentObjectPropsOptions,
    setup(props) {
        const {
            prefixCls,
            getCellSpan,
            getCellClass,
            getCustomCellClass,
            getCellStyle,
            getCustomCellStyle,
            isSelected,
            isSelectDisabled,
            handleSelect,
            handleExpand,
            getCellValue,
        } = inject(provideKey);

        return () => {
            const { row, column, rowIndex, columnIndex } = props;
            const { rowspan, colspan } = getCellSpan(props);
            if (!rowspan || !colspan) {
                return null;
            }
            return (
                <td
                    rowspan={rowspan}
                    colspan={colspan}
                    style={[
                        getCellStyle({
                            row,
                            column,
                            columns: props.columns,
                        }),
                        getCustomCellStyle({
                            row,
                            column,
                            rowIndex,
                            columnIndex,
                        }),
                    ]}
                    class={[
                        `${prefixCls}-td`,
                        ...getCellClass({
                            column,
                            columns: props.columns,
                        }),
                        ...getCustomCellClass({
                            row,
                            column,
                            rowIndex,
                            columnIndex,
                        }),
                    ]}
                    onClick={props.onClick}
                >
                    {column.props.type === 'default' && (
                        <Cell
                            row={row}
                            rowIndex={rowIndex}
                            column={column}
                            columnIndex={columnIndex}
                            cellValue={getCellValue(row, column)}
                        />
                    )}
                    {column.props.type === 'selection' && (
                        <div class={`${prefixCls}-center`}>
                            {column.props.multiple ? (
                                <FCheckbox
                                    modelValue={isSelected({ row })}
                                    disabled={isSelectDisabled({ row })}
                                    onChange={() => {
                                        handleSelect({ row });
                                    }}
                                />
                            ) : (
                                <FRadio
                                    modelValue={isSelected({ row })}
                                    disabled={isSelectDisabled({ row })}
                                    onChange={() => {
                                        handleSelect({ row });
                                    }}
                                ></FRadio>
                            )}
                        </div>
                    )}
                    {column.props.type === 'expand' && (
                        <div class={`${prefixCls}-center`}>
                            <DownOutlined
                                class={`${prefixCls}-expand-icon`}
                                onClick={() => {
                                    handleExpand({ row });
                                }}
                            />
                        </div>
                    )}
                </td>
            );
        };
    },
});
