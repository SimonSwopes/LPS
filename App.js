import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, ScrollView, Button } from 'react-native';
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

// Local Imports
import {styles} from './src/utils/styleSheet.js';

// Screen Imports
import HomeScreen from './src/screens/home.js';
import LoginScreen from './src/screens/login.js';

// Global Navigation Stack
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator //header formating
        screenOptions={{
          headerStyle: {
            backgroundColor: '#0096FF'
          },
          headerTintColor: '#000',
          headerTitleStyle: {
            fontWeight: 'bold',
            color: '#fff',
            fontFamily: 'Times New Roman',
          },
        }}
      >
      <Stack.Screen name="Login" component={LoginScreen} options={{title:'Login'}}/>
      <Stack.Screen name="Home" component={HomeScreen} options={{title: 'Home'}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
