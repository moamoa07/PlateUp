import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from '../../types/IconProps';

const EatIcon = ({ size, fill = '#232323' }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M7.49969 21.5V12.4654C6.72661 12.3474 6.0718 11.993 5.53527 11.4019C4.99874 10.8109 4.73047 10.0872 4.73047 9.23078V2.5H5.73047V9.23078H7.49969V2.5H8.49969V9.23078H10.2689V2.5H11.2689V9.23078C11.2689 10.0872 11.0007 10.8109 10.4641 11.4019C9.92759 11.993 9.27278 12.3474 8.49969 12.4654V21.5H7.49969ZM16.7305 21.5V13.5H14.2689V7C14.2689 5.8859 14.5833 4.89904 15.2122 4.03943C15.841 3.17981 16.6805 2.67948 17.7305 2.53845V21.5H16.7305Z"
      fill={fill}
    />
  </Svg>
);

export default EatIcon;
