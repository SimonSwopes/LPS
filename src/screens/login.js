import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, Alert, ScrollView } from 'react-native';
import * as SQLite from 'expo-sqlite';
import { styles } from '../utils/styleSheet';

import UserContext from '../constants/UserContext.js';

const db = SQLite.openDatabase('userData.db');

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { User, setUser} = useContext(UserContext);

  const handleLogin = () => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM users WHERE email = ? AND password = ?',
        [email, password],
        (_, result) => {
          if (result.rows.length > 0) {
            setUser(result.rows.item(0).id)
            if (email === "admin") {
              navigation.replace('AdminHome');
            } else {
              navigation.replace('Home');
            }
          } else {
            Alert.alert('Error', 'Invalid email or password. Please try again.');
          }
        },
        (_, error) => {
          console.log('Error checking login credentials: ', error);
          Alert.alert('Error', 'Login failed. Please try again.');
        }
      );
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.subContainer}>
        <Text style={styles.title}>LPS</Text>
        <Text style={styles.subTitle}>Lottery Purchase System</Text>
        <View style={styles.inputView}>
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={text => setEmail(text)}
            style={styles.inputText}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={text => setPassword(text)}
            style={styles.inputText}
          />
        </View>
        <Button title="Login" onPress={handleLogin} style={styles.button} />
        <Button
          title="Sign Up"
          onPress={() => navigation.navigate('SignUp')}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Sign Up</Text>
        </Button>
      </View>
    </ScrollView>
  );
};

export default LoginScreen;
