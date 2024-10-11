import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import WeatherCard from './components/WeatherCard';
import { useNavigation, NavigationProp } from '@react-navigation/native';

const { width } = Dimensions.get('window');

type RootStackParamList = {
  Search: undefined;
  Weather: undefined;
};

interface CityWeatherData {
  id: number;
  name: string;
  sys: {
    country: string;
  };
  weather: {
    main: string;
  }[];
  main: {
    temp: number;
  };
}

const WeatherPage: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [weatherData, setWeatherData] = useState<CityWeatherData[]>([]);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await fetch(
          'https://api.openweathermap.org/data/2.5/group?id=3451190,5128581,1850147&appid=f6965a53c6428a31d70d4d5ab157c7b3&units=metric'
        );
        const data = await response.json();

        // Log the API response to inspect its structure
        console.log('API Response:', data); 

        // Correctly access weather data from the API response
        setWeatherData(data.list); // Access weather data from 'list' property

        // Log the weatherData state for debugging
        console.log('weatherData:', weatherData); 
      } catch (error) {
        console.error('Erro ao buscar dados do tempo:', error);
      }
    };

    fetchWeatherData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Olá User,</Text>
          <Text style={styles.greeting}>Descubra o clima</Text>
        </View>
        <TouchableOpacity style={styles.globeIcon}>
          <FontAwesomeIcon icon={faGlobe} size={20} color="#000" />
        </TouchableOpacity>
      </View>
      <View style={styles.searchButtonContainer}>
        <TouchableOpacity style={styles.searchButton} onPress={() => navigation.navigate('Search')}>
          <Text style={styles.searchButtonText}>Pesquise por uma cidade</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>Ao redor do mundo</Text>
      <ScrollView style={styles.weatherCards} contentContainerStyle={styles.weatherCardsContent}> 
        {Array.isArray(weatherData) && weatherData.length > 0 ? ( 
           weatherData.map((cityData) => (
             <WeatherCard
               key={cityData.id}
               country={cityData.sys.country}
               city={cityData.name}
               weather={cityData.weather[0].main}
               temperature={cityData.main.temp}
             />
           ))
         ) : (
           <Text>Carregando dados do tempo...</Text>
         )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  greeting: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  globeIcon: {
    padding: 10,
  },
  searchButtonContainer: {
    alignItems: 'center', // Alinha o botão para a direita
    marginTop: 30,
  },
  searchButton: {
    backgroundColor: '#6959CD',
    padding: 20,
    borderRadius: 30,
    marginVertical: 20,
    width: '90%', // Ajustado para responsividade
  },
  searchButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 60,
    marginBottom: 10,
    color: 'black',
    textAlign: 'left', // Centralizado
    width: '90%', // Ajustado para responsividade
  },
  weatherCards: {
    flexDirection: 'column',
    flex: 1, 
  },
  weatherCardsContent: {
    justifyContent: 'space-between',
  },
  cardContainer: {
    backgroundColor: '#F0F0F0',
    padding: 20,
    borderRadius: 20, 
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: '90%', // Ajustado para responsividade
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#6C4AB6',
  },
  cardInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardWeather: {
    fontSize: 16,
    color: '#6C4AB6',
  },
  cardTemperature: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6C4AB6',
  },
});

export default WeatherPage;