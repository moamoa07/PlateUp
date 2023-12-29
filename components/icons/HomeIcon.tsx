import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from '../../types/IconProps';

const HomeIcon = ({ size, fill = '#232323' }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M6 19.0004H9.6923V13.1158H14.3077V19.0004H18V10.0004L12 5.46194L6 10.0004V19.0004ZM5 20.0004V9.50039L12 4.21191L19 9.50039V20.0004H13.3077V14.1158H10.6923V20.0004H5Z"
      fill={fill}
    />
  </Svg>
);

export default HomeIcon;
