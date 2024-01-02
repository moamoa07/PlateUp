import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from '../../types/IconProps';

const BookmarkIcon = ({ size, fill = '#232323' }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M240-180v-563.334q0-24.179 16.942-41.32 16.942-17.141 41.519-17.141h363.078q24.577 0 41.519 17.141Q720-767.513 720-743.334V-180L480-283.077 240-180Zm33.846-52.615L480-320.718l206.154 88.103v-510.719q0-9.231-7.692-16.923-7.692-7.692-16.923-7.692H298.461q-9.231 0-16.923 7.692-7.692 7.692-7.692 16.923v510.719Zm0-535.334h412.308-412.308Z"
      fill={fill}
    />
  </Svg>
);

export default BookmarkIcon;
