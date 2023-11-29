import React from 'react';
import {Text, View} from 'react-native';

import {styles} from '../utils/styleSheet.js';

const StatusScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.subTitle}>Status</Text>
    </View>
  );
}
export default StatusScreen;
