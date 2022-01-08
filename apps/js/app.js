const main = document.querySelector(".mainSec");
const template = document.querySelector(".template")

loadAll();

async function loadAll(){
    let poke = await fetch("https://pokeapi.co/api/v2/pokemon?limit=100")
    let pokemon = await poke.json();

    loadPoke(pokemon)
}


function loadPoke(data){
    let display = data.results.map(function(pokemon){
        return pokemon.url
    })
    
    let i;
    
    for ( i = 0 ; i <= display.length; i++){
        fetch (display[i])
        .then(res=>res.json())
        .then(json=>{
            let pokeArray = Object.values(json);
            let pokeName = [];
            let pokeIMG = [];
            pokeName[i] = pokeArray[10]
            pokeIMG[i] = pokeArray[14].front_default
            
            const showPoke = document.importNode(template.content,true);

            const postName = showPoke.querySelector(".name");
            const postImg = showPoke.querySelector(".pokeimg");
            const data = showPoke.querySelector('.credentials');


            data.setAttribute('data-pokemon-id',i)
            console.log(pokeIMG[i])
            postName.innerText = pokeName[i].toUpperCase();
            postImg.src = pokeIMG[i];
            
            main.appendChild(showPoke);
            })
        }
}
