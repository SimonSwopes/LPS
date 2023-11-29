import React from 'react';
import {Text, View, Pressable} from 'react-native';

import {styles} from '../utils/styleSheet.js';

const AdminHomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Pressable style={styles.button} onPress={() => navigation.navigate('Profile')}>
        <Text style={styles.buttonText}>Profile</Text>
      </Pressable>
    </View>
  );
}

export default AdminHomeScreen;
