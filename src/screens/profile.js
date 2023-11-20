import React from 'react';
import {Text, View} from 'react-native';

import {styles} from '../utils/styleSheet.js';

const ProfileScreen= ({ navigation}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.subTitle}>Profile</Text>
    </View>
  );
}

export default ProfileScreen;
