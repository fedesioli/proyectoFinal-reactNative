import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Touchable, FlatList, SafeAreaView, Modal } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import  Component from 'react-native';
import Tarjeta from '../components/tarjetas'
import {getData} from '../api/randomUser'

class Modificar extends React.Component {
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
            <Text>Screen modificar</Text>

            </View>

        </SafeAreaView>

    )
}
}

export default Modificar