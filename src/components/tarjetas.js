import React from 'react';
import { StyleSheet, Text, View, Button, Image, Modal } from 'react-native';
import {Component} from 'react-native';



class Tarjeta extends React.Component{

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
        
      },
    })
export default Tarjeta;
