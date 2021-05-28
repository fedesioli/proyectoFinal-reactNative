import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Touchable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import  Component from 'react-native';
import Tarjeta from './tarjetas'


export default class App extends Component {
  constructor(props){
    super(props);
    this.state = {
        items: [],
        itemsOriginales: [],     
    }
}

  render(){
    
    return (
      <>
      {/* Header */}
      <View>
        <Text>Header</Text>  
      </View>
      {/* Body */}
      <View>
        <Tarjeta />
      </View>
      {/* Footer */}
      <View>
      <Text>Header</Text>  
      </View>
      
      
      </>
     
    );
  }
  }
