import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Touchable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import  Component from 'react-native';



export default class App extends Component {
  constructor(){
  super();
  this.state = {
    saludo: '',
    objeto: '',
  }}

  componentDidMount(){
    this.getStringStorage()
    this.getObjectStorage()
  }

  async storageObject(value){
    try{
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('@myObject', jsonValue);
    }
    catch(error){
    console.log(error);
  }
  }

  async getObjectStorage(value){
    try{
      const value = await AsyncStorage.getItem('@myObject');
      if(value !== null){
        const objetoRecuperado = JSON.parse(value);
        this.setState({objeto: objetoRecuperado})
      }else{
        console.log('valor no encontrado')
      }
    }catch(error){
      console.log(error);
    }
  }

  async storageString(value){
    try{
      await AsyncStorage.setItem('@myString', value);
    } catch (error){
      console.log(error);
    }  
  }  


  async getStringStorage(value){
    try{
        const value = await AsyncStorage.getItem('@myString')
        if(value !== null){

        }else{
          console.log('No existe la clave');  
        }
      } 
        catch (error){
        console.log(error);
      }
      
  }

  async removeItem(key){
    try{
      await storageObject.removeItem(key)
    }catch(error){
      console.log(error);
    }
  }
  
  render(){
    
    const {saludo, objeto} = this.state;

    return (

      <View style={styles.container}>
        <TouchableOpacity 
        onPress={() => this.storageString('La data se guardo')}>
        <Text>Probando async storage!</Text>
        </TouchableOpacity>

        <TouchableOpacity 
        onPress={() => this.storageObject({name: 'jose', lastName: 'perez'})}>
        <Text>Guardando un objeto!</Text>
        </TouchableOpacity>




        <StatusBar style="auto" />
      </View>
    );
  }
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
