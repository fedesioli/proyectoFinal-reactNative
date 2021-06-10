import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Touchable, FlatList, SafeAreaView, Modal } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import  Component from 'react-native';
import Tarjeta from '../components/tarjetas'
import {getData} from '../api/randomUser'

class Home extends React.Component {
    constructor(){
        super();
        this.state = {
         personas: []
    
        }
    }

render(){

    return (
        <SafeAreaView>
            <View>
                <Text onPress={()=> this.props.navigation.navigate("tarjetasApi")}>Ir a tarjetas de la API</Text>
                <Text onPress={()=> this.props.navigation.navigate("modificar")}>Ir a modificar</Text>
                <Text onPress={()=> this.props.navigation.navigate("importadas")}>Ir a importadas</Text>
                <Text onPress={()=> this.props.navigation.navigate("papelera")}>Ir a papelera</Text>

            </View>

        </SafeAreaView>

    )
}
}

export default Home