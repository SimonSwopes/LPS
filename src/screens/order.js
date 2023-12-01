import React from 'react';
import {Text, View} from 'react-native';

import {styles} from '../utils/styleSheet.js';

const OrderScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.subTitle}>Order</Text>
    </View>
  );
}

export default OrderScreen;
