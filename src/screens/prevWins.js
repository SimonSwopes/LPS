import React, {useContext, useEffect, useState} from 'react';
import {Text, View, Alert, FlatList, Button} from 'react-native';
import * as SQLite from 'expo-sqlite';

import UserContext from '../constants/UserContext.js';

const transactionDB = SQLite.openDatabase('transactionData.db');

import {styles} from '../utils/styleSheet.js';

const PreviousWinsScreen= ({ navigation}) => {

  const {User, setUser} = useContext(UserContext);
  const [DATA, setData] = useState(null);

  useEffect(() => {
    transactionDB.transaction(
      tx => {
        'SELECT * FROM  transactions WHERE userID = ?, winner = 1',
        [User],
        (_, {rows}) => {
          if (rows.length > 0) {
            setData(rows._array);
          }
        },
        (error) => {
          console.log('Transaction Error:', error);
          Alert.alert('Error', 'Unable to retrieve winners at this time');
        }
      });
  }, [User]);

  const handleRedeem = ({ item }) => {
    transactionDB.transaction(
      tx => {
        'UPDATE transactions SET cahsed = 1 WHERE id = ?',
        [item.id],
        (_, {rowsAffected}) => {
          if (rowsAffected > 0) {
            console.log('Redeem Sucessful');
            Alert.alert('Reedemed', 'Your Ticket has been redeemed');
          } else {
            console.log('Redeem Failed');
            Alert.alert('Error', 'Unable to redeem at this time.');
          }
        }
      }
    );
  };

  const renderWinners = ({ item }) => {
    return (
      <View>
        <Button title={item.confirmation} onPress={() => console.log('Redeem')}/>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={renderWinners}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={() => (
          <View>
            <Text style={styles.subTitle}>No Winners</Text>
          </View>
        )}
      />
    </View>
  );
}

export default PreviousWinsScreen;
