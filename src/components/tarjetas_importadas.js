import React, {useState} from 'react';
import { StyleSheet, Text, View, Button, Image, Modal, Switch, SafeAreaView } from 'react-native';
import {Component} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack'; 
import {createDrawerNavigator} from '@react-navigation/drawer'; 
import { TextInput } from 'react-native-gesture-handler';
import { getDataAsync, storeDataAsync } from './funciones_async';



class TarjetaImportada extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            showModal: false,
            comentarioAnterior: '',
            comentarioAnteriorShow: true,
        }
    }
  
        
  abrirModal = async () =>{
    const comentariosViejos = await getDataAsync(this.props.datosPersona.login.uuid)
    
        if(comentariosViejos != ""){

            this.setState({showModal: true, comentarioAnterior: comentariosViejos})
        }else{
            this.setState({showModal: true, comentarioAnteriorShow: false})
        }
  }
         
  closeModal = () =>{
    this.setState({showModal: false})
  }
 
    
    render(){
        
        return(
            <>
        <View style={styles.tarjetaPadre}  >
            <View className="tarjetaImagen">
                <Image style={{width: 100,height:100}} source={{uri: this.props.datosPersona.picture.thumbnail}} alt="" ></Image>
            </View>
           
            <View className='tarjetaHijo'>
                <Text>{this.props.datosPersona.name.first}</Text>
                <Text>{this.props.datosPersona.name.last}</Text>
                <Text>{this.props.datosPersona.dob.age}</Text> 
                <Text onPress={this.abrirModal}>Ver Detalles</Text>
            

                <Text onPress={this.props.borrarTarjeta.bind(this, this.props.datosPersona)}>Eliminar tarjeta</Text>
                
                {/* <Switch style={{marginTop: 5}} ></Switch>    */}
               
            </View>
        </View>

        <Modal transparent={true} animationType="slide"  visible={this.state.showModal}>
            <SafeAreaView style={styles.modalContainer}>
            <View style={styles.modalData}>
                <Text style={this.close} onPress={this.closeModal}>X</Text>
                <Text>Detalles</Text>
                <Image style={{width: 200,height:200}} source={{uri: this.props.datosPersona.picture.large}} alt="" ></Image>
                <Text>{this.props.datosPersona.name.last}, {this.props.datosPersona.name.first}</Text>
                <Text>{this.props.datosPersona.dob.age}</Text> 
                <Text>{this.props.datosPersona.location.street.name}, {this.props.datosPersona.location.street.number}.</Text>
                <Text>{this.props.datosPersona.location.city}, {this.props.datosPersona.location.country}</Text>
                <Text>{this.props.datosPersona.location.postcode}</Text>
                <Text>{this.props.datosPersona.email}</Text>
                <Text>{this.props.datosPersona.phone}</Text> 
                <Text>{this.props.datosPersona.registered.date}</Text> 
                {this.state.comentarioAnteriorShow ? 
                
                <Text>Comentarios: {this.state.comentarioAnterior }</Text> :
                <Text>Esta tarjeta no tiene comentarios</Text>
                
                }

                
            </View>
            </SafeAreaView>
        </Modal>
        </>
        );
    }

}
const styles = StyleSheet.create({
    tarjetaPadre: {
        borderColor: 'grey',       
        width: 300,
        flex:1,
        flexDirection: 'row',
        margin: 20,
        justifyContent: 'space-around',
        backgroundColor: 'grey',
        padding: 20,
        borderRadius: 20,

      },
    modalData: {
        backgroundColor:'white',
         width: '80%',
         alignItems: 'center',
         justifyContent: 'center',
         height: 400,
         
    },
    modalContainer: {
         alignItems: 'center',
         alignItems: 'center',
         justifyContent: 'center',
         flex: 1,
         height: '50%'
    },
    close: {
        position: 'absolute',
        top: 10,
        right: 10,
    }
    })
export default TarjetaImportada;
