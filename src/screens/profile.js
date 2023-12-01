import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Button, Pressable } from 'react-native';
import * as SQLite from 'expo-sqlite';
import { styles } from '../utils/styleSheet'; // Make sure to adjust the path based on your project structure

const db = SQLite.openDatabase('userData.db');

const ProfileScreen = ({ navigation }) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Fetch user data from the 'users' table
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM users WHERE email = ?', // Assuming you have a user ID once they are logged in
        [userdata.email], // Replace with the actual user ID
        (_, result) => {
          if (result.rows.length > 0) {
            const user = result.rows.item(0);
            setUserData(user);
          }
        },
        (_, error) => {
          console.log('Error fetching user data: ', error);
        }
      );
    });
  }, []);

  const handleSignOut = () => {
    // Implement sign-out logic if needed
    // For simplicity, let's just navigate back to the login page
    navigation.popToTop(); // This will navigate to the first screen in the stack (login page)
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Profile</Text>
      {userData ? (
        <View style={styles.leftAlignContainer}>
          <Text style={styles.profileText}>Name: {"\n\t"}{userData.name}</Text>
          <Text style={styles.profileText}>Email: {"\n\t"}{userData.email}</Text>
          <Text style={styles.profileText}>Address: {"\n\t"}{userData.address}</Text>
          <Text style={styles.profileText}>Phone: {"\n\t"}{userData.phone}</Text>
          {/* Add other fields as needed */}
        </View>
      ) : (
        <Text>Loading...</Text>
      )}

      {/* Sign-out button */}
      <Pressable style = {styles.signOutButton} onPress={handleSignOut}>
        <Text style = {styles.buttonText}>
          Sign Out
        </Text>
      </Pressable>
    </ScrollView>
  );
};

export default ProfileScreen;
