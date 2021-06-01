export function getData(){
    fetch("https://randomuser.me/api/?results=20")
            .then(response => response.json())
            .then(data => { 
                return data.results         
                
            })
}