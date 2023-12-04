import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, ScrollView, Button } from 'react-native';
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
import AddTicketScreen from './src/screens/addTicket.js';
import RemoveTicket from './src/screens/removeTicket.js';
import OrderScreen from './src/screens/order.js';
import CashOutScreen from './src/screens/cashout.js';

// Contexts Imports
import UserContext from './src/constants/UserContext.js';

// Global Navigation Stack
const Stack = createStackNavigator();

export default function App() {

  // will store user ID
  const [User, setUser] = useState(0);

  const db = SQLite.openDatabase('userData.db');
  useEffect(() => {
    // Create the 'users' table if it doesn't exist
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT, password TEXT, address TEXT, phone TEXT);',
        [],
        (_, result) => {
          console.log('User table created successfully');
        },
        (_, error) => {
          console.log('Error user creating table: ', error);
        }
      );
    });
  }, []);

  const ticketDb = SQLite.openDatabase('ticketData.db');
useEffect(() => {
  ticketDb.transaction(tx => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS tickets (' +
      'id INTEGER PRIMARY KEY AUTOINCREMENT, ' +
      'type TEXT, ' +
      'price REAL, ' +
      'drawDate INTEGER, ' +
      'numsold INTEGER, ' +
      'jackpot REAL);', // Without winningNumbers initially
      [],
      (_, result) => {
        console.log('Ticket table created successfully');

        // Check if the winningNumbers column exists before attempting to add it
        tx.executeSql(
          'PRAGMA table_info(tickets);',
          [],
          (_, resultInfo) => {
            const existingColumns = Array.from({ length: resultInfo.rows.length }, (_, i) => resultInfo.rows.item(i).name);

            if (!existingColumns.includes('winningNumbers')) {
              // The winningNumbers column doesn't exist, so we can add it
              tx.executeSql(
                'ALTER TABLE tickets ADD COLUMN winningNumbers TEXT;',
                [],
                (_, resultAlter) => {
                  console.log('Altered table successfully to add winningNumbers column');
                },
                (_, errorAlter) => {
                  console.log('Error altering table:', errorAlter);
                }
              );
            } else {
              console.log('winningNumbers column already exists');
            }
          },
          (_, errorInfo) => {
            console.log('Error checking table info:', errorInfo);
          }
        );
      },
      (_, error) => {
        console.log('Error creating ticket table: ', error);
      }
    );
  });
}, []);
  const paymentDb = SQLite.openDatabase('paymentData.db');
  useEffect(() => {
    // Create the 'users' table if it doesn't exist
    paymentDb.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, ccnum TEXT, ccexp TEXT, cvv TEXT);',
        [],
        (_, result) => {
          console.log('Payment table created successfully');
        },
        (_, error) => {
          console.log('Error payment creating table: ', error);
        }
      );
    });
  }, []);

const transactionsDb = SQLite.openDatabase('transactionData.db');

useEffect(() => {
  transactionsDb.transaction(tx => {
    // Initialize the transactions table with all columns
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS transactions (id INTEGER PRIMARY KEY AUTOINCREMENT, userId INTEGER, ticketId INTEGER, confirmation TEXT, numbers TEXT, winner INTEGER, cashed BOOL, ticketName TEXT, jackpot REAL, winnings REAL);',
      [],
      (_, result) => {
        console.log('Transactions table created successfully');
      },
      (_, error) => {
        console.log('Error creating transactions table:', error);
      }
    );

    // Check if the ticketName column exists before attempting to add it
    tx.executeSql(
      'PRAGMA table_info(transactions);',
      [],
      (_, resultInfo) => {
        const existingColumns = Array.from({ length: resultInfo.rows.length }, (_, i) => resultInfo.rows.item(i).name);

        if (!existingColumns.includes('ticketName')) {
          // The ticketName column doesn't exist, so we can add it
          tx.executeSql(
            'ALTER TABLE transactions ADD COLUMN ticketName TEXT;',
            [],
            (_, resultAlterTicket) => {
              console.log('Altered transactions table successfully to add ticketName column');
            },
            (_, errorAlterTicket) => {
              console.log('Error altering transactions table for ticketName:', errorAlterTicket);
            }
          );
        } else {
          console.log('ticketName column already exists');
        }

        // Check if the jackpot column exists before attempting to add it
        if (!existingColumns.includes('jackpot')) {
          // The jackpot column doesn't exist, so we can add it
          tx.executeSql(
            'ALTER TABLE transactions ADD COLUMN jackpot REAL;',
            [],
            (_, resultAlterJackpot) => {
              console.log('Altered transactions table successfully to add jackpot column');
            },
            (_, errorAlterJackpot) => {
              console.log('Error altering transactions table for jackpot:', errorAlterJackpot);
            }
          );
        } else {
          console.log('jackpot column already exists');
        }

        // Check if the winnings column exists before attempting to add it
        if (!existingColumns.includes('winnings')) {
          // The winnings column doesn't exist, so we can add it
          tx.executeSql(
            'ALTER TABLE transactions ADD COLUMN winnings REAL;',
            [],
            (_, resultAlterWinnings) => {
              console.log('Altered transactions table successfully to add winnings column');
            },
            (_, errorAlterWinnings) => {
              console.log('Error altering transactions table for winnings:', errorAlterWinnings);
            }
          );
        } else {
          console.log('winnings column already exists');
        }
      },
      (_, errorInfo) => {
        console.log('Error checking transactions table info:', errorInfo);
      }
    );
  });
}, []);





  return (
    <UserContext.Provider value={{User, setUser}}>
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
      <Stack.Screen name="Manage" component={ManageScreen} options={{title: 'Manage'}}/>
      <Stack.Screen name="AddTicket" component={AddTicketScreen} options={{title: 'New'}}/>
      <Stack.Screen name="Remove" component={RemoveTicket} options={{title: 'Remove'}}/>
      <Stack.Screen name="Order" component={OrderScreen} options={{title: 'Order'}}/>
      <Stack.Screen name="Cashout" component={CashOutScreen} options={{title: 'Cashout'}}/>
      </Stack.Navigator>
    </NavigationContainer>
    </UserContext.Provider>
  );
}