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
  
    // Aca abrimos el modal de detalles
  abrirModal = async () =>{
    // Traemos los comentarios de la tarjeta guardados en el async
    const comentariosViejos = await getDataAsync(this.props.datosPersona.login.uuid)
    // Nos fijamos si tiene comentarios guardados
        if(comentariosViejos != ""){
    // Si tiene gaurdamos el comentario en el estado y abrimos el modal
            this.setState({showModal: true, comentarioAnterior: comentariosViejos})
        }else{
    // Si no tiene solo abrimos el modal y en el estado decimos que no tiene comentarios
            this.setState({showModal: true, comentarioAnteriorShow: false})
        }
  }
// Aca cerramos el modal
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
                <Text>{this.props.datosPersona.dob.age} años</Text> 

                <View style={styles.seleccionar}>

                <Text onPress={this.abrirModal}>Ver Detalles</Text>
            

                <Text onPress={this.props.borrarTarjeta.bind(this, this.props.datosPersona)}>Eliminar tarjeta</Text>
                </View>
                
                {/* <Switch style={{marginTop: 5}} ></Switch>    */}
               
            </View>
        </View>

        <Modal transparent={true} animationType="slide"  visible={this.state.showModal}>
            <SafeAreaView style={styles.modalContainer}>
            <View style={styles.modalData}>
                <Text style={styles.close} onPress={this.closeModal}>X</Text>
                <Text style={styles.detallesTxt}>Detalles</Text>
                <Image style={{width: 200,height:200}} source={{uri: this.props.datosPersona.picture.large}} alt="" ></Image>
                <View style={styles.bodyTxt} >  
                <Text>{this.props.datosPersona.name.last}, {this.props.datosPersona.name.first}</Text>
                <Text>{this.props.datosPersona.dob.age} años</Text> 
                <Text>{this.props.datosPersona.location.street.name}, {this.props.datosPersona.location.street.number}.</Text>
                <Text>{this.props.datosPersona.location.city}, {this.props.datosPersona.location.country}</Text>
                <Text>{this.props.datosPersona.location.postcode}</Text>
                <Text>{this.props.datosPersona.email}</Text>
                <Text>{this.props.datosPersona.phone}</Text> 
                <Text>{this.props.datosPersona.registered.date}</Text> 
                </View>
                <View style={styles.seleccionar}>
                {/* Aca hacemos un if para ver si mostramos comentarios o no */}
                {this.state.comentarioAnteriorShow ? 
                
                <Text>Comentarios: {this.state.comentarioAnterior }</Text> :
                <Text>Esta tarjeta no tiene comentarios</Text>
                
                 }
                </View>

                
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
         height: '70%',
         borderColor: 'black',
         borderWidth: 2,
         borderRadius: 5
         
    },
    modalContainer: {
         alignItems: 'center',
         alignItems: 'center',
         justifyContent: 'center',
         flex: 1,
         height: '50%',
         backgroundColor: 'rgba(201,201,201, .5)'
    },
    close: {
        position: 'absolute',
        top: 10,
        right: 15,
        fontSize: 20
    },
    detallesTxt:{
        fontSize: 20,
        position: 'absolute',
        top: '5%'

    },
    bodyTxt:{
        textAlign: 'left',
        fontSize: 17,
        marginBottom: '5%',
        marginTop: '5%',
        width: '80%'
    },
    seleccionar:{
        marginTop: 20
    },
    seleccionar:{
        marginTop: 20,
    }

    })
export default TarjetaImportada;
