import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from '../../types/IconProps';

const ChevronDownIcon = ({ size, fill = '#232323' }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 -960 960 960" fill="none">
    <Path
      d="M480-371.923 267.692-584.231 296-612.539l184 184 184-184 28.308 28.308L480-371.923Z"
      fill={fill}
    />
  </Svg>
);

export default ChevronDownIcon;