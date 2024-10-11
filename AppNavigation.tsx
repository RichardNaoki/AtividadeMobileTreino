import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomePage from './HomePage';
import WeatherPage from './WeatherPage';
import SearchPage from './SearchPage';


type RootStackParamList = {
  Home: undefined;
  Weather: undefined;
  Search: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigation: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomePage} options={{ headerShown: false }} />
        <Stack.Screen name="Weather" component={WeatherPage} options={{ headerShown: false }} />
        <Stack.Screen name="Search" component={SearchPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;