import React, {useContext, useEffect, useState, useRef} from 'react';
import {Text, View, TextInput, Keyboard, Button, Pressable, Alert} from 'react-native';
import * as SQLite from 'expo-sqlite';
import {styles} from '../utils/styleSheet.js';
import UserContext from '../constants/UserContext.js';

import { getRandomNumbers } from '../utils/Random_pick.js';
import { Generate_Con_number} from '../utils/Confirm_number.js';

const ticketDB = SQLite.openDatabase('ticketData.db');
const transactionDB = SQLite.openDatabase('transactionData.db');

const OrderScreen = ({ route, navigation }) => {
  const { User, setUser } = useContext(UserContext);
  const [ticketData, setTicketData] = useState(null);
  const {ticketType, otherParam} = route.params;

  const [ticketNums, setNums] = useState([]);
  const refs = useRef(Array(5).fill(null))
  
  // purchase info
  const [card, setCard] = useState('')
  const [exp,setExp] = useState('')
  const [cvv, setCvv] = useState('')

  useEffect(() => {
    ticketDB.transaction(
      tx => {
        tx.executeSql(
          'SELECT * FROM tickets WHERE type = ?',
          [ticketType],
          (_, {rows}) => {
            if (rows.length >0) {
              setTicketData(rows.item(0));
            }
          },
          (_, error) => {
            console.log('Transaction error:', error);
          }
        );
      });
  }, [ticketType]);

  const handleNumChange = (index, value) => {
    const updatedNums = [...ticketNums]
    updatedNums[index] = parseInt(value, 10);
    setNums(updatedNums);
    if (value.length===2) {
      const nextIndex = index + 1;
      if (nextIndex < 5) {
          setTimeout(() => {
            refs.current[nextIndex].focus();
          },10);
      }
      else {
          Keyboard.dismiss();
      }
    }
  };

  const handleQuickPick = () => {
    const randomNumbers = getRandomNumbers(5);
    setNums(randomNumbers);
    randomNumbers.forEach((number, index) => {
      refs.current[index].setNativeProps({text: String(number)});
    });
  };

  const handleConfirm = () => {
    const numSoldUpdate = ticketData.numsold + 1;
    const numbers = ticketNums.join(',');
    const confirmation = Generate_Con_number(10); // change for different length con num
    const cashed = false;
    const winner = false;
    transactionDB.transaction(tx => {
      tx.executeSql(
        'INSERT INTO transactions (userId, ticketId, confirmation, numbers, winner, cashed) VALUES (?, ?, ?, ?, ?, ?)',
        [User, ticketData.id, confirmation, numbers, winner, cashed],
        (_, result) => {
          console.log('Trasnaction successful');
          navigation.popToTop();
        },
        (_, error) => {
          console.log('Error Processing Transaction:', error);
          Alert.alert('Error', 'Purchase could not be processed.');
        }
      );
    });
  };

  refs.current = refs;
  return (
    <View style={styles.container}>
      {ticketData ? (
        <View style={styles.container}> 
          <Text style={styles.subTitle}>{ticketData.type}: ${ticketData.price}</Text>
          <Text style={styles.subTitle}>Jackpot: ${ticketData.jackpot} million</Text>
          <View style={styles.spacer}/>
          <View style={styles.rowContainer}>
            {Array.from({length: 5}, (_, index) => (
                <View>
                  <View style={styles.spacer}/>
                  <TextInput
                    ref={ref => refs.current[index] = ref}
                    key={index}
                    style={styles.input}
                    inputMode='numeric'
                    onChangeText={(value) => handleNumChange(index, value)}
                    placeholder='0'
                    defaultValue={ticketNums[index] ? String(ticketNums[index]): ''}
                  />
                </View>
              ))}
          </View>
          <Button title='Quick Pick' onPress={handleQuickPick}/>
          <View style={styles.subFlex}>
            <TextInput
              placeholder='Card Number'
              style={styles.inputText}
              secureTextEntry
              inputMode='numeric'
              value = {card}
              onChangeText={text => setCard(text)}
            />
            <View style={styles.rowContainer}>
              <TextInput
                placeholder='Exp mm/yyyy'
                inputMode='numeric'
                style={styles.inputText}
                value={exp}
                onChangeText={text => setExp(text)}
              />
              <View style={styles.spacer}/>
              <TextInput
                placeholder='cvv'
                inputMode='numeric'
                style={styles.inputText}
                value={cvv}
                onChangeText = {text => setCvv(text)}
              />
            </View>
            <View style={styles.bottomFlex}>
              <Pressable style={styles.button} onPress={handleConfirm}>
                <Text style={styles.buttonText}>Confirm</Text>
              </Pressable>
            </View>
          </View>
        </View>
      ) : (
        <Text style={styles.inputText}>Loading...</Text>
      )}
    </View>
  );
}

export default OrderScreen;
