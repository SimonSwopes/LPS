import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, ScrollView, Button } from 'react-native';

import {styles} from '../utils/styleSheet.js';

export default function LoginScreen({ navigation }) {

  return (
    <ScrollView automaticallyAdjustKeyboardInsets={true}>
      <View style={styles.container}>
        <Text style = {styles.title}>LPS</Text>
        <Text style={styles.subTitle}>Lottery Purchase System</Text>
        <StatusBar style="auto" />
        <View style={styles.subContainer}>
          <View style={styles.inputView}>
            <TextInput style={styles.inputText} placeholder="Email"/>
          </View>
          <View style={styles.inputView}>
            <TextInput style={styles.inputText} secureTextEntry placeholder="Password" />
          </View>
          <Button title="Login" onPress={() => navigation.replace('Home')} />
          <Button title="Sign Up" onPress={() => navigation.navigate('SignUp')}/>
        </View>
      </View>
    </ScrollView>
  );
}
