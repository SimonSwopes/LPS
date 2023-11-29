import React from 'react';
import {Text, View} from 'react-native';

import {styles} from '../utils/styleSheet.js';

const ManageScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.subTitle}>Manage Tickets</Text>
    </View>
  );
}

export default ManageScreen;
