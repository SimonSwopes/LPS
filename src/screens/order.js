import React, {useContext, useEffect, useState, useRef} from 'react';
import {Text, View, TextInput, Keyboard, Button, Pressable, Alert} from 'react-native';
import * as SQLite from 'expo-sqlite';
import {styles} from '../utils/styleSheet.js';
import UserContext from '../constants/UserContext.js';

import { getRandomNumbers } from '../utils/Random_pick.js';
import { Generate_Con_number} from '../utils/Confirm_number.js';

const ticketDB = SQLite.openDatabase('ticketData.db');
const transactionDB = SQLite.openDatabase('transactionData.db');
const paymentDB = SQLite.openDatabase('paymentData.db');

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
    const confirmation = Generate_Con_number(10); // change for different length con num
    const cashed = 0;

    const winningNumbersArray = ticketData.winningNumbers.split(',').map(num => parseInt(num, 10));
    const numbersArray = ticketNums.map(num => parseInt(num, 10));

    // Calculate winnings based on matching numbers
    let matched = 0;
    for (let i = 0; i < numbersArray.length; i++) {
      if (numbersArray[i] === winningNumbersArray[i]) {
        matched += 1;
      }
    }

    // Determine the percentage of the jackpot based on the number of matches
    const jackpotPercentage = getJackpotPercentage(matched);
    const winnings = ticketData.jackpot * jackpotPercentage;

    const winner = matched > 0; // User is a winner if there is at least one match



    transactionDB.transaction(tx => {
      tx.executeSql(
        'INSERT INTO transactions (userId, ticketId, ticketName, confirmation, numbers, winner, cashed, jackpot, winnings) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [User, ticketData.id, ticketData.type, confirmation, ticketNums.join(','), winner, cashed, ticketData.jackpot, winnings],
        (_, result) => {
          console.log('Transaction successful');
          paymentDB.transaction(tx => {
              tx.executeSql(
                'INSERT INTO payments (userId, name, ccnum, ccexp, cvv) VALUES (?, ?, ?, ?, ?)',
                [User, User.name, card, exp, cvv],
                (_, paymentresult) => {
                  console.log('Payment information saved successfully');
                  if (winner) {
                    navigation.replace('Cashout');
                  }
                  else
                    navigation.replace('Home')
                },
                (_, paymenterror) => {
                  console.log('Error Processing Payment Information:', error);
                  Alert.alert('Error', 'Information could not be processed.');
                }
              );
            });
          },
        (_, error) => {
          console.log('Error Processing Transaction:', error);
          Alert.alert('Error', 'Purchase could not be processed.');
        }
      );
    });
  };

  const getJackpotPercentage = (matched) => {
    switch (matched) {
      case 2:
        return 0.01; // 1% of the jackpot
      case 3:
        return 0.05; // 5% of the jackpot
      case 4:
        return 0.2; // 20% of the jackpot
      case 5:
        return 1; // 100% of the jackpot
      default:
        return 0; // No jackpot
    }
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
                pattern="\d{2}/\d{4}"
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