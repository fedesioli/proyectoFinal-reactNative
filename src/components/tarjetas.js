import React, {useState} from 'react';
import { StyleSheet, Text, View, Button, Image, Modal, Switch } from 'react-native';
import {Component} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { fas, far } from '@fortawesome/free-brands-svg-icons'


class Tarjeta extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            seleccionado: false,
            displaySeleccionar: "flex",
            displayDeseleccionar: "none"
        }
    }
  
        
    ifSeleccionado = () => {
        
        if(this.state.seleccionado === false){
            this.props.agregarASeleccionados(this.props.datosPersona)
            this.setState({seleccionado: true,})
        } else {
            this.props.deseleccionar(this.props.datosPersona.login.uuid)
            this.setState({seleccionado: false,})
        }
        console.log(this.state.seleccionado)
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

                {this.state.seleccionado === false ? 
                <FontAwesomeIcon icon={faCheckCircle} onPress={()=> this.ifSeleccionado(this.props.datosPersona.login.uuid)}/> :
                <FontAwesomeIcon icon={faTimesCircle} onPress={()=> this.ifSeleccionado(this.props.datosPersona.login.uuid)}/>
                }
                {/* if ({this.props.seleccionado}) {
                    <FontAwesomeIcon icon={faCheckCircle} onPress={()=> this.ifSeleccionado(this.props.datosPersona.login.uuid)}/>
                    // <Text onPress={()=> this.ifSeleccionado(this.props.datosPersona.login.uuid)} >Agregar a seleccionados</Text>    
                } else {
                    <FontAwesomeIcon icon={faTimesCircle} onPress={()=> this.ifSeleccionado(this.props.datosPersona.login.uuid)}/>
                    // <Text onPress={()=> this.ifSeleccionado(this.props.datosPersona.login.uuid)} >Agregar a seleccionados</Text>
                } */}

               
                
                
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
export default Tarjeta;
