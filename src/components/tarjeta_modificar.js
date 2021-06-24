import React, {useState} from 'react';
import { StyleSheet, Text, View, Button, Image, Modal, Switch, SafeAreaView, TextInput } from 'react-native';
import {Component} from 'react-native';
import { getDataAsync, storeDataAsync } from './funciones_async';



class TarjetaModificar extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            showModal: false,
            comentario: {},
            comentarioAnterior: '',
        }
    }
  
        
    componentDidMount(){
        this.setState({tarjeta: this.props.datosPersona})
    }
 
    abrirModal = async () =>{
        const comentariosViejos = await getDataAsync(this.props.datosPersona.login.uuid)
        // console.log(comentariosViejos)
        this.setState({showModal: true, comentarioAnterior: comentariosViejos})
      }
             
      closeModal = () =>{
        this.setState({showModal: false})
      }

      guardarComentario = async () =>{
        //   console.log(this.props.datosPersona.login.uuid)
        const comentariosAnteriores = await getDataAsync(this.props.datosPersona.login.uuid)
        const comentarui = this.state.comentario
        storeDataAsync(comentarui, this.props.datosPersona.login.uuid)
        // console.log(comentarui)
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
                <Text onPress={this.abrirModal}>Comentar</Text>
                
                
                
                {/* <Switch style={{marginTop: 5}} ></Switch>    */}
               
            </View>
        </View>

        <Modal transparent={true} animationType="slide"  visible={this.state.showModal}>
            <SafeAreaView style={styles.modalContainer}>
            <View style={styles.modalData}>
               
                <Text style={this.close} onPress={this.closeModal}>X</Text>
                <Image style={{width: 100,height:100}} source={{uri: this.props.datosPersona.picture.large}} alt="" ></Image>
                <Text>{this.props.datosPersona.name.last}, {this.props.datosPersona.name.first}</Text>
                <Text>Comentarios anteriores:</Text>
                <Text>{this.state.comentarioAnterior}</Text>
                <TextInput  placeholder="Deja aca tu comentario" style={this.inputSearch}  onChangeText={(value)=> this.setState({comentario: value}) }  /> 
                <Button title="Guardar comentario" onPress={this.guardarComentario.bind(this, this.props.datosPersona.uuid)}></Button>
                
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
export default TarjetaModificar;
