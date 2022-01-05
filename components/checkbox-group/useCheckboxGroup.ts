import { provide, unref, watch } from 'vue';
import { checkboxGroupKey, name } from './const';
import { useArrayModel } from '../_util/use/useModel';
import useFormAdaptor from '../_util/use/useFormAdaptor';
import { CHANGE_EVENT } from '../_util/constants';
import useFormGroupResetter from '../_util/use/useFormGroupResetter';

import type { CheckboxGroupProps, CheckboxGroupEmits } from './interface';

export const useCheckboxGroup = (
    props: CheckboxGroupProps,
    emit: CheckboxGroupEmits,
) => {
    useFormGroupResetter();
    const { validate } = useFormAdaptor('array');

    const [currentValue, updateItem] = useArrayModel(props, emit);

    watch(currentValue, () => {
        emit(CHANGE_EVENT, currentValue.value);
        validate(CHANGE_EVENT);
    });

    const isSelect = (value: string | number | boolean) => {
        const groupVal = unref(currentValue);
        const itemVal = unref(value);
        if (groupVal === null || itemVal === null) {
            return false;
        }
        return groupVal.includes(itemVal);
    };

    const onSelect = (value: string | number | boolean) => {
        updateItem(unref(value));
    };

    provide(checkboxGroupKey, {
        name,
        isSelect,
        onSelect,
        props,
    });
};
