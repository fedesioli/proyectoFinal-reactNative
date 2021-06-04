import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Touchable, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import  Component from 'react-native';
import Tarjeta from './src/components/tarjetas'
import {getData} from './src/api/randomUser'
// import {styles} from './src/styles/styles'


export default class App extends React.Component {
  constructor(){
    super();
    this.state = {
      personas: [],
    }
}
  componentDidMount(){
    getData()
    .then(results => {
      console.log(results);
      this.setState({personas: results});
    })
  }

  keyExtractor = (item, idx) => idx.toString();
  renderItem = ({item}) => {
    return(
      <Tarjeta datosPersona={item}/>
    )
  }

  render(){
    
    return (
      <View style = {styles.homePadre}>
        {/* Header */}
        <View style={styles.headerPadre}>
          <Text>Header</Text>  
        </View>
        {/* Body */}
        <FlatList
          data={this.state.personas}
          renderItem={this.renderItem}
          keyExtractor={this.keyExtractor}
        />
        {/* Footer
        <View>
        <Text>Footer</Text>  
        </View> */}
      </View>
     
    );
  }
  }


const styles = StyleSheet.create({
    homePadre: {        
        width: '100%'
      },
      headerPadre: {
        paddingTop: 30,
        marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: 50,
        backgroundColor: 'gray'
      },
      tarjetasContainer: {
        alignItems: 'center',
        justifyContent: 'center',
      },
    })