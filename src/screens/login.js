import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, ScrollView, Button } from 'react-native';
import { styles } from '../utils/styleSheet';
import usersData from '../utils/users.json'; // Update the path accordingly

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Check if the entered email and password match any user in the JSON data
    const user = usersData.users.find(user => user.email === email && user.password === password);

    if (user) {
      // Successful login, navigate to the Home screen
      navigation.replace('Home');
    } else {
      // Invalid credentials, you might want to show an error message
      console.log('Invalid email or password');
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>LPS</Text>
        <Text style={styles.subTitle}>Lottery Purchase System</Text>
        <StatusBar style="auto" />
        <View style={styles.subContainer}>
          <View style={styles.inputView}>
            <TextInput
              style={styles.inputText}
              placeholder="Email"
              onChangeText={text => setEmail(text)}
            />
          </View>
          <View style={styles.inputView}>
            <TextInput
              style={styles.inputText}
              secureTextEntry
              placeholder="Password"
              onChangeText={text => setPassword(text)}
            />
          </View>
          {/* Login button */}
          <Button title="login" onPress={handleLogin}/>
          {/* Sign Up button */}
          <Button
            title="sign up"
            onPress={() => navigation.navigate('SignUp')}
          >
            <Text style={styles.buttonText}>Sign Up</Text>
          </Button>
        </View>
      </View>
    </ScrollView>
  );
}

