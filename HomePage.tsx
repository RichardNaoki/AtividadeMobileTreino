import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HomePage: React.FC = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.indicatorContainer}>
          <View style={styles.dot} />
          <View style={[styles.dot, styles.activeDot]} />
          <View style={styles.dot} />
        </View>
        <Text style={styles.title}>
          Veja como está o tempo ao redor do mundo
          <Text style={styles.earthEmoji}>🌎</Text>
        </Text>
        <Text style={styles.subtitle}>Comece agora gratuitamente</Text> 
        <View style={styles.bottomContainer}> 
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Weather' as never)}
          >
            <Text style={styles.buttonText}>Vamos lá</Text>
          </TouchableOpacity>
          <Text style={styles.loginText}>
            Já tem uma conta?{' '}
            <Text style={styles.loginLink}>Log in</Text>
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6959CD',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 41, 
    width: '92%', // Aumentando a largura para 90%
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    minHeight: 350, 
    maxHeight: 450, 
    justifyContent: 'space-between', 
  },
  title: {
    fontSize: 18,
    fontStyle: 'italic',
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
    textAlign: 'center',
  },
  earthEmoji: {
    fontSize: 20,
    fontStyle: 'normal',
    marginBottom: 16,
  },
  subtitle: {
    color: '#888',
    marginBottom: 100,
    fontSize: 16,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#6959CD',
    padding: 16,
    borderRadius: 30,
    marginBottom: 5, 
    width: '70%',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'normal',
    fontSize: 18,
    textAlign: 'center',
  },
  loginText: {
    color: '#888',
    marginBottom: 50,
    fontSize: 13,
    textAlign: 'center',
  },
  loginLink: {
    color: '#4285F4',
    fontSize: 16,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 50,
    backgroundColor: '#ddd', 
    marginHorizontal: 4,
    padding: 2, 
  },
  activeDot: {
    backgroundColor: '#8A55D9',
  },
  indicatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  bottomContainer: {
    alignItems: 'center', 
    width: '100%', 
  }
});

export default HomePage;