import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet,
   Text,
    View,
    TextInput,
    TouchableOpacity,
    Touchable,
    FlatList,
    SafeAreaView,
    Modal,
    Animated
         } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import  Component from 'react-native';
import TarjetaImportada from '../components/tarjetas_importadas'
import {getData} from '../api/randomUser'
import {getDataAsync, storeDataAsync} from '../components/funciones_async'

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack'; 
import {createDrawerNavigator} from '@react-navigation/drawer'; 


class Importadas extends React.Component {
    constructor(){
        super();
        this.state = {
         personasFavoritas: [],
         eliminadas:'',
         tarjetasEnPapeleraPrevias: [],
         personasFavoritasBackup: [],
         loBuscado: '',
        }
    }

    componentDidMount(){
      this.unsubscribe = this.props.navigation.addListener('focus', ()=>{
        
        this.getDataImportados()
        
      });
    }
    componentWillUnmount(){
      this.unsubscribe();
    }
keyExtractor = (item, idx) => item.login.uuid.toString();

// Aca definimos el compenente que se imprime en el flatlist con los datos de cada tarjeta como parametro
renderItem = ({item}) => {
    return(
         
            <TarjetaImportada style={styles.tarjeta} datosPersona={item} borrarTarjeta={this.borrarTarjeta}/>
          
    )
}

// Aca traemos las tarjetas del async
async getDataImportados(){
    try{
      // Buscamos con getItem seguna la key "favoritos"
          const resultado = await AsyncStorage.getItem('Favoritos');
          this.setState({personasFavoritas: JSON.parse(resultado), personasFavoritasBackup: JSON.parse(resultado)});
          return resultado;   
    }catch(e){
          console.log(e)
    }
}

// Aca vaciamos el storage completo
async storeFavoritosVacio(){
  try{
    const favoritos = []
    console.log(favoritos.length)
    const jsonUsers = JSON.stringify(favoritos);
    await AsyncStorage.setItem('Favoritos', jsonUsers)
  }catch(e){
    console.log(e)
  }
}

// Aca hacemos un update de los favoritos
// async updateFavoritos(resultado){
//   try{
   
//     const jsonUsers = JSON.stringify(resultado);
//     await AsyncStorage.setItem('Favoritos', jsonUsers)
//   }catch(e){
//     console.log(e)
//   }
// }


// Aca vaciamos el storage completo
borrarStorageCompleto = ()=> {
  // Primero limpiamos el asyn storage
  this.storeFavoritosVacio();
  // Actualizamos el estado
  this.setState({personasFavoritas: []})
  
}

// Aca borramos cada tarjeta
borrarTarjeta = async (tarjeta) => {
  try{
    //agarro la papelera
  const actualPapelera = await getDataAsync('Papelera')
    //armo array sin el elegido
  let resultado = this.state.personasFavoritas.filter( (item)=> {
    
    return item.login.uuid !== tarjeta.login.uuid;
})
 // guardo nueva info en async favoritos
storeDataAsync(resultado, 'Favoritos')
  // busco array individual de la borrada
let borrada = this.state.personasFavoritas.filter( (item)=> {
    
  return item.login.uuid === tarjeta.login.uuid;
})
  // concateno y guardo la nueva papelera
let papelera = [...actualPapelera, ...borrada]
storeDataAsync(papelera,'Papelera')

  // Actualizamos estado
this.setState({personasFavoritas: resultado});

} catch(e) {
  }}

// async traerPapelera(){
//   try{
//         const resultadoPapelera = await AsyncStorage.getItem('Papelera');
//         this.setState({tarjetasEnPapeleraPrevias: JSON.parse(resultadoPapelera)});
//         return resultadoPapelera;   
//   }catch(e){
//         console.log(e)
//   }
// }


// Aca filtramos las tarjetas para el buscador
buscador(loBuscado) {

  // Hacemos un if para saber que haya algo en el text input
  if(loBuscado.length !== 0) {
    // Si hay algo en el input hacemos el filter
    const resultadoBusqueda = this.state.personasFavoritas.filter(item => {
      // Ponemos todo en uppercase para que no hayan errores
      const itemName = item.name.first.toUpperCase(); 
      const itemLastName = item.name.last.toUpperCase();
      const itemAge = item.dob.age.toString()
      const loBuscadoUpper = loBuscado.toUpperCase();
      // Filtramos segun nombre o apellido o edad
      return itemName.includes(loBuscadoUpper) || itemLastName.includes(loBuscadoUpper) || itemAge.includes(loBuscadoUpper)

    });
    // Actualizamos el estado con los resultados
      this.setState({
        personasFavoritas : resultadoBusqueda,
        loBuscado: '',
      })

  }
  else{
    // Si el input esta vacio se restaura a la vista original
    this.setState({
      personasFavoritas: this.state.personasFavoritasBackup
    })
   
  }
}

render(){

    

    return (
        <SafeAreaView>
            <View style={styles.tarjetasContainer}>

            <Text style={styles.titulo}>Tarjetas importadas</Text>
            <TextInput  placeholder="Encontra tu tarjeta" style={styles.inputSearch}  onChangeText={(loBuscado) => this.buscador(loBuscado) }  /> 

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
          <Text onPress={this.borrarStorageCompleto}>Borrar Storage</Text>
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
      titulo: {
        fontSize:20,
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
    

export default Importadas