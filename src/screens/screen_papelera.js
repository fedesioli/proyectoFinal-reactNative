import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Touchable, FlatList, SafeAreaView, Modal } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import  Component from 'react-native';
import TarjetaPapelera from '../components/tarjetas_papelera'
import {getData} from '../api/randomUser'
import {getDataAsync, storeDataAsync} from '../components/funciones_async'

class Papelera extends React.Component {
    constructor(){
        super();
        this.state = {
            tarjetasEnPapelera: [],
            seleccionados: []
    
        }
    }
    componentDidMount(){
      this.unsubscribe = this.props.navigation.addListener('focus', ()=>{
        
        this.traerPapelera()
       
        
      });
    }
    componentWillUnmount(){
      this.unsubscribe();
    }
    
    keyExtractor = (item, idx) => item.login.uuid.toString();
    
    
    renderItem = ({item}) => {
        return(
              // <TouchableOpacity onPress={() => this.abrirModal(item)}>
                <TarjetaPapelera style={styles.tarjeta} datosPersona={item} agregarASeleccionados={this.agregarASeleccionados} deseleccionar={this.deseleccionar}/>
              // </TouchableOpacity>
        )
    }
      
    async traerPapelera(){
        try{
              const resultado = await getDataAsync('Papelera');
              this.setState({tarjetasEnPapelera: resultado});
              return resultado;   
        }catch(e){
              console.log(e)
        }
      }

    async limpiarPapelera(){
        storeDataAsync([],'Papelera')
        this.setState({tarjetasEnPapelera:[]})
      }

      async restaurarBorradas(){
        try{ 
          // restauro las tarjetas
          const favoritas = await getDataAsync('Favoritas')
          const tarjetasRestaurar = [...favoritas, ...this.state.seleccionados]
          storeDataAsync(tarjetasRestaurar, 'Favoritos')
          // borro las restauradas de la papelera, cambio el estado y el async.
          this.sacarRestaurados(this.state.seleccionados, this.state.tarjetasEnPapelera)


        } catch(e){}
      }

      sacarRestaurados(seleccionados, personas){
        const myArrayFiltered = personas.filter(item => !seleccionados.includes(item))
        storeDataAsync(myArrayFiltered,'Papelera')
        this.setState({tarjetasEnPapelera: myArrayFiltered})
      }



      agregarASeleccionados = (item) => {
        let seleccionados2 = this.state.seleccionados.concat(item)
        this.setState({seleccionados:seleccionados2})
      }
      deseleccionar = (idTarjeta) => {
        let resultado = this.state.seleccionados.filter( (item)=> {
        
          return item.login.uuid !== idTarjeta;
          
      })
        this.setState({seleccionados: resultado})
        
      }


      
render(){

    return (
        <SafeAreaView>
        <View style={styles.tarjetasContainer}>

        <Text>Papelera de reciclaje</Text>

        <FlatList
      data={this.state.tarjetasEnPapelera}
      renderItem={this.renderItem}
      keyExtractor={this.keyExtractor}
    />
      <Text onPress={()=> this.limpiarPapelera()}>Limpiar Papelera</Text>
      <Text onPress={()=> this.restaurarBorradas()}>Restaurar tarjetas seleccionadas</Text>
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