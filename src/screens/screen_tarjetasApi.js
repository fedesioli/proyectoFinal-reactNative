import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Touchable, FlatList, SafeAreaView, Modal, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import  Component from 'react-native';
import Tarjeta from '../components/tarjetas'
import {getDataAPI, cargarNuevasTarjetas} from '../api/randomUser'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import {getDataAsync, storeDataAsync} from '../components/funciones_async'




 class TarjetasApi extends React.Component {


  constructor(){
    super();
    this.state = {
      personas: [],
      seleccionados: [],
      showModal: false,
      itemModal: null,
      tarjetasImportadas: [],
      favoritosCompleto:[],
      verMas: ''
    }
}

  // Aca cargamos data de la api
  componentDidMount(){
    this.unsubscribe = this.props.navigation.addListener('focus', ()=>{
      
      getDataAPI()
    .then(results => {
      // console.log(results);
      this.setState({personas: results});
    })
      
    });
  }
  componentWillUnmount(){
    this.unsubscribe();
  }
 
  keyExtractor = (item, idx) => item.login.uuid.toString();

  // Aca definimos el compenente que se imprime en el flatlist con los datos de cada tarjeta como parametro
  renderItem = ({item}) => {
    return(
      
        <Tarjeta style={styles.tarjeta} datosPersona={item} agregarASeleccionados={this.agregarASeleccionados} deseleccionar={this.deseleccionar}/>
      
    )
  }

  // Aca importamos las tarjetas seleccionadas
  async storeFavoritos(){
    try{
      // Primero traemos del storage las que ya estaban iomportadas y hacemos un nuevo array junto con las seleccionadas
      const favoritosImportados = await getDataAsync('Favoritos')
      const favoritos = [...favoritosImportados, ...this.state.seleccionados]
      // Guardamos en el storage con la key favoritos
      storeDataAsync(favoritos, 'Favoritos')
      // Alert para saber cuantas personas se importaron
      const seleccionadosLength = "Se importaron las " + this.state.seleccionados.length + " tarjetas seleccionadas" 
      if(this.state.seleccionados.length != 0){
        this.sacarImportados(this.state.seleccionados, this.state.personas)
        Alert.alert(seleccionadosLength)
      }else{
        Alert.alert('No se selecciono ninguna tarjeta')
      }
      // Vaciamos seleccionados una vez importadas las tarjetas
      this.setState({seleccionados: []})
    }catch(e){
      console.log(e)
    }
  }

// Aca agregamos las tarjetas a seleccionados en el estado
  agregarASeleccionados = (item) => {
    // Primero juntamos los seleccionados que ya estaban en el estado con el nuevo item a seleccionar
    let todosLosSeleccionados = this.state.seleccionados.concat(item)
    // Actualizamos el estado con todos 
    this.setState({seleccionados: todosLosSeleccionados})
    // console.log(this.state.seleccionados.length)
  }
// Aca sacamos de seleccionados a la tarjeta que querramos deseleccionar
  deseleccionar = (idTarjeta) => {
    // Primero filtramos los seleccionados para retornar los que tienen id distinto
    let resultado = this.state.seleccionados.filter( (item)=> {
    
      return item.login.uuid !== idTarjeta;
      
  })
  // Actualizamos el estado filtrado
    this.setState({seleccionados: resultado})
    // console.log(this.state.seleccionados.length)
  }

  // Aca sacamos las tarjetas recien seleccionadas de la pantalla de la api para no importarlas dos veces
  sacarImportados(seleccionados, personas){
    const myArrayFiltered = personas.filter(item => !seleccionados.includes(item))
    this.setState({personas: myArrayFiltered})
  }


  cargarNuevasTarjetas = async () => {
    try{
      cargarNuevasTarjetas(this.state.verMas)
      .then(tarjetas => {
        this.setState({personas: [...this.state.personas, ... tarjetas]})
      })  
      Alert.alert('Se agregaron ' + this.state.verMas + ' tarjetas de la api')
    
    }catch(e){}
  }
  
  render(){
    
    return (
      <SafeAreaView  style = {styles.homePadre} >
        <View style={styles.tarjetasContainer}>
       <Text style={styles.titulo}>Importa tus tarjetas favoritas</Text>

        <FlatList style={styles.FlatList}
          data={this.state.personas}
          renderItem={this.renderItem}
          keyExtractor={this.keyExtractor}
        />
        <TextInput style={styles.inputSearch} placeholder="Cuantas tarjetas desea agregar?" onChangeText={text => this.setState({verMas: text})}></TextInput>
        <Text style={styles.importar} onPress= {this.cargarNuevasTarjetas.bind(this)}>Agregar tajetas</Text>
        <Text style={styles.importar} onPress= {this.storeFavoritos.bind(this)}>Importar</Text>
          <View style={styles.hamburguerButton}>
        <TouchableOpacity onPress={()=> this.props.navigation.toggleDrawer()}>
              <Text  style={styles.burgerText}>=</Text>         
       </TouchableOpacity>           
          </View>
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
        
      },
      inputSearch: {
        margin:10,
        justifyContent: 'center',
        alignItems: "center",
        backgroundColor: "white",
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 3,
        width:150,
        height:35,

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
      FlatList:{
        paddingTop: "10%",
        height: "80%"
      },
      titulo:{
        fontSize: 20,
        marginTop:10
      },
      importar:{
        fontSize: 20,
        marginBottom:'5%'
      }
    })
    export default TarjetasApi;