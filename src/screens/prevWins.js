import React from 'react';
import {Text, View} from 'react-native';

import {styles} from '../utils/styleSheet.js';

const PreviousWinsScreen= ({ navigation}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.subTitle}>Previous Wins</Text>
    </View>
  );
}

export default PreviousWinsScreen;
