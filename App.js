import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  Text,
  SafeAreaView,
  StyleSheet,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { Card } from 'react-native-paper';

import LoginScreen from './LoginScreen'; // Import your LoginScreen component
import MainScreen from './MainScreen';

const { width, height } = Dimensions.get('window');
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false, // Hide the navigation header
        }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="MainScreen" component={MainScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function HomeScreen({ navigation }) {
  return (
    <ImageBackground
      source={require('./components/images/sign-in-bg.jpg')}
      style={[styles.background, { width: width, height: height }]}
      resizeMode="cover" // Adjust the resizing mode
    >
      <SafeAreaView style={styles.container}>
        <Text style={styles.welcomeText}>Welcome to</Text>
        <Text style={styles.titleText}>TastyCorner</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Login')}>
          <Text style={styles.buttonText}>Sign in</Text>
        </TouchableOpacity>
        <Card>{/* Render your login components here */}</Card>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 8,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  welcomeText: {
    fontSize: 35,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
    marginBottom: 10,
    position: 'absolute',
    top: height * 0.3,
    left: 0,
    right: 0,
  },
  titleText: {
    fontSize: 52,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'yellow',
    position: 'absolute',
    top: height * 0.35,
    left: 0,
    right: 0,
  },
  button: {
    backgroundColor: 'white',
    borderRadius: height * 0.075, // 15% of the screen height
    paddingVertical: 12,
    paddingHorizontal: 50, // Add some horizontal padding
    alignItems: 'center',
    justifyContent: 'center', // Center vertically
    alignSelf: 'center', // Center horizontally
    position: 'absolute', // Position absolutely to center
    top: '50%', // Place the button at the vertical center of the screen
    transform: [{ translateY: -height * 0.005 }], // Adjust the position to center vertically
  },
  buttonText: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
