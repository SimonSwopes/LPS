import React, { useState } from 'react';
import {Text, View, TextInput, Button, Alert} from 'react-native';
import * as SQLite from 'expo-sqlite';
import {styles} from '../utils/styleSheet.js';

const ticketDB = SQLite.openDatabase('ticketData.db');

const AddTicketScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [jackpot, setJackpot] = useState('');
  const [price, setPrice] = useState('');
  const [drawDay, setDay] = useState('');

  const handleAdd = () => {
    ticketDB.transaction(tx => {
      tx.executeSql(
        'INSERT INTO tickets (type, price, drawDate, numsold, jackpot) VALUES (?, ?, ?, ?, ?)',
        [name, price, drawDay, 0, jackpot],
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
    navigation.pop();
  };

  return (
      <View style={styles.container}>
        <TextInput
          placeholder="Ticket Name"
          style={styles.inputText}
          value={name}
          onChangeText={text => setName(text)} 
        />
        <TextInput
          placeholder="Jackpot millions"
          style={styles.inputText}
          inputMode='numeric'
          value={jackpot}
          onChangeText={text => setJackpot(text)}
        />
        <TextInput
          placeholder="Price"
          style={styles.inputText}
          inputMode='numeric'
          value={price}
          onChangeText={text => setPrice(text)}
        />
        <TextInput
          placeholder="Draw Day 1 = Mon, 7 = Sun"
          style={styles.inptuText}
          inputMode='numeric'
          value={drawDay}
          onChangeText={text => setDay(text)}
        />
        <Button title="Add" onPress={handleAdd}/>
      </View>
  );
}

export default AddTicketScreen;
