import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface WeatherCardProps {
  country: string;
  city: string;
  weather: string;
  temperature: number;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ country, city, weather, temperature }) => {
  return (
    <View style={styles.cardContainer}>
      <Text style={styles.cardTitle}>{city}, {country}</Text>
      <View style={styles.cardInfo}>
        <Text style={styles.cardWeather}>{weather}</Text>
        <Text style={styles.cardTemperature}>{temperature}°C</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#6959CD',
    padding: 40,
    borderRadius: 34, // Ajuste este valor para controlar o arredondamento
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'white',
  },
  cardInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardWeather: {
    fontSize: 16,
    marginTop:20,
    color: 'white',
  },
  cardTemperature: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default WeatherCard;