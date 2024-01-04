import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from '../../types/IconProps';

const HelpIcon = ({ size, fill = '#232323' }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12.028 17.2308C12.2491 17.2308 12.4356 17.1545 12.5875 17.0018C12.7394 16.8492 12.8154 16.6623 12.8154 16.4412C12.8154 16.2202 12.7391 16.0337 12.5864 15.8817C12.4338 15.7298 12.2469 15.6538 12.0259 15.6538C11.8048 15.6538 11.6183 15.7302 11.4663 15.8828C11.3144 16.0355 11.2384 16.2223 11.2384 16.4434C11.2384 16.6645 11.3148 16.851 11.4674 17.0029C11.6201 17.1548 11.8069 17.2308 12.028 17.2308ZM11.5115 13.9192H12.4769C12.5026 13.4846 12.5843 13.1314 12.7221 12.8596C12.8599 12.5878 13.1436 12.241 13.5731 11.8192C14.0192 11.3731 14.3513 10.9734 14.5692 10.6202C14.7872 10.267 14.8962 9.85816 14.8962 9.39373C14.8962 8.60559 14.6192 7.97755 14.0654 7.5096C13.5116 7.04165 12.8565 6.80768 12.1 6.80768C11.3808 6.80768 10.7702 7.00319 10.2683 7.39422C9.76634 7.78526 9.39871 8.23462 9.16537 8.7423L10.0846 9.12307C10.2449 8.75897 10.474 8.43718 10.7721 8.1577C11.0702 7.8782 11.5 7.73845 12.0616 7.73845C12.7103 7.73845 13.184 7.91634 13.4827 8.27213C13.7814 8.62789 13.9308 9.01923 13.9308 9.44615C13.9308 9.7923 13.8372 10.1016 13.65 10.374C13.4628 10.6465 13.2192 10.9205 12.9192 11.1962C12.3397 11.7308 11.9603 12.184 11.7808 12.5558C11.6013 12.9276 11.5115 13.382 11.5115 13.9192ZM12.0034 21C10.7588 21 9.58872 20.7638 8.4931 20.2915C7.39748 19.8192 6.44444 19.1782 5.63397 18.3685C4.82352 17.5588 4.18192 16.6066 3.70915 15.5121C3.23638 14.4175 3 13.2479 3 12.0034C3 10.7588 3.23616 9.58872 3.70848 8.4931C4.18081 7.39748 4.82183 6.44444 5.63153 5.63398C6.44123 4.82353 7.39337 4.18192 8.48795 3.70915C9.58255 3.23638 10.7521 3 11.9967 3C13.2412 3 14.4113 3.23616 15.5069 3.70847C16.6025 4.18081 17.5556 4.82182 18.366 5.63152C19.1765 6.44122 19.8181 7.39337 20.2908 8.48795C20.7636 9.58255 21 10.7521 21 11.9967C21 13.2412 20.7638 14.4113 20.2915 15.5069C19.8192 16.6025 19.1782 17.5556 18.3685 18.366C17.5588 19.1765 16.6066 19.8181 15.5121 20.2909C14.4175 20.7636 13.2479 21 12.0034 21ZM12 20C14.2333 20 16.125 19.225 17.675 17.675C19.225 16.125 20 14.2333 20 12C20 9.76667 19.225 7.875 17.675 6.325C16.125 4.775 14.2333 4 12 4C9.76667 4 7.875 4.775 6.325 6.325C4.775 7.875 4 9.76667 4 12C4 14.2333 4.775 16.125 6.325 17.675C7.875 19.225 9.76667 20 12 20Z"
      fill={fill}
    />
  </Svg>
);

export default HelpIcon;