import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Button, Pressable } from 'react-native';
import { styles } from '../utils/styleSheet';

const CashOutScreen = ({ route, navigation }) => {
  const {winnings, ccnum} = route.params;
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>You Win</Text>
      <Text style={styles.cashOutText}>
        Cash out ${winnings} to card {ccnum.slice(-4)}
      </Text>
      <View style={styles.buttonContainer}>
        <Button
          title="Return Home"
          onPress={() => navigation.popToTop()}
          style={styles.button}
        />
      </View>
    </View>
  );
};

export default CashOutScreen;