import React from 'react';
import {Text, View} from 'react-native';

import {styles} from '../utils/styleSheet.js';

const HistoryScreen= ({ navigation}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.subTitle}>History</Text>
    </View>
  );
}

export default HistoryScreen;
