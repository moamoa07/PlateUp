import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from '../../types/IconProps';

const SignOutIcon = ({ size, fill = '#232323' }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M5.61538 20C5.15513 20 4.77083 19.8458 4.4625 19.5375C4.15417 19.2292 4 18.8449 4 18.3846V5.61537C4 5.15512 4.15417 4.77083 4.4625 4.4625C4.77083 4.15417 5.15513 4 5.61538 4H12.0192V5H5.61538C5.46154 5 5.32052 5.0641 5.1923 5.1923C5.0641 5.32052 5 5.46154 5 5.61537V18.3846C5 18.5385 5.0641 18.6795 5.1923 18.8077C5.32052 18.9359 5.46154 19 5.61538 19H12.0192V20H5.61538ZM16.4615 15.5385L15.7596 14.8192L18.0789 12.5H9.1923V11.5H18.0789L15.7596 9.18078L16.4615 8.46153L20 12L16.4615 15.5385Z"
      fill={fill}
    />
  </Svg>
);

export default SignOutIcon;
