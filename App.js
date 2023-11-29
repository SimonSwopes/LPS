import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, ScrollView, Button } from 'react-native';
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import * as SQLite from 'expo-sqlite';
import { useState, useEffect } from 'react';

// Local Imports
import {styles} from './src/utils/styleSheet.js';

// Screen Imports
import HomeScreen from './src/screens/home.js';
import LoginScreen from './src/screens/login.js';
import BrowseScreen from './src/screens/browse.js';
import HistoryScreen from './src/screens/history.js';
import PreviousWinsScreen from './src/screens/prevWins.js';
import ProfileScreen from './src/screens/profile.js';
import SearchScreen from './src/screens/search.js';
import SignUpScreen from './src/screens/signup.js';
import AdminHomeScreen from './src/screens/adminHome.js';
import StatusScreen from './src/screens/status.js';
import ManageScreen from './src/screens/manage.js';

// Global Navigation Stack
const Stack = createStackNavigator();

export default function App() {
    const db = SQLite.openDatabase('userData.db');
    useEffect(() => {
      // Create the 'users' table if it doesn't exist
      db.transaction(tx => {
        tx.executeSql(
          'CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT, password TEXT, address TEXT, phone TEXT);',
          [],
          (_, result) => {
            console.log('Table created successfully');
          },
          (_, error) => {
            console.log('Error creating table: ', error);
          }
        );
      });
    }, []);

  
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
            fontFamily: 'Helvetica',
          },
        }}
      >
      <Stack.Screen name="Login" component={LoginScreen} options={{title:'Login'}}/>
      <Stack.Screen name="Home" component={HomeScreen} options={{title: 'Home'}}/>
      <Stack.Screen name="Browse" component={BrowseScreen} options={{title: 'Browse Tickets'}}/>
      <Stack.Screen name="History" component={HistoryScreen} options={{title: 'Order History'}}/>
      <Stack.Screen name="Previous Wins" component={PreviousWinsScreen} options={{title: 'Previoius Wins'}}/>
      <Stack.Screen name="Profile" component={ProfileScreen} options={{title: 'Profile'}}/>
      <Stack.Screen name="Search" component={SearchScreen} options={{title: 'Search Tickets'}}/>
      <Stack.Screen name="SignUp" component={SignUpScreen} options={{title: 'Register'}}/>
      <Stack.Screen name="AdminHome" component={AdminHomeScreen} options={{title: 'Admin Home'}}/>
      <Stack.Screen name="Status" component={StatusScreen} options={{title: 'System Status'}}/>
      <Stack.Screen name="Manage" component={ManageScreen} options={{title: 'Manage Tickets'}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
