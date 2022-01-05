
import { h } from 'vue';
import IconWrapper from './IconWrapper';
import type {IconProps} from './IconWrapper';
import './style';

export default (props?: IconProps) => (
    <IconWrapper {...props} >
        <svg width="200" height="200" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M209.493 542.25 512 239.745l302.507 302.507a21.333 21.333 0 0 0 30.208 0l15.061-15.104a21.333 21.333 0 0 0 0-30.166L527.104 164.267a21.333 21.333 0 0 0-30.208 0L164.266 496.98a21.333 21.333 0 0 0 0 30.166l15.062 15.104a21.333 21.333 0 0 0 30.165 0zm0 317.44L512 557.228l302.507 302.506a21.333 21.333 0 0 0 30.208 0l15.061-15.061a21.333 21.333 0 0 0 0-30.165L527.104 481.792a21.333 21.333 0 0 0-30.208 0l-332.63 332.715a21.333 21.333 0 0 0 0 30.165l15.062 15.104a21.333 21.333 0 0 0 30.165 0z"/></svg>
    </IconWrapper>
);
