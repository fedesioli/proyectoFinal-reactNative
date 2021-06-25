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
    Animated,
    TouchableWithoutFeedback
         } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import  Component from 'react-native';
import TarjetaImportada from '../components/tarjetas_importadas'
import AboutFini from '../components/aboutFini';
import AboutFran from '../components/aboutFran';
import AboutFede from '../components/aboutFede';
import {getData} from '../api/randomUser'
import {getDataAsync, storeDataAsync} from '../components/funciones_async'

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack'; 
import {createDrawerNavigator} from '@react-navigation/drawer'; 
import TarjetaModificar from '../components/tarjeta_modificar';


class AboutUs extends React.Component {
    constructor(){
        super();
        this.state = {
         personasFavoritas: [],
         toValue: 1,
        }
    }

   rotation = new Animated.Value(0);

   verTarjetas = () => {

     Animated.sequence([
       Animated.timing(this.rotation, {
           toValue: this.state.toValue,
           duration: 1500,
           useNativeDriver: false
       })
   ]).start()
   this.setState({toValue: this.state.toValue + 1})
   }

render(){

    const rotA = this.rotation.interpolate({
        inputRange: [0,1],
        outputRange: ['0deg', '180deg']
    })
    const rotB = this.rotation.interpolate({
      inputRange: [0,1],
      outputRange: ['180deg', '0deg']
  })

    return (
        <SafeAreaView >
          <Text style={{textAlign: 'center', fontSize: 20, marginTop: '4%'}}>Conoce a nuestros desarrolladores</Text>
        <View style={styles.tarjetasContainer}>
        

          <AboutFini/>
          <AboutFran/>
          <AboutFede/>

     
        
         
        
        </View>
            <View style={styles.hamburguerButton}>
                <TouchableOpacity onPress={()=> this.props.navigation.toggleDrawer()}>
                <Text  style={styles.burgerText}>=</Text>         
                </TouchableOpacity>           
            </View>
        </SafeAreaView>

    )
}
}

const styles = StyleSheet.create({
    
      tarjetasContainer: {
        marginTop: '15%',
        marginLeft: '43%',
        width: '100%',
        flex:1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
      },
      
      hamburguerButton:{
        width: 40,
        height: 40,
        backgroundColor: 'gray',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: 50,
        left: 10,
        borderColor: 'black',
        borderWidth: 2
      },
      burgerText:{
        textAlignVertical: 'center',
        fontSize: 20,
        color: 'black'
      },
     
      titulo: {
        fontSize:20,
      },
      tarjetasContainerAbout:{
        flex: 1,
        justifyContent: 'space-around',
        flexDirection: 'row',
        width: '80%',
        marginTop: 100,
        padding: '5%'
      }
    })
    

export default AboutUs