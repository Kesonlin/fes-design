
import { h } from 'vue';
import IconWrapper from './IconWrapper';
import type {IconProps} from './IconWrapper';
import './style';

export default (props?: IconProps) => (
    <IconWrapper {...props} >
        <svg width="200" height="200" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M843.861 180.139c183.296 183.296 183.296 480.426 0 663.722s-480.426 183.296-663.722 0-183.296-480.426 0-663.722 480.426-183.296 663.722 0zM522.667 298.667h-21.334A21.333 21.333 0 0 0 480 320v160H320a21.333 21.333 0 0 0-21.333 21.333v21.334A21.333 21.333 0 0 0 320 544h160v160a21.333 21.333 0 0 0 21.333 21.333h21.334A21.333 21.333 0 0 0 544 704V544h160a21.333 21.333 0 0 0 21.333-21.333v-21.334A21.333 21.333 0 0 0 704 480H544V320a21.333 21.333 0 0 0-21.333-21.333z"/></svg>
    </IconWrapper>
);
