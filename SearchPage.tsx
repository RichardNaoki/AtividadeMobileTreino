import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ScrollView, Dimensions, KeyboardAvoidingView, Platform, Keyboard } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import Geolocation from 'react-native-geolocation-service';

const { width } = Dimensions.get('window');

type RootStackParamList = {
  Search: undefined;
  Weather: undefined;
};

const SearchPage: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState<any>(null);
  const inputRef = useRef<TextInput>(null); // Referência para o TextInput

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=f6965a53c6428a31d70d4d5ab157c7b3` // Use a API de cidade aqui
      );
      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      console.error('Erro ao buscar dados do tempo:', error);
    }
  };

  useEffect(() => {
    // Adicionando listener para o evento "Enter" do teclado
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        // Quando o teclado aparecer, focar no TextInput
        inputRef.current?.focus();
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        // Quando o teclado desaparecer, desfocar do TextInput
        inputRef.current?.blur();
      }
    );

    // Limpar os listeners quando o componente for desmontado
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const handleKeyPress = (event: any) => {
    // Verifica se a tecla pressionada é "Enter"
    if (event.nativeEvent.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.searchInputContainer}>
        <View style={styles.searchInput}>
          <TextInput
            ref={inputRef} // Definindo a referência para o TextInput
            style={styles.textInput}
            placeholder="Digite aqui"
            placeholderTextColor="#fff" 
            value={city}
            onChangeText={setCity}
            onKeyPress={handleKeyPress} // Adicionando o listener para o evento "Enter"
          />
        </View>

        <TouchableOpacity onPress={handleSearch} style={styles.searchButton}>
          <FontAwesomeIcon icon={faMagnifyingGlass} size={16} color="#000" />
        </TouchableOpacity> 
      </View>

      <ScrollView style={styles.scrollView}>
        {weatherData && (
          <View style={styles.weatherContainer}>
            <View style={styles.weatherCard}>
              <Image
                source={{
                  uri: `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`,
                }}
                style={styles.weatherIcon}
              />
              <Text style={styles.cityName}>{weatherData.name}</Text>
              <Text style={styles.temperature}>
                {Math.round(weatherData.main.temp - 273.15)}°C
              </Text>
              <Text style={styles.weatherCondition}>
                {weatherData.weather[0].description}
              </Text>
            </View>

            <Text style={styles.otherInfoTitle}>Outras Informações</Text>

            <View style={styles.otherInfo}>
              <View style={styles.infoCard}>
                <Text style={styles.infoTitle}>Umidade:</Text>
                <Text style={styles.infoText}>{weatherData?.main?.humidity}%</Text>
              </View>
              <View style={styles.infoCard}>
                <Text style={styles.infoTitle}>Velocidade do Vento:</Text>
                <Text style={styles.infoText}>
                  {weatherData?.wind?.speed} m/s
                </Text>
              </View>
            </View>
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  searchInputContainer: {
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 20, 
  },
  searchInput: {
    backgroundColor: '#6959CD', 
    borderRadius: 30, 
    padding: 10,
    width: '79%', 
    height: 50, 
    marginRight: 10, 
    marginLeft:20,
  },
  textInput: {
    flex: 1,
    marginLeft: 10, 
    color: '#fff', 
  },
  searchButton: {
    backgroundColor: '#e0e0e0', 
    borderRadius: 50, 
    padding: 10,
    alignItems: 'center', 
    justifyContent: 'center', 
    width: 40, 
    height: 40, 
    borderWidth: 1, 
    borderColor: '#a0a0a0', 
  },
  searchIcon: {
    padding: 5,
  },
  weatherContainer: {
    alignItems: 'center',
    width: '100%',
  },
  weatherCard: {
    backgroundColor: '#6959CD',
    padding: 40, 
    borderRadius: 60,
    marginBottom: 20,
    width: '90%', 
    alignItems: 'center',
  },
  weatherIcon: {
    width: 80, 
    height: 120, 
    marginBottom: 10,
  },
  cityName: {
    fontSize: 20, 
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  temperature: {
    fontSize: 36, 
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  weatherCondition: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  otherInfoTitle: {
    fontSize: 18, 
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 20,
    textAlign: 'center', 
    width: '90%', 
  },
  otherInfo: {
    flexDirection: 'row',
    justifyContent: 'space-around', 
    marginTop: 10,
    width: '90%',
  },
  infoCard: {
    backgroundColor: '#f2f2f2',
    padding: 15, 
    borderRadius: 10,
    flex: 1,
    marginRight: 10,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  infoText: {
    fontSize: 14,
  },
  scrollView: {
    flex: 1,
  }
});

export default SearchPage;