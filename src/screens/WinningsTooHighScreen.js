import React from 'react';
import { Text, View } from 'react-native';
import { styles } from '../utils/styleSheet.js';

const WinningsTooHighScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.subTitle}>
        Winnings Too High!{"\n"}
        Please redeem at the Lottery Claiming Center.
      </Text>
    </View>
  );
};

export default WinningsTooHighScreen;
