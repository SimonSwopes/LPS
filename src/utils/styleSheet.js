import React from 'react';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  subContainer: {
    flex: 2,
    justifyContent: 'center',
    width: "80%",
    alignItems: 'center',
    backgroundColor: '#fff',
  },

  leftAlignContainer: {
    flex: 2,
    justifyContent: 'center',
    width: "100%",
    alignItems: 'left',
    backgroundColor: '#fff',
  },

  rowContainer: {
    flexDirection: 'row',
  },

  title: {
    color: '#000',
    fontFamily: 'Helvetica',
    fontSize: 48,
    fontWeight: 'bold',
  },

  subTitle: {
    color: '#000',
    fontWeight: 'bold',
    fontFamily: 'Helvetica',
    fontSize: 24,
  },

  profileText: {
    color: '#000',
    fontWeight: 'bold',
    fontFamily: 'Helvetica',
    fontSize: 30,
  },
  
  inputView: {
    marginTop: 40,
    width: "80%",
    borderColor: '#000',
    borderRadius: 25,
    height:50,
    justifyContent: 'center',
    padding: 20,
    borderWidth: 1,
    alignItems: 'center',
  },

  inputText:{
    height:50,
    color:'#000',
  },

  button:{
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 25,
    backgroundColor: '#0096FF',
    width: 175,
  },

  signOutButton:{
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 25,
    backgroundColor: '#0096FF',
    width: 500,
    marginBottom: 150
  },

  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontFamily: 'Helvetica',
    fontSize: 40,
  },

  spacer: {
    width: 20,
    height: 20,
  },
});
