
import { h } from 'vue';
import IconWrapper from './IconWrapper';
import type {IconProps} from './IconWrapper';
import './style';

export default (props?: IconProps) => (
    <IconWrapper {...props} >
        <svg width="200" height="200" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M512 42.667C771.2 42.667 981.333 252.8 981.333 512S771.2 981.333 512 981.333 42.667 771.2 42.667 512 252.8 42.667 512 42.667zm0 626.474a42.667 42.667 0 1 0 0 85.334 42.667 42.667 0 0 0 0-85.334zm0-446.293a161.152 161.152 0 0 0-160.768 150.485l-.17 13.526c0 12.032 9.557 21.546 21.333 21.546h21.632a21.333 21.333 0 0 0 21.333-20.821l.384-16.64a97.152 97.152 0 1 1 169.685 76.672c-7.936 9.173-15.36 14.763-31.573 24.661l-15.616 9.771c-9.813 6.4-16.512 11.648-24.32 19.072-22.187 21.035-33.92 46.848-33.92 75.776v8.661a21.333 21.333 0 0 0 21.333 21.334h21.504a21.333 21.333 0 0 0 21.334-21.206l.085-13.354c1.067-8.96 5.333-16.854 13.739-24.832a103.68 103.68 0 0 1 16.597-12.758l20.267-12.586A160.597 160.597 0 0 0 673.152 384 161.152 161.152 0 0 0 512 222.848z"/></svg>
    </IconWrapper>
);
