import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Touchable, FlatList, SafeAreaView, Modal, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import  Component from 'react-native';
import Tarjeta from '../components/tarjetas'
import {getDataAPI} from '../api/randomUser'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'




 class TarjetasApi extends React.Component {
  constructor(){
    super();
    this.state = {
      personas: [],
      seleccionados: [],
      showModal: false,
      itemModal: null,
      tarjetasImportadas: [],
      favoritosCompleto:[]

    }
}
  componentDidMount(){
    getDataAPI()
    .then(results => {
      // console.log(results);
      this.setState({personas: results});
    })
  }

  keyExtractor = (item, idx) => item.login.uuid.toString();

  renderItem = ({item}) => {
    return(
      // <TouchableOpacity onPress={() => this.abrirModal(item)}>
        <Tarjeta style={styles.tarjeta} datosPersona={item} agregarASeleccionados={this.agregarASeleccionados} deseleccionar={this.deseleccionar}/>
      // </TouchableOpacity>
    )
  }

  async storeFavoritos(){
    try{
      this.Importados(); 
      // console.log(this.state.tarjetasImportadas.length)
      // console.log(this.state.seleccionados.length)
      const favoritos = [...this.state.tarjetasImportadas, ... this.state.seleccionados]
      // console.log(favoritos.length)
      const seleccionadosLength = "Se importaron las "+this.state.seleccionados.length+ " tarjetas seleccionadas" 
      const jsonUsers = JSON.stringify(favoritos);
      await AsyncStorage.setItem('Favoritos', jsonUsers)
      if(this.state.seleccionados.length != 0){
        this.sacarImportados(this.state.seleccionados, this.state.personas)
        Alert.alert(seleccionadosLength)
      }else{
        Alert.alert('No se selecciono ninguna tarjeta')
      }
      this.setState({seleccionados: []})
    }catch(e){
      console.log(e)
    }
  }
  async Importados(){
    try{
          const resultado = await AsyncStorage.getItem('Favoritos');
          this.setState({tarjetasImportadas: JSON.parse(resultado)});
          return resultado;   
    }catch(e){
          console.log(e)
    }
}

  abrirModal(item){
    this.setState({showModal: true, itemModal: item})
    console.log(item)
    console.log(this.state.itemModal)
  }

  agregarASeleccionados = (item) => {
    let seleccionados2 = this.state.seleccionados.concat(item)
    this.setState({seleccionados:seleccionados2})
    // console.log(this.state.seleccionados.length)
    
  }

  deseleccionar = (idTarjeta) => {
    let resultado = this.state.seleccionados.filter( (item)=> {
    
      return item.login.uuid !== idTarjeta;
      
  })
    this.setState({seleccionados: resultado})
    // console.log(this.state.seleccionados.length)
  }

  sacarImportados(seleccionados, personas){
    const myArrayFiltered = personas.filter(item => !seleccionados.includes(item))
    this.setState({personas: myArrayFiltered})
  }
  
  render(){
    
    return (
      <SafeAreaView  style = {styles.homePadre} >
       
        {/* Body */}
        <View style={styles.tarjetasContainer}>

        


        <FlatList
          data={this.state.personas}
          renderItem={this.renderItem}
          keyExtractor={this.keyExtractor}
        />
        <Text style={{fontSize: 30}} onPress= {this.storeFavoritos.bind(this)}>Importar</Text>
        <Modal
          visible= {this.state.showModal}
          transparent= {false}
          animationType= 'slide'
          >
              <View  style={styles.modalPadre}>
                <View  style={styles.modalHijo}>
                 <Text>{
                  this.state.itemModal &&
                  this.state.itemModal.name.first
                  }</Text>    
                 <Text style={styles.closeModal} onPress={() => this.setState({showModal: false})}>X</Text> 
                </View>
              </View>
         </Modal>
        
        </View>
      </SafeAreaView>
     
    );
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
      modalPadre:{
       
        backgroundColor: 'rgba(0,0,0,0.1)',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
      },
      modalHijo: {
        height: 100,
        width:200,  
        backgroundColor: 'grey',
        alignItems: 'center',
        justifyContent: 'center',
      },
      closeModal:{
        position: 'absolute',
        top: 10,
        right: 10,
      }
    })
    export default TarjetasApi;