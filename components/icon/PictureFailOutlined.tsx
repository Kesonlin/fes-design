
import { h } from 'vue';
import IconWrapper from './IconWrapper';
import type {IconProps} from './IconWrapper';
import './style';

export default (props?: IconProps) => (
    <IconWrapper {...props} >
        <svg width="200" height="200" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="m496.64 88.619 465.365 52.309a21.333 21.333 0 0 1 18.859 23.04L915.797 907.52a21.333 21.333 0 0 1-23.125 19.413l-470.4-41.173a21.333 21.333 0 0 1-19.285-18.56l-20.139-158.165.17-.427 21.163-233.941-165.12-182.528a21.333 21.333 0 0 1-4.266-21.547l38.784-107.605-162.091 19.968 45.739 522.922 163.072-25.472a21.333 21.333 0 0 1 23.466 14.038l1.024 4.565 2.432 21.163a21.333 21.333 0 0 1-17.92 23.552l-166.485 26.026 8.107 92.8 175.232-30.634a21.333 21.333 0 0 1 23.722 13.653l1.152 4.779 2.56 20.864a21.333 21.333 0 0 1-17.749 23.68L135.68 930.56a21.333 21.333 0 0 1-24.49-17.621L44.202 147.584a21.333 21.333 0 0 1 18.602-23.04l278.187-34.261a21.333 21.333 0 0 1 22.57 28.757l-51.37 135.253L472.362 435.2a21.333 21.333 0 0 1 5.206 16.683l-12.587 105.301 87.382-161.493-140.374-146.603a21.333 21.333 0 0 1-3.37-24.875l66.816-124.458a21.333 21.333 0 0 1 21.162-11.094zM453.035 751.7l7.594 73.174 395.094 34.56 5.717-65.408L453.035 751.7zm65.578-597.248-37.632 70.4L629.973 379.52a21.333 21.333 0 0 1 3.2 25.301L472.62 689.451l394.41 40.874 46.294-528.938-394.667-46.976zM767.66 264.96a55.979 55.979 0 1 1 0 112 55.979 55.979 0 0 1 0-112z"/></svg>
    </IconWrapper>
);
