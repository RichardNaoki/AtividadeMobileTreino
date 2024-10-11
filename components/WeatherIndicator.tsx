import React from 'react';
import { View, StyleSheet } from 'react-native';

const WeatherIndicator: React.FC = () => {
  return (
    <View style={styles.weatherIndicator}>
      <View style={[styles.indicatorDot, { backgroundColor: 'green' }]} />
      <View style={[styles.indicatorDot, { backgroundColor: 'gray' }]} />
      <View style={[styles.indicatorDot, { backgroundColor: 'gray' }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  weatherIndicator: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  indicatorDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
});

export default WeatherIndicator;