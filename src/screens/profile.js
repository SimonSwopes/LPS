import React from 'react';
import {Text, View, Pressable} from 'react-native';

import {styles} from '../utils/styleSheet.js';

const ProfileScreen= ({ navigation }) => {

  const logout = () => {
    navigation.popToTop()
    navigation.replace('Login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.subTitle}>Display User info Here</Text>
      <Pressable style={styles.button} onPress={logout}>
        <Text style={styles.buttonText}>Sign Out</Text>
      </Pressable>
    </View>
  );
}

export default ProfileScreen;
