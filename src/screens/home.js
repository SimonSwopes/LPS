import React from 'react';
import {Text, View, Pressable} from 'react-native';

// Local Imports
import {styles} from '../utils/styleSheet.js';


/*TODO: Once screens are build import them and replace console.log with naviagtion.navigate */
const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
        <Text style={styles.title}>Welcome</Text>
        <View style={styles.spacer}/>
        <View style={styles.rowContainer}>
          <Pressable style={styles.button} onPress={() => console.log('Clicked')}>
            <Text style={styles.buttonText}>Browse Tickets</Text>
          </Pressable>
          <View style={styles.spacer}/>
          <Pressable style={styles.button} onPress={() => console.log('Clicked')}>
            <Text style={styles.buttonText}>Previous Winners</Text>
          </Pressable>
        </View>
        <View style={styles.spacer}/>
        <View style={styles.rowContainer}>
          <Pressable style={styles.button} onPress={() => console.log('Clicked')}>
            <Text style={styles.buttonText}>Order History</Text>
          </Pressable>
          <View style={styles.spacer}/>
          <Pressable style={styles.button} onPress={() => console.log('Clicked')}>
            <Text style={styles.buttonText}>Search Tickets</Text>
          </Pressable>
        </View>
        <View style={styles.spacer}/>
        <Pressable style={styles.button} onPress={() => console.log('Clicked')}>
          <Text style={styles.buttonText}>Profile</Text>
        </Pressable>
    </View>
  );
};

export default HomeScreen;
