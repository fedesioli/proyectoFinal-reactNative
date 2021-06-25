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
        }
    }

   rotation = new Animated.Value(0);

   verTarjetas = () =>
     Animated.sequence([
       Animated.timing(this.rotation, {
           toValue: 1,
           duration: 1500,
           useNativeDriver: true
       })
   ]).start()

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
        <SafeAreaView>
        <View style={styles.tarjetasContainer}>

        <TouchableWithoutFeedback onPress={this.verTarjetas}>
        <View >
            <Animated.View style={{
              width: 60,
              height: 100,
              backgroundColor: 'red',
              backfaceVisibility: 'false',
              borderRadius: 10,
              transform: [
                {rotateX: rotA}
              ]
            }}>

            </Animated.View>
            {/* <Animated.View style={{
              width: 60,
              height: 100,
              backgroundColor: 'gray',
              borderRadius: 10,
              backfaceVisibility: 'false',
              position: 'absolute',
              transform: [
                {rotateX: rotB}
              ]
            }}>

            </Animated.View> */}
              </View>
        </TouchableWithoutFeedback>          
        
        
        
        
            <View style={styles.hamburguerButton}>
                <TouchableOpacity onPress={()=> this.props.navigation.toggleDrawer()}>
                <Text  style={styles.burgerText}>=</Text>         
                </TouchableOpacity>           
            </View>
         
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
    })
    

export default AboutUs