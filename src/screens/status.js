import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import * as SQLite from 'expo-sqlite';
import { styles } from '../utils/styleSheet.js';

const ticketDB = SQLite.openDatabase('ticketData.db');

const StatusScreen = ({ navigation }) => {
  const [typeEarnings, setTypeEarnings] = useState([]);

  useEffect(() => {
    ticketDB.transaction(
      (tx) => {
        tx.executeSql(
          'SELECT type, price, numsold FROM tickets',
          [],
          (_, result) => {
            const dataFromDB = result.rows._array;
            const typeEarningsMap = {};

            for (let i = 0; i < dataFromDB.length; i++) {
              const { type, price, numsold } = dataFromDB[i];
              const product = price * numsold;

              if (type in typeEarningsMap) {
                typeEarningsMap[type].earnings += product;
                typeEarningsMap[type].sold += numsold;
              } else {
                typeEarningsMap[type] = { earnings: product, sold: numsold };
              }
            }

            setTypeEarnings(Object.entries(typeEarningsMap));
          },
          (_, error) => {
            console.log('Transaction error:', error);
          }
        );
      },
      []
    );
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.subTitle}>Ticket Sales/Earnings:{"\n"}</Text>
      {typeEarnings.map(([type, { earnings, sold }], index) => (
        <View key={index}>
          <Text style={styles.subTitle}>{type}</Text>
          <Text style={styles.subTitle}>Total Earnings: ${earnings}</Text>
          <Text style={styles.subTitle}>Tickets Sold: {sold}</Text>
          <View style={styles.spacer} />
        </View>
      ))}
    </View>
  );
};

export default StatusScreen;
