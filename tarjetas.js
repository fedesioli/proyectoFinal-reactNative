import React from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import {Component} from 'react-native';



class Tarjeta extends Component{

    constructor(props){
        super(props);
        this.state = {
            colorOriginal: props.color,  
            displayDetalles: props.displayDetalle            
        }
    }

    


    render(){
        return(
        <View className="tarjetaPadre"  
        // style = {{backgroundColor: this.state.color, flexDirection: this.props.flex, width: this.props.widthPadre}}    
        >
            <View className="tarjetaImagen" 
            // style = {{width: this.props.widthTarjeta, height: this.props.heightTarjeta}}
            >
                <Image source={require('./Images/ejemploimg.jpg')} alt="" ></Image>
            </View>
           
            <View className='tarjetaHijo' 
            style = {{width: this.props.widthTarjeta, height: this.props.heightTarjeta}}
            >
                <Text>Juan Perez</Text>
                <Text>Juancitofacha@gmail.com</Text>
                <Text>22 - 2/6/2001</Text>    
                <Button onClick={this.verDetalles.bind(this)}>Detalles</Button>
                <Button className='borrar' onClick={this.props.onDelete.bind(this, this.props.datospersona.login.uuid)}>Borrar</Button>
            </View>
           
        </View>
        );
    }

}

export default Tarjeta;
