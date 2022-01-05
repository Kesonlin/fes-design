
import { h } from 'vue';
import IconWrapper from './IconWrapper';
import type {IconProps} from './IconWrapper';
import './style';

export default (props?: IconProps) => (
    <IconWrapper {...props} >
        <svg width="200" height="200" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M512 42.667C771.2 42.667 981.333 252.8 981.333 512S771.2 981.333 512 981.333 42.667 771.2 42.667 512 252.8 42.667 512 42.667zm140.288 307.925a17.067 17.067 0 0 0-24.15 0L512 466.731 395.861 350.592a17.067 17.067 0 0 0-24.149 0l-21.12 21.12a17.067 17.067 0 0 0 0 24.15L466.731 512 350.592 628.139a17.067 17.067 0 0 0 0 24.149l21.12 21.12a17.067 17.067 0 0 0 24.15 0L512 557.227l116.139 116.181a17.067 17.067 0 0 0 24.149 0l21.12-21.12a17.067 17.067 0 0 0 0-24.15L557.227 512l116.181-116.139a17.067 17.067 0 0 0 0-24.149z"/></svg>
    </IconWrapper>
);
