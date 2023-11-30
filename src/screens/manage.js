// TODO: fix so that list rerenders on go back
import React, {useState, useEffect} from 'react';
import {Text, View, Pressable, FlatList, SafeAreaView} from 'react-native';
import * as SQLite from 'expo-sqlite';
import {styles} from '../utils/styleSheet.js';

const ticketDB = SQLite.openDatabase('ticketData.db');

const ManageScreen = ({ navigation }) => {
  const [DATA, setData] = useState([]);

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


  const renderTickets = ({ item }) => {
    return (
      <View>
        <Text style={styles.subTitle}>{item.type}: ${item.price}, {item.jackpot} million</Text> 
      </View>
    )
  };

  return (
    <View style={styles.container}>
      <View style={styles.spacer}/>
      <View style={styles.rowContainer}>
        <Pressable style={styles.button} onPress={() => navigation.navigate('AddTicket')}>
          <Text style={styles.buttonText}>Add</Text>
        </Pressable>
        <View style={styles.spacer}/>
        <Pressable style={styles.button} onPress={() => navigation.navigate('Remove')}>
          <Text style={styles.buttonText}>Delete</Text>
        </Pressable>
      </View>
      <View style={styles.spacer}/>
      <SafeAreaView style={styles.subFlex}>
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

export default ManageScreen;
