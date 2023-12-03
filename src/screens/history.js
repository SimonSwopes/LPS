//TODO: clean up output like use the ticketId to search for the type and display that along with each
import React, {useEffect, useState, useContext} from 'react';
import {Text, View, Alert, FlatList} from 'react-native';
import * as SQLite from 'expo-sqlite';

import UserContext from '../constants/UserContext.js';

const transactionDB = SQLite.openDatabase('transactionData.db');

import {styles} from '../utils/styleSheet.js';

const HistoryScreen= ({ navigation}) => {
  const [DATA, setData] = useState(null);
  const {User, setUser} = useContext(UserContext);

  useEffect(() => {
    transactionDB.transaction(
      tx => {
        tx.executeSql(
          'SELECT * FROM transactions WHERE userId = ?',
          [User],
          (_, {rows}) => {
            if (rows.length > 0) {
              setData(rows._array);
            }
          },
          (error) => {
            console.log('Transaction Error:', error);
            Alert.alert('Error','Unable to retrieve orders at this time',);
          }
        );
      });
  }, [User]);

  const renderTransactions = ({ item }) => {
    return (
      <View>
        <Text style={styles.subTitle}>{item.ticketName}: {"\n\t"}numbers: {item.numbers}, {"\n\t"}winnings: ${item.winnings}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={renderTransactions}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={() => (
          <View>
            <Text style={styles.subTitle}>No Transactions</Text>
          </View>
        )}
      />
    </View>
  );
}

export default HistoryScreen;
