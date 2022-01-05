
import { h } from 'vue';
import IconWrapper from './IconWrapper';
import type {IconProps} from './IconWrapper';
import './style';

export default (props?: IconProps) => (
    <IconWrapper {...props} >
        <svg width="200" height="200" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M960 149.419a21.333 21.333 0 0 1 21.333 21.333v682.496A21.333 21.333 0 0 1 960 874.581H64a21.333 21.333 0 0 1-21.333-21.333V170.752A21.333 21.333 0 0 1 64 149.419h896zM670.464 475.86 438.869 748.245a21.333 21.333 0 0 1-32.682-.17l-140.075-168.96-159.488 187.861v43.563h810.71v-43.52L670.463 475.86zm246.87-262.4H106.666v454.571l143.616-169.088a21.333 21.333 0 0 1 32.682.213l139.99 168.918L654.25 396.16a21.333 21.333 0 0 1 32.512 0l230.57 271.83V213.418zM416 277.333a96 96 0 1 1 0 192 96 96 0 0 1 0-192zm0 64a32 32 0 1 0 0 64 32 32 0 0 0 0-64z"/></svg>
    </IconWrapper>
);
