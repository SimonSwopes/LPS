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

  rowContainer: {
    flexDirection: 'row',
  },

  title: {
    color: '#000',
    fontFamily: 'Times New Roman',
    fontSize: 48,
    fontWeight: 'bold',
  },

  subTitle: {
    color: '#000',
    fontFamily: 'Times New Roman',
    fontSize: 24,
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

  buttonText: {
    color: '#fff',
    fontFamily: 'Times New Roman',
    fontSize: 24,
  },

  spacer: {
    width: 20,
    height: 20,
  },
});
