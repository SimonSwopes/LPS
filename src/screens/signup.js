import React, { useState } from 'react';

import { View, Text, TextInput, Button, Alert, ScrollView } from 'react-native';
import * as SQLite from 'expo-sqlite';
import { styles } from '../utils/styleSheet';

const db = SQLite.openDatabase('userData.db');

const SignUpScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');

  const handleSignUp = () => {
    // Insert user data into the 'users' table
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO users (name, email, password, address, phone) VALUES (?, ?, ?, ?, ?)',
        [name, email, password, address, phone],
        (_, result) => {
          console.log('User added successfully');
          // Optionally, navigate to another screen after successful signup
          navigation.navigate('Login');
        },
        (_, error) => {
          console.log('Error adding user: ', error);
          // Handle error, e.g., show an alert
          Alert.alert('Error', 'Failed to sign up. Please try again.');
        }
      );
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.subContainer}>
        <Text style={styles.title}>Sign Up</Text>
        <TextInput
          placeholder="Name"
          value={name}
          onChangeText={text => setName(text)}
          style={styles.inputText}
        />
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={text => setEmail(text)}
          style={styles.inputText}
        />
        <TextInput
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={text => setPassword(text)}
          style={styles.inputText}
        />
        <TextInput
          placeholder="Address"
          value={address}
          onChangeText={text => setAddress(text)}
          style={styles.inputText}
        />
        <TextInput
          placeholder="Phone"
          value={phone}
          onChangeText={text => setPhone(text)}
          style={styles.inputText}
        />
        <Button title="Sign Up" onPress={handleSignUp} style={styles.button} />
      </View>
    </ScrollView>
  );
};


export default SignUpScreen;
