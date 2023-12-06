import React, {useState, useEffect} from 'react';
import {Text, View, SafeAreaView, FlatList, Button} from 'react-native';
import * as SQLite from 'expo-sqlite';
import {styles} from '../utils/styleSheet.js';

const ticketDB = SQLite.openDatabase('ticketData.db');

const BrowseScreen= ({ navigation}) => {
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
      <View style={styles.rowContainer}>
        <Button title={item.type} onPress={() => navigation.navigate('Order', {ticketType: item.type})}/>
        <Text style={styles.subTitle}>: ${item.price}, ${item.jackpot} </Text>
      </View>
    )
  };

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <FlatList
          data = {DATA}
          renderItem={renderTickets}
          keyExtractor={(item, index) => index.toString()}
          ListEmptyComponent={() => (
            <View>
              <Text style={styles.subTitle}>No Tickets Available</Text>
            </View>
          )}
        />
      </SafeAreaView>
    </View>
  );
}

export default BrowseScreen;
