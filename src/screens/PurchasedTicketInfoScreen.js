// Import necessary libraries and components
import React, { useEffect, useState, useContext } from 'react';
import { Text, View, Alert, Button } from 'react-native';
import * as SQLite from 'expo-sqlite';

import UserContext from '../constants/UserContext.js';

const ticketDb = SQLite.openDatabase('ticketData.db');

const PurchasedTicketInfoScreen = ({ route }) => {
  const { User } = useContext(UserContext);
  const { ticketId } = route.params;
  const [ticketData, setTicketData] = useState(null);

  useEffect(() => {
    ticketDb.transaction(
      (tx) => {
        tx.executeSql(
          'SELECT * FROM tickets WHERE id = ?',
          [ticketId],
          (_, { rows }) => {
            if (rows.length > 0) {
              setTicketData(rows.item(0));
            }
          },
          (error) => {
            console.log('Transaction Error:', error);
            Alert.alert('Error', 'Unable to retrieve ticket details at this time');
          }
        );
      }
    );
  }, [User, ticketId]);

  return (
    <View>
      {ticketData ? (
        <View>
          <Text>Ticket Type: {ticketData.type}</Text>
          <Text>Ticket Winning Numbers: {ticketData.winningNumbers}</Text>
          <Text>Price: ${ticketData.price}</Text>
          <Text>Draw Date: {ticketData.drawDate}</Text>
          <Text>Number Sold: {ticketData.numsold}</Text>
          <Text>Jackpot: ${ticketData.jackpot} </Text>
        </View>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
};

export default PurchasedTicketInfoScreen;
