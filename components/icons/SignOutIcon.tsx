import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from '../../types/IconProps';

const SignOutIcon = ({ size, fill = '#232323' }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M224.615-160Q197-160 178.5-178.5 160-197 160-224.615v-510.77Q160-763 178.5-781.5 197-800 224.615-800h256.154v40H224.615q-9.23 0-16.923 7.692Q200-744.615 200-735.385v510.77q0 9.23 7.692 16.923Q215.385-200 224.615-200h256.154v40H224.615Zm433.846-178.461-28.077-28.77L723.154-460H367.692v-40h355.462l-92.77-92.769 28.077-28.77L800-480 658.461-338.461Z"
      fill={fill}
    />
  </Svg>
);

export default SignOutIcon;
