import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Touchable, FlatList, SafeAreaView, Modal } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import  Component from 'react-native';
import TarjetaImportada from '../components/tarjetas'
import {getData} from '../api/randomUser'

class Papelera extends React.Component {
    constructor(){
        super();
        this.state = {
            tarjetasEnPapelera: []
    
        }
    }
    componentDidMount(){
        this.traerPapelera()
        
    }
    
    keyExtractor = (item, idx) => item.login.uuid.toString();
    
    
    renderItem = ({item}) => {
        return(
              // <TouchableOpacity onPress={() => this.abrirModal(item)}>
                <TarjetaImportada style={styles.tarjeta} datosPersona={item} borrarTarjeta={this.borrarTarjeta}/>
              // </TouchableOpacity>
        )
    }
      
    async traerPapelera(){
        try{
              const resultado = await AsyncStorage.getItem('Papelera');
              this.setState({tarjetasEnPapelera: JSON.parse(resultado)});
              return resultado;   
        }catch(e){
              console.log(e)
        }
      }
      
render(){

    return (
        <SafeAreaView>
        <View style={styles.tarjetasContainer}>

        <Text>Papelera de reciclaje</Text>

        <FlatList
      data={this.state.personasFavoritas}
      renderItem={this.renderItem}
      keyExtractor={this.keyExtractor}
    />
     <View style={styles.hamburguerButton}>
        <TouchableOpacity onPress={()=> this.props.navigation.toggleDrawer()}>
              <Text  style={styles.burgerText}>=</Text>         
       </TouchableOpacity>           
          </View>
      {/* <Text onPress={this.borrarStorageCompleto}>Borrar Storage</Text> */}
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
      
      hamburguerButton:{
        width: 40,
        height: 40,
        backgroundColor: 'gray',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        left: 10,
        borderColor: 'black',
        borderWidth: 2
      },
      burgerText:{
        textAlignVertical: 'center',
        fontSize: 20,
        color: 'black'
      }
    })
    

export default Papelera