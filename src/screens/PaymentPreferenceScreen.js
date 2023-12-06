import React, { useState, useContext, useEffect } from 'react';
import { Text, View, TextInput, Button, Alert } from 'react-native';
import * as SQLite from 'expo-sqlite';
import { styles } from '../utils/styleSheet.js';

import UserContext from '../constants/UserContext.js';

const userDataDB = SQLite.openDatabase('userData.db');
const transactionDB = SQLite.openDatabase('transactionData.db')

const PaymentPreferenceScreen = ({ route, navigation }) => {
  const { ticketId, userId } = route.params;
  const [cardNumber, setCardNumber] = useState('');
  const [expDate, setExpDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [paypalEmail, setPaypalEmail] = useState('');
  const [paypalPassword, setPaypalPassword] = useState('');

  const [selectedTicket, setSelectedTicket] = useState(null);

useEffect(() => {
  // Fetch ticket details based on the provided ticketId
  transactionDB.transaction((tx) => {
    tx.executeSql(
      'SELECT * FROM transactions WHERE ticketId = ?',
      [ticketId],
      (_, { rows }) => {
        const ticket = rows.item(0);
        // Populate the state with the retrieved ticket data
        setSelectedTicket(ticket);
      },
      (_, error) => {
        console.log('Error fetching ticket data:', error);
      }
    );
  });
}, [ticketId]);

const handleConfirmRedemption = () => {
    // Validate that at least one of the payment methods is filled
    if (!(cardNumber || (paypalEmail && paypalPassword))) {
      Alert.alert('Error', 'Please fill in at least one payment method.');
      return;
    }
  
    // Insert payment information for the selected ticket into the transactions table
    transactionDB.transaction((tx) => {
      tx.executeSql(
        'UPDATE transactions SET cardNumber = ?, expDate = ?, cvv = ?, paypalEmail = ?, paypalPassword = ?, redeemed = ? WHERE ticketId = ?',
        [cardNumber, expDate, cvv, paypalEmail, paypalPassword, 'YES', ticketId],
        (_, result) => {
          console.log('Payment information inserted successfully');
          // Display confirmation
          Alert.alert('Success', 'Payment information saved successfully.');
          // Navigate back to the RedeemableTicketsScreen
          navigation.navigate('RedeemableTicketScreen');
        },
        (_, error) => {
          console.log('Error inserting payment information:', error);
          Alert.alert('Error', 'Failed to save payment information.');
        }
      );
    });
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.subTitle}>Choose Payment Preference:</Text>
      <TextInput
        style={styles.inputText}
        placeholder="Bank Routing Number"
        value={cardNumber}
        onChangeText={(text) => setCardNumber(text)}
      />
      <TextInput
        style={styles.inputText}
        placeholder="SSN"
        value={expDate}
        onChangeText={(text) => setExpDate(text)}
      />
      <TextInput
        style={styles.inputText}
        placeholder="Card Number"
        value={cvv}
        onChangeText={(text) => setCvv(text)}
      />
      <TextInput
        style={styles.inputText}
        placeholder="PayPal Email"
        value={paypalEmail}
        onChangeText={(text) => setPaypalEmail(text)}
      />
      <TextInput
        style={styles.inputText}
        placeholder="PayPal Password"
        value={paypalPassword}
        onChangeText={(text) => setPaypalPassword(text)}
      />
      <Button title="Save Payment Info" onPress={handleConfirmRedemption} />
    </View>
  );
};

export default PaymentPreferenceScreen;
