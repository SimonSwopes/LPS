import React, { useState, useContext } from 'react';
import { Text, View, TextInput, Button, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import * as SQLite from 'expo-sqlite';
import { styles } from '../utils/styleSheet.js';
import UserContext from '../constants/UserContext.js';

const ticketDB = SQLite.openDatabase('ticketData.db');

const AddTicketScreen = ({ navigation }) => {
  const { User } = useContext(UserContext);
  const [name, setName] = useState('');
  const [jackpot, setJackpot] = useState('');
  const [price, setPrice] = useState('');
  const [drawDay, setDay] = useState('');
  const [winningNumbers, setWinningNumbers] = useState('');

  const handleAdd = () => {
    ticketDB.transaction(tx => {
      tx.executeSql(
        'INSERT INTO tickets (type, price, drawDate, numsold, jackpot, winningNumbers) VALUES (?, ?, ?, ?, ?, ?)',
        [name, price, drawDay, 0, jackpot, winningNumbers],
        (_, result) => {
          console.log('Ticket Added Successfully');
          navigation.pop();
        },
        (_, error) => {
          console.log('Error adding ticket: ', error);
          Alert.alert('Error', 'Failed to add Ticket, Please try again.');
        }
      );
    });
  };

  const generateWinningNumbers = () => {
    const randomNumbers = Array.from({ length: 5 }, () => Math.floor(Math.random() * 99) + 1);
    setWinningNumbers(randomNumbers.join(','));
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.container}>
        <TextInput
          placeholder="Ticket Name"
          style={styles.inputText}
          value={name}
          onChangeText={text => setName(text)}
          inputMode="text"
        />
        <TextInput
          placeholder="Jackpot"
          style={styles.inputText}
          inputMode="decimal"
          value={jackpot}
          onChangeText={text => setJackpot(text)}
        />
        <TextInput
          placeholder="Price"
          style={styles.inputText}
          inputMode="decimal"
          value={price}
          onChangeText={text => setPrice(text)}
        />
        <TextInput
          placeholder="Draw Day 1 = Mon, 7 = Sun"
          style={styles.inputText}
          inputMode="numeric"
          value={drawDay}
          onChangeText={text => setDay(text)}
        />
        <View style={styles.spacer} />
        <Button title="Generate Winning Numbers" onPress={generateWinningNumbers} />
        {winningNumbers !== '' && (
          <Text style={styles.inputText}>Winning Numbers: {winningNumbers}</Text>
        )}
        <View style={styles.spacer} />
        <Button title="Add" onPress={handleAdd} />
      </View>
    </KeyboardAvoidingView>
  );
};

export default AddTicketScreen;
