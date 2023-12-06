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
import PurchasedTicketInfoScreen from './src/screens/PurchasedTicketInfoScreen.js';
import RedeemableTicketsScreen from './src/screens/RedeemableTicketScreen.js';

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

// Contexts Imports
import UserContext from './src/constants/UserContext.js';
import PaymentPreferenceScreen from './src/screens/PaymentPreferenceScreen.js';
import WinningsTooHighScreen from './src/screens/WinningsTooHighScreen.js';

// Global Navigation Stack
const Stack = createStackNavigator();

export default function App() {

  // will store user ID
  const [User, setUser] = useState(0);

  const db = SQLite.openDatabase('userData.db');

  useEffect(() => {
    // Create the 'users' table if it doesn't exist
    db.transaction((tx) => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT, password TEXT, address TEXT, phone TEXT, PayPalEmail TEXT, PayPalPassword TEXT, Card TEXT, ExpirationDate TEXT, CVV TEXT);',
        [],
        (_, result) => {
          console.log('User table created successfully');
        },
        (_, error) => {
          console.log('Error creating user table: ', error);
        }
      );

      // Check if each new column exists before attempting to add it
      ['PayPalEmail', 'PayPalPassword', 'Card', 'ExpirationDate', 'CVV'].forEach((columnName) => {
        tx.executeSql(
          `PRAGMA table_info(users);`,
          [],
          (_, resultInfo) => {
            const existingColumns = Array.from({ length: resultInfo.rows.length }, (_, i) =>
              resultInfo.rows.item(i).name
            );

            if (!existingColumns.includes(columnName)) {
              // The column doesn't exist, so we can add it
              tx.executeSql(
                `ALTER TABLE users ADD COLUMN ${columnName} TEXT;`,
                [],
                (_, resultAlter) => {
                  console.log(`Altered users table successfully to add ${columnName} column`);
                },
                (_, errorAlter) => {
                  console.log(`Error altering users table for ${columnName}:`, errorAlter);
                }
              );
            } else {
              console.log(`${columnName} column already exists`);
            }
          },
          (_, errorInfo) => {
            console.log(`Error checking users table info for ${columnName}:`, errorInfo);
          }
        );
      });
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


const transactionsDb = SQLite.openDatabase('transactionData.db');

useEffect(() => {
  transactionsDb.transaction((tx) => {
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

    // Check if each new column exists before attempting to add it
    ['cardNumber', 'expDate', 'cvv', 'paypalEmail', 'paypalPassword', 'redeemed'].forEach((columnName) => {
      tx.executeSql(
        `PRAGMA table_info(transactions);`,
        [],
        (_, resultInfo) => {
          const existingColumns = Array.from({ length: resultInfo.rows.length }, (_, i) =>
            resultInfo.rows.item(i).name
          );

          if (!existingColumns.includes(columnName)) {
            // The column doesn't exist, so we can add it
            tx.executeSql(
              `ALTER TABLE transactions ADD COLUMN ${columnName} TEXT;`,
              [],
              (_, resultAlter) => {
                console.log(`Altered transactions table successfully to add ${columnName} column`);
              },
              (_, errorAlter) => {
                console.log(`Error altering transactions table for ${columnName}:`, errorAlter);
              }
            );
          } else {
            console.log(`${columnName} column already exists`);
          }
        },
        (_, errorInfo) => {
          console.log(`Error checking transactions table info for ${columnName}:`, errorInfo);
        }
      );
    });
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
      <Stack.Screen name="RedeemableTicketScreen" component={RedeemableTicketsScreen} options={{ title: 'Redeemable Tickets' }}/>
      <Stack.Screen name="PaymentPreferenceScreen" component={PaymentPreferenceScreen} options={{ title: 'Payment Credentials' }}/>
      <Stack.Screen name="WinningsTooHighScreen" component={WinningsTooHighScreen} options={{ title: 'Winnings Too High!' }}/>
      <Stack.Screen name="PurchasedTicketInfo" component={PurchasedTicketInfoScreen} options={{ title: 'Purchased Ticket Info' }}/>
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
      </Stack.Navigator>
    </NavigationContainer>
    </UserContext.Provider>
  );
}
