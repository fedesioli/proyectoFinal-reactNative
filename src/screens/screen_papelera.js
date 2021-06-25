import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Touchable, FlatList, SafeAreaView, Modal,Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import  Component from 'react-native';
import TarjetaPapelera from '../components/tarjetas_papelera'
import {getData} from '../api/randomUser'
import {getDataAsync, storeDataAsync} from '../components/funciones_async'
import { abs } from 'react-native-reanimated';

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
             
                <TarjetaPapelera style={styles.tarjeta} datosPersona={item} agregarASeleccionados={this.agregarASeleccionados} deseleccionar={this.deseleccionar}/>
              
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
        Alert.alert('Se eliminaron todos los datos de la papelera')
      }

      async restaurarBorradas(){
        try{ 
          // restauro las tarjetas
          const favoritas = await getDataAsync('Favoritas')
          const tarjetasRestaurar = [...favoritas, ...this.state.seleccionados]
          storeDataAsync(tarjetasRestaurar, 'Favoritos')
          // borro las restauradas de la papelera, cambio el estado y el async.
          this.sacarRestaurados(this.state.seleccionados, this.state.tarjetasEnPapelera)
          Alert.alert('Se restauraron las tarjetas seleccionadas')
        } catch(e){}
      }

      sacarRestaurados(seleccionados, personas){
        const myArrayFiltered = personas.filter(item => !seleccionados.includes(item))
        storeDataAsync(myArrayFiltered,'Papelera')
        this.setState({tarjetasEnPapelera: myArrayFiltered})
        Alert.alert('Se borraron definitivamente las tarjetas seleccionadas')
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

        <Text style={styles.titulo}>Papelera de reciclaje</Text>

        <FlatList style={styles.FlatList}
      data={this.state.tarjetasEnPapelera}
      renderItem={this.renderItem}
      keyExtractor={this.keyExtractor}
    />

    <View style={styles.botonesAbajo}>
      <Text  style={styles.botonAbajo} onPress={()=> this.restaurarBorradas()}>Restaurar seleccion</Text>
      <Text style={styles.botonAbajo} onPress={()=> this.sacarRestaurados(this.state.seleccionados, this.state.tarjetasEnPapelera)}>Borrar seleccion</Text>
      <Text style={styles.botonAbajo} onPress={()=> this.limpiarPapelera()}>Limpiar Papelera</Text>
    </View>

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
      
      },
      FlatList:{
        height: "92%"
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
      },
      titulo:{
        fontSize: 20,
      },
      botonesAbajo:{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignContent: 'space-around'
       
       
      },
      botonAbajo:{
        width: '30%',
        borderColor: 'black',
        borderWidth: 2,
        borderRadius: 2,
        fontSize: 11,
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        height: 30, 
        paddingTop: '2%',
        margin: '1%',
        padding: '2%'
      }
    })
    

export default Papelera