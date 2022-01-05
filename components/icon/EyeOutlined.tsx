
import { h } from 'vue';
import IconWrapper from './IconWrapper';
import type {IconProps} from './IconWrapper';
import './style';

export default (props?: IconProps) => (
    <IconWrapper {...props} >
        <svg width="200" height="200" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M512 149.461c162.688 0 302.08 91.051 418.048 273.11l12.715 20.565 12.16 20.95 15.146 27.22 5.718 10.497a21.333 21.333 0 0 1 0 20.394l-16.214 29.44-13.226 23.04-7.168 11.947C821.419 778.112 678.997 873.856 512 873.856c-166.4 0-308.31-95.019-425.813-285.056l-10.24-17.067-17.366-30.72-10.368-18.773a21.333 21.333 0 0 1 0-20.48l19.2-34.645 11.52-20.139 6.4-10.581C203.008 245.077 345.26 149.46 512 149.46zm0 64c-148.992 0-277.59 91.179-387.627 282.454l-9.088 16.042.427.726c109.184 196.394 236.97 292.437 385.152 297.002l11.136.171c148.992 0 277.632-91.008 387.67-281.899l9.002-16-.427-.768c-109.184-196.778-236.97-292.992-385.109-297.557l-11.136-.17zm0 127.872a170.667 170.667 0 1 1 0 341.334 170.667 170.667 0 0 1 0-341.334zm0 64a106.667 106.667 0 1 0 0 213.334 106.667 106.667 0 0 0 0-213.334z"/></svg>
    </IconWrapper>
);
