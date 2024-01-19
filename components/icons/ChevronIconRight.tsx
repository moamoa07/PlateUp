import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from '../../types/IconProps';

const ChevronRightIcon = ({ size, fill = '#232323' }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 -960 960 960" fill="none">
    <Path
      d="m531.692-480-184-184L376-692.308 588.308-480 376-267.692 347.692-296l184-184Z"
      fill={fill}
    />
  </Svg>
);

export default ChevronRightIcon;