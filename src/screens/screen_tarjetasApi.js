import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Touchable, FlatList, SafeAreaView, Modal } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import  Component from 'react-native';
import Tarjeta from '../components/tarjetas'
import {getData} from '../api/randomUser'


 class TarjetasApi extends React.Component {
  constructor(){
    super();
    this.state = {
      personas: [],
      seleccionados: [],
      showModal: false,
      itemModal: null,

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
    this.setState({showModal: true, itemModal: item})
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
                <View  style={styles.modalHijo}>
                 <Text>{
                  this.state.itemModal &&
                  this.state.itemModal.name.first
                  }</Text>    
                 <Text style={styles.closeModal} onPress={() => this.setState({showModal: false})}>X</Text> 
                </View>
              </View>
         </Modal>
        
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
       
        backgroundColor: 'rgba(0,0,0,0.1)',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
      },
      modalHijo: {
        height: 100,
        width:200,  
        backgroundColor: 'grey',
        alignItems: 'center',
        justifyContent: 'center',
      },
      closeModal:{
        position: 'absolute',
        top: 10,
        right: 10,
      }
    })
    export default TarjetasApi;