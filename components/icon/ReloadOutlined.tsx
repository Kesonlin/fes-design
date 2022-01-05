
import { h } from 'vue';
import IconWrapper from './IconWrapper';
import type {IconProps} from './IconWrapper';
import './style';

export default (props?: IconProps) => (
    <IconWrapper {...props} >
        <svg width="200" height="200" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M512 95.915a414.848 414.848 0 0 1 297.472 125.141V117.461a21.333 21.333 0 0 1 21.333-21.333h21.334a21.333 21.333 0 0 1 21.333 21.333v214.614a21.333 21.333 0 0 1-21.333 21.333H637.525a21.333 21.333 0 0 1-21.333-21.333V310.74a21.333 21.333 0 0 1 21.333-21.333h147.286A352.085 352.085 0 1 0 864.128 512l-.47-14.464-.34-5.845a21.333 21.333 0 0 1 16.085-22.102l4.48-.597h22.101a21.333 21.333 0 0 1 21.333 20.053l.726 18.176.042 4.779c0 229.803-186.282 416.085-416.085 416.085-229.803 0-416.085-186.282-416.085-416.085C95.915 282.197 282.197 95.915 512 95.915z"/></svg>
    </IconWrapper>
);
