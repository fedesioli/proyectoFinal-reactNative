import React, {useState} from 'react';
import { StyleSheet, Text, View, Button, Image, Modal, Switch } from 'react-native';
import {Component} from 'react-native';



class TarjetaPapelera extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            
        }
    }
  
        
    
    
    
    
    render(){
        
        return(
        <View style={styles.tarjetaPadre}  >
            <View className="tarjetaImagen">
                <Image style={{width: 100,height:100}} source={{uri: this.props.datosPersona.picture.thumbnail}} alt="" ></Image>
            </View>
           
            <View className='tarjetaHijo'>
                <Text>{this.props.datosPersona.name.first}</Text>
                <Text>{this.props.datosPersona.name.last}</Text>
                <Text>22 - 2/6/2001</Text> 
                <Text onPress={this.props.borrarTarjeta.bind(this, this.props.datosPersona)}>Eliminar tarjeta</Text>
                
                {/* <Switch style={{marginTop: 5}} ></Switch>    */}
                {/* <Button onClick={this.verDetalles.bind(this)}>Detalles</Button>
                <Button className='borrar' onClick={this.props.onDelete.bind(this, this.props.datospersona.login.uuid)}>Borrar</Button> */}
            </View>
        </View>
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
    })
export default TarjetaPapelera;
