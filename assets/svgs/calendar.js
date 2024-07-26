import React from 'react';
import Svg, { Path } from 'react-native-svg';

const MySvgImage = (props) => (
  <Svg
    width={props.width || 100}
    height={props.height || 100}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <Path
      d="M10 10 H 90 V 90 H 10 L 10 10"
      stroke="black"
      strokeWidth="2"
    />
    {/* Add more SVG elements here */}
  </Svg>
);

export default MySvgImage;
