import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Touchable, FlatList, SafeAreaView, Modal } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Tarjeta from './src/components/tarjetas'
import {getData} from './src/api/randomUser'
import TarjetasApi from './src/screens/screen_tarjetasApi'

import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack'; 


const Stack = createStackNavigator();

export default class App extends React.Component {
  constructor(){
    super();
    this.state = {
    
    }
}
 
  render(){
    
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name='tarjetasApi' component={TarjetasApi}/>
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
  }

