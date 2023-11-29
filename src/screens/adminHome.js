import React from 'react';
import {Text, View, Pressable} from 'react-native';

import {styles} from '../utils/styleSheet.js';

const AdminHomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>

      <Pressable style={styles.button} onPress={() => navigation.navigate('Status')}>
        <Text style={styles.buttonText}>System Status</Text>
      </Pressable>
      <View style={styles.spacer}/>
      <Pressable style={styles.button} onPress={() => navigation.navigate('Manage')}>
        <Text style={styles.buttonText}>Manage Tickets</Text>
      </Pressable>
      <View style={styles.spacer}/>
      <Pressable style={styles.button} onPress={() => navigation.navigate('Profile')}>
        <Text style={styles.buttonText}>Profile</Text>
      </Pressable>

    </View>
  );
}

export default AdminHomeScreen;
