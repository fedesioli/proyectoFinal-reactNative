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


renderItem = ({item}) => {
    return(
          // <TouchableOpacity onPress={() => this.abrirModal(item)}>
            <TarjetaImportada style={styles.tarjeta} datosPersona={item} borrarTarjeta={this.borrarTarjeta}/>
          // </TouchableOpacity>
    )
}
    
async getDataImportados(){
    try{
          const resultado = await AsyncStorage.getItem('Favoritos');
          this.setState({personasFavoritas: JSON.parse(resultado), personasFavoritasBackup: JSON.parse(resultado)});
          return resultado;   
    }catch(e){
          console.log(e)
    }
}

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


async updateFavoritos(resultado){
  try{
   
    const jsonUsers = JSON.stringify(resultado);
    await AsyncStorage.setItem('Favoritos', jsonUsers)
  }catch(e){
    console.log(e)
  }
}

// async cargarPapelera(){
//   try{
//     this.traerPapelera();
//     const papelera = this.state.tarjetasEnPapeleraPrevias.push(this.state.eliminadas)
//     const jsonUsers = JSON.stringify(papelera);
//     await AsyncStorage.setItem('Papelera', jsonUsers)
//     console.log(jsonUsers + 'asda')
//   }catch(e){
//     console.log(e)
//   }
// }

borrarStorageCompleto = ()=> {
  this.storeFavoritosVacio();
  this.setState({personasFavoritas: []})
  
}

borrarTarjeta = (tarjeta) =>{
  
  // console.log(tarjeta.login.uuid)
  let resultado = this.state.personasFavoritas.filter( (item)=> {
    
    return item.login.uuid !== tarjeta.login.uuid;
})
this.updateFavoritos(resultado);
this.setState({personasFavoritas: resultado, eliminadas: tarjeta });
// this.cargarPapelera();
console.log(this.state.personasFavoritas.length)
}

// async traerPapelera(){
//   try{
//         const resultado = await AsyncStorage.getItem('Papelera');
//         this.setState({tarjetasEnPapeleraPrevias: JSON.parse(resultado)});
//         return resultado;   
//   }catch(e){
//         console.log(e)
//   }
// }


   
buscador(loBuscado) {

  if(loBuscado.length !== 0) {
    const resultadoBusqueda = this.state.personasFavoritas.filter(item => {
      const itemName = item.name.first.toUpperCase(); 
      const itemLastName = item.name.last.toUpperCase();
      const itemAge = item.dob.age.toString()
      const loBuscadoUpper = loBuscado.toUpperCase();
      return itemName.includes(loBuscadoUpper) || itemLastName.includes(loBuscadoUpper) || itemAge.includes(loBuscadoUpper)

    });
      this.setState({
        personasFavoritas : resultadoBusqueda,
        loBuscado: '',
      })

  }
  else{
    this.setState({
      personasFavoritas: this.state.personasFavoritasBackup
    })
   
  }
}

render(){

    

    return (
        <SafeAreaView>
            <View style={styles.tarjetasContainer}>

            <Text>Tarjetas importadas</Text>
            <TextInput  placeholder="Encontra tu tarjeta" style={this.inputSearch}  onChangeText={(loBuscado) => this.buscador(loBuscado) }  /> 

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
        margin:40,
        justifyContent: 'center',
        alignItems: "center",
        backgroundColor: "white",
        width:150,
        height:50,

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