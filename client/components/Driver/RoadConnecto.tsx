import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Circle, Line } from 'react-native-svg';

interface RoadConnectorProps {
  height?: number;
  isFirst?: boolean;
  isLast?: boolean;
}

const RoadConnector: React.FC<RoadConnectorProps> = ({ 
  height = 50, 
  isFirst = false, 
  isLast = false 
}) => {
  return (
    <Svg height={height} width={30}>
      {/* Top line (only if not the first item) */}
      {!isFirst && (
        <Line
          x1={15}
          y1={0}
          x2={15}
          y2={20}
          stroke="#f8ce59"
          strokeWidth={2}
          strokeDasharray="4,4"
        />
      )}
      
      {/* Middle circle */}
      <Circle cx={15} cy={20} r={5} fill={"#f8ce59"} />
      
      {/* Bottom line (only if not the last item) */}
      {!isLast && (
        <Line
          x1={15}
          y1={20}
          x2={15}
          y2={height}
          stroke="#f8ce59"
          strokeWidth={2}
           strokeDasharray="4,4"
        />
      )}
    </Svg>
  );
};

export default RoadConnector;