import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Touchable, FlatList, SafeAreaView, Modal } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import  Component from 'react-native';
import Tarjeta from './src/components/tarjetas'
import {getData} from './src/api/randomUser'
import 'react-native-gesture-handler';
// import {styles} from './src/styles/styles'


export default class App extends React.Component {
  constructor(){
    super();
    this.state = {
      personas: [],
      seleccionados: [],
      showModal: false,
      itemModal: {},


    }
}
  componentDidMount(){
    getData()
    .then(results => {
      // console.log(results);
      this.setState({personas: results});
    })
  }

  keyExtractor = (item, idx) => idx.toString();

  renderItem = ({item}) => {
    return(
      <TouchableOpacity onPress={() => this.abrirModal(item)}>
        <Tarjeta datosPersona={item}/>
      </TouchableOpacity>
    )
  }

  async storeFavoritos(){
    try{
      const jsonUsers = Json.strigify(this.state.seleccionados);
      await AsyncStorage.setItem('Favoritos', jsonUsers)
    }catch(e){
      console.log(e)
    }
  }

  abrirModal(item){
    this.setState({showModal: true, itemModal: null})
    console.log(item)
    console.log(this.state.itemModal)
  }

  render(){
    
    return (
      <SafeAreaView style = {styles.homePadre}>
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
        <Modal
          visible= {this.state.showModal}
          transparent= {false}
          animationType= 'slide'
          >
              <View  style={styles.modalPadre}>
                <View>
                 <Text>MOdal</Text>    
                </View>
              </View>
         </Modal>
        {/* Footer
        <View>
        <Text>Footer</Text>  
      </View> */}
      </SafeAreaView>
     
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
      modalPadre:{
        height: 200,
        width:200,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
      }
    })