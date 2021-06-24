import AsyncStorage from '@react-native-async-storage/async-storage';


export const storeDataAsync = async (value , key) => {
    
    try{
        const jsonUsers = JSON.stringify(value);
        await AsyncStorage.setItem(key,jsonUsers)
    } catch (e){
        console.log(e)
    }
}

export const getDataAsync = async (key) => {
    
    try{
        const jsonUsers = await AsyncStorage.getItem(key)
        const usuariosFavoritos = JSON.parse(jsonUsers)
        return jsonUsers != null ? usuariosFavoritos : []
        
    } catch (e){
        console.log(e)
    }
}