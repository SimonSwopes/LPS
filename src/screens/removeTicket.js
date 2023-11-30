import React, {useEffect, useState} from 'react';
import {Text, View, SafeAreaView, FlatList, Button, Alert} from 'react-native';
import * as SQLite from 'expo-sqlite';

import {styles} from '../utils/styleSheet.js';

const ticketDB = SQLite.openDatabase('ticketData.db');

const RemoveTicket = ({ navigation }) => {
  const [DATA, setData] = useState([])

  useEffect(() => {
    ticketDB.transaction(
      tx => {
        tx.executeSql(
          'SELECT * FROM tickets',
          [],
          (_, result) => {
            const dataFromDB = result.rows._array;
            setData(dataFromDB);
          }
        );
      },
      error => {
        console.log('Transaction error:', error);
      }
    );
  }, []);

  const handleDelete = ( item ) => {
    const name = item.type;
    Alert.alert('Are you sure?', `Pressing 'yes' will delete ${name} permanently`, [
      {
        text: 'no',
        onPress: () => {
          // No action taken
        },
      },
      {text: 'yes', 
      onPress: () => {
        console.log('Deleting:', name);
        ticketDB.transaction(
          tx => {
            tx.executeSql(
              'DELETE FROM tickets WHERE type = ?',
              [name],
              (_, result) => {
                console.log('Item deleted successfully');
                // Fetch updated data and set it in the state
                tx.executeSql(
                'SELECT * FROM tickets',
                [],
                (_, result) => {
                  const updatedData = result.rows._array;
                  setData(updatedData);
                }
              );
            },
            (_, error) => {
              console.log('Error deleting item:', error);
            }
          );
        },
        error => {
          console.log('Transaction error:', error);
        }
      );
    },
      },
    ])
  };

  const renderTickets = ({ item }) => {
    return (
      <View>
        <Button title={item.type} onPress={() => handleDelete(item)}/>
      </View>
    )
  };

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <FlatList
          data = {DATA}
          renderItem = {renderTickets}
          keyExtractor={(item, index) => index.toString()}
          ListEmptyComponent={() => (
            <View>
              <Text style={styles.subTitle}>No Tickets</Text>
            </View>
          )}
        />
      </SafeAreaView>
    </View>
  );
}
export default RemoveTicket;
