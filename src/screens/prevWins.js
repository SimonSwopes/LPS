import React, { useEffect, useState, useContext } from 'react';
import { Text, View, Alert, FlatList } from 'react-native';
import * as SQLite from 'expo-sqlite';

import UserContext from '../constants/UserContext.js';
import { styles } from '../utils/styleSheet.js';

const transactionDB = SQLite.openDatabase('transactionData.db');

const PreviousWinsScreen = () => {
  const [winsData, setWinsData] = useState(null);
  const { User } = useContext(UserContext);

  useEffect(() => {
    transactionDB.transaction(
      tx => {
        tx.executeSql(
          'SELECT ticketName, numbers, winnings FROM transactions WHERE userId = ? AND winnings > 0',
          [User],
          (_, { rows }) => {
            if (rows.length > 0) {
              setWinsData(rows._array);
            }
          },
          (error) => {
            console.log('Transaction Error:', error);
            Alert.alert('Error', 'Unable to retrieve winnings at this time',);
          }
        );
      });
  }, [User]);

  const renderWins = ({ item }) => {
    return (
      <View>
        <Text style={styles.subTitle}>{`Ticket: ${item.ticketName}, Numbers: ${item.numbers}, Winnings: $${item.winnings}`}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={winsData}
        renderItem={renderWins}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={() => (
          <View>
            <Text style={styles.subTitle}>No Winnings</Text>
          </View>
        )}
      />
    </View>
  );
}

export default PreviousWinsScreen;
