export async function getDataAPI(){
   try{
       let resultado = await fetch('https://randomuser.me/api?results=20');
       let json = await resultado.json();
    //    console.log(json);
       return json.results;
   }catch(e){
       console.log(e)
   }
}
