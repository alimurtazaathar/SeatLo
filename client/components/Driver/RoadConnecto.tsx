import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Circle, Line } from 'react-native-svg';

const RoadConnector = ({ height = 80}) => {
  return (
    <Svg height={height} width={30} style={{}}>
       
      <Circle cx={15} cy={20} r={5} fill="#f8ce59" />
      <Line
        x1={15}
        y1={20}
        x2={15}
        y2={height-5}
        stroke="#f8ce59"
        strokeWidth={2}
        strokeDasharray="5,5"
      />
    </Svg>
  );
};

export default RoadConnector;