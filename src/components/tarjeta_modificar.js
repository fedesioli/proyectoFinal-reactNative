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
                <Text>{this.props.datosPersona.dob.age} años</Text> 
                <View style={styles.seleccionar}>

                <Text onPress={this.abrirModal}>Comentar</Text>
                </View>
                
                
                
                {/* <Switch style={{marginTop: 5}} ></Switch>    */}
               
            </View>
        </View>

        <Modal transparent={true} animationType="slide"  visible={this.state.showModal}>
            <SafeAreaView style={styles.modalContainer}>
            <View style={styles.modalData}>
               
                <Text style={styles.close} onPress={this.closeModal}>X</Text>
                <Text style={styles.detallesTxt}>Deja tu comentario</Text>
                <Image style={{width: 200,height:200}} source={{uri: this.props.datosPersona.picture.large}} alt="" ></Image>
                <View style={styles.bodyTxt} >

                <Text>{this.props.datosPersona.name.last}, {this.props.datosPersona.name.first}</Text>
                <Text>Comentarios anteriores:</Text>
                <Text>{this.state.comentarioAnterior}</Text>
                </View>
                <TextInput  placeholder="Deja aca tu comentario" style={styles.inputSearch}  onChangeText={(value)=> this.setState({comentario: value}) }  /> 
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
        marginTop: 20,
    },
    inputSearch: {
        margin:10,
        justifyContent: 'center',
        alignItems: "center",
        backgroundColor: "white",
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 3,
        width:'50%',
        height:35,

      },
    })
export default TarjetaModificar;
