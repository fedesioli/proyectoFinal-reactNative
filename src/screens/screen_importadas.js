import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Touchable, FlatList, SafeAreaView, Modal } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import  Component from 'react-native';
import TarjetaImportada from '../components/tarjetas_importadas'
import {getData} from '../api/randomUser'

class Importadas extends React.Component {
    constructor(){
        super();
        this.state = {
         personasFavoritas: []
    
        }
    }

componentDidMount(){
    this.getDataImportados()
    
}

borrarTarjeta = (idTarjeta)=>{
  let resultado = this.state.personasFavoritas.filter( (item)=> {

      return item.login.uuid !== idTarjeta;
  })
  this.setState({personasFavoritas: resultado});
}

renderItem = ({item}) => {
    return(
          // <TouchableOpacity onPress={() => this.abrirModal(item)}>
            <TarjetaImportada style={styles.tarjeta} datosPersona={item} borrarTarjeta={this.borrarTarjeta}/>
          // </TouchableOpacity>
    )
}
    
async getDataImportados(){
    try{
          const resultado = await AsyncStorage.getItem('Favoritos');
          this.setState({personasFavoritas: JSON.parse(resultado)});
          return resultado;   
    }catch(e){
          console.log(e)
    }
}

borrarStorageCompleto(){
  
}


render(){

   
    return (
        <SafeAreaView>
            <View style={styles.tarjetasContainer}>

            <Text>Tarjetas importadas</Text>

            <FlatList
          data={this.state.personasFavoritas}
          renderItem={this.renderItem}
          keyExtractor={this.keyExtractor}
        />
          <Text onPress={this.borrarStorageCompleto}>Borrar Storage</Text>
            </View>

        </SafeAreaView>

    )
}
}

const styles = StyleSheet.create({
    homePadre: {        
        width: '100%'
      },
      tarjeta:{
        padding:50,
      },
      tarjetasContainer: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20
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
    

export default Importadas