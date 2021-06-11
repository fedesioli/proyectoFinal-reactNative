import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Touchable, FlatList, SafeAreaView, Modal } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Tarjeta from './src/components/tarjetas'
import {getData} from './src/api/randomUser'
import TarjetasApi from './src/screens/screen_tarjetasApi'
import Home from './src/screens/screen_home'
import Importadas from './src/screens/screen_importadas'
import Papelera from './src/screens/screen_papelera'
import Modificar from './src/screens/screen_modificar'

import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack'; 
import {createDrawerNavigator} from '@react-navigation/drawer'; 


const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

export default class App extends React.Component {
  constructor(){
    super();
    this.state = {
    
    }
}
 
  render(){
    
    return (
      // <NavigationContainer>
      //   <Stack.Navigator>
      //     <Stack.Screen name='home' component={Home}/>
      //     <Stack.Screen name='tarjetasApi' component={TarjetasApi}/>
      //     <Stack.Screen name='importadas' component={Importadas}/>
      //     <Stack.Screen name='modificar' component={Modificar}/>
      //     <Stack.Screen name='papelera' component={Papelera}/>
      //   </Stack.Navigator>
      // </NavigationContainer >
          
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="tarjetasApi">
          <Drawer.Screen name='tarjetasApi' component={TarjetasApi}/>
          <Drawer.Screen name='importadas' component={Importadas}/>
          <Drawer.Screen name='modificar' component={Modificar}/>
          <Drawer.Screen name='papelera' component={Papelera}/>
        </Drawer.Navigator>
      </NavigationContainer>
    );
  }
  }

