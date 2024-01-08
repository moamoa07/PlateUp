import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from '../../types/IconProps';

const RemoveIcon = ({ size, fill = '#232323' }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M6.39911 18.3078L5.69141 17.6001L11.2914 12.0001L5.69141 6.40008L6.39911 5.69238L11.9991 11.2924L17.5991 5.69238L18.3068 6.40008L12.7068 12.0001L18.3068 17.6001L17.5991 18.3078L11.9991 12.7078L6.39911 18.3078Z"
      fill={fill}
    />
  </Svg>
);

export default RemoveIcon;
