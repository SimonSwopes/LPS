import React from 'react';
import {Text, View} from 'react-native';

import {styles} from '../utils/styleSheet.js';

const SearchScreen= ({ navigation}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.subTitle}>Search</Text>
    </View>
  );
}

export default SearchScreen;
