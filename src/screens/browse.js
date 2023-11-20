import React from 'react';
import {Text, View} from 'react-native';

import {styles} from '../utils/styleSheet.js';

const BrowseScreen= ({ navigation}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.subTitle}>Browse</Text>
    </View>
  );
}

export default BrowseScreen;
