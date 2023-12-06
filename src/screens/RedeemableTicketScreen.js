import React, { useEffect, useState, useContext } from 'react';
import { Text, View, FlatList, TouchableOpacity } from 'react-native';
import * as SQLite from 'expo-sqlite';
import UserContext from '../constants/UserContext.js';
import { styles } from '../utils/styleSheet.js';

const transactionDB = SQLite.openDatabase('transactionData.db');

const RedeemableTicketsScreen = ({ navigation }) => {
  const { User, setUser } = useContext(UserContext);
  const [redeemableTickets, setRedeemableTickets] = useState([]);

  useEffect(() => {
    transactionDB.transaction(
      (tx) => {
        tx.executeSql(
          'SELECT * FROM transactions WHERE userId = ? AND winnings > 0 AND redeemed = "NO"',
          [User],
          (_, { rows }) => {
            if (rows.length > 0) {
              setRedeemableTickets(rows._array);
            }
          },
          (error) => {
            console.log('Transaction Error:', error);
          }
        );
      }
    );
  }, [User]);

  const renderRedeemableTickets = ({ item }) => {
    const handleNavigateToPaymentPreference = () => {
      if (item.winnings >= 600) {
        // Display a message if winnings are too high
        navigation.navigate('WinningsTooHighScreen');
      } else {
        // Allow user to choose payment preference
        navigation.navigate('PaymentPreferenceScreen', { ticketId: item.ticketId });
      }
    };

    return (
      <TouchableOpacity onPress={handleNavigateToPaymentPreference}>
        <View>
          <Text style={styles.subTitle}>
            {item.ticketName}: {"\n\t"}numbers: {item.numbers}, {"\n\t"}winnings: ${item.winnings}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={redeemableTickets}
        renderItem={renderRedeemableTickets}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={() => (
          <View>
            <Text style={styles.subTitle}>No Redeemable Tickets</Text>
          </View>
        )}
      />
    </View>
  );
};

export default RedeemableTicketsScreen;
