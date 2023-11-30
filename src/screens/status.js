import React, {useState, useEffect} from 'react';
import {Text, View, SafeAreaView, FlatList} from 'react-native';
import * as SQLite from 'expo-sqlite';
import {styles} from '../utils/styleSheet.js';

const ticketDB = SQLite.openDatabase('ticketData.db');

const StatusScreen = ({ navigation }) => {
  const [total, setTotal] = useState(0);
  const [sales, setSales] = useState(0)
  useEffect(() => {
    ticketDB.transaction(
      tx => {
        tx.executeSql(
          'SELECT * FROM tickets',
          [],
          (_, result) => {
            const dataFromDB = result.rows._array;
            let earnings = 0;
            let sold = 0;
            for (let i = 0; i < dataFromDB.length; i++) {
              earnings += (dataFromDB[i].numsold * dataFromDB[i].price);
              sold += dataFromDB[i].numsold
            }
            setTotal(earnings);
            setSales(sold);
          }
        );
      },
      error => {
        console.log('Transaction error:', error);
      }
    );
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.subTitle}>Total Earnings</Text>
      <Text style={styles.subTitle}>${total}</Text>
      <View style={styles.spacer}/>
      <Text style={styles.subTitle}>Tickets Sold</Text>
      <Text style={styles.subTitle}>{sales}</Text>
    </View>
  );
}
export default StatusScreen;
