import React from 'react';
import {Text, View} from 'react-native';

// Local Imports
import {styles} from '../utils/styleSheet.js';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
        <Text style={styles.subTitle}>Home</Text>
    </View>
  );
};

export default HomeScreen;
