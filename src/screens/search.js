import React, {useState} from 'react';
import {Text, View, TextInput, Button} from 'react-native';
import * as SQLite from 'expo-sqlite';
import {styles} from '../utils/styleSheet.js';

const ticketDB = SQLite.openDatabase('ticketData.db');

const SearchScreen= ({ navigation}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResult, setSearchResult] = useState(null);

  const handleSearch = () => {
    ticketDB.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM tickets WHERE type LIKE ?',
        [`%${searchTerm}%`],
        (_, { rows }) => {
          setSearchResult(rows._array);
        },
        (error) => {
          console.error(error);
        }
      );
    });
  };
  return (
    <View style={styles.container}>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          inputMode='search'
          placeholder='Search'
          autoFocus = {true}
          defaultValue = '*'
          value={searchTerm}
          onChangeText={(text) => setSearchTerm(text)}
          onSubmitEditing={handleSearch}
        />
      </View>
      {searchResult && (
        <View style={styles.subFlex}>
          {searchResult.map((item) => (
            <Button
              key={item.id}
              title={item.type}
              onPress={() => console.log('Proceed to checkout')}
            />
          ))}
        </View>
      )}
    </View>
  );
}

export default SearchScreen;
