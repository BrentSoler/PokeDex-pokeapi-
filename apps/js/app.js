const main = document.querySelector(".mainSec");
const template = document.querySelector(".template")
const cred = document.getElementsByClassName("credentials");
const searchBar = document.querySelector('#searchbar');

const colors = {
	fire: '#FDDFDF',
	grass: '#DEFDE0',
	electric: '#FCF7DE',
	water: '#DEF3FD',
	ground: '#f4e7da',
	rock: '#d5d5d4',
	fairy: '#fceaff',
	poison: '#98d7a5',
	bug: '#f8d5a3',
	dragon: '#97b3e6',
	psychic: '#eaeda1',
	flying: '#F5F5F5',
	fighting: '#E6E0D4',
	normal: '#F5F5F5'
};
const limit = "500";
let search

loadAll();

async function loadAll(){
    let poke = await fetch("https://pokeapi.co/api/v2/pokemon?limit="+limit)
    let pokemon = await poke.json();

    loadPoke(pokemon.results)
}


function loadPoke(data){
    main.innerHTML="";

    let display = data.map(function(pokemon){
        return pokemon.url
    })
    
    let i;
    let index = 0;

    for ( i = 0 ; i <= display.length; i++){
        fetch (display[i])
        .then(res=>res.json())
        .then(json=>{
            let pokeArray = Object.values(json);
            let pokeName = pokeArray[10];
            let pokeIMG = pokeArray[14].front_default;
            let pokeType = pokeArray[16][0].type.name

            const showPoke = document.importNode(template.content,true);

            const postName = showPoke.querySelector(".name");
            const postImg = showPoke.querySelector(".pokeimg");
            const postType = showPoke.querySelector(".type");

            postName.innerText = pokeName.toUpperCase();
            postType.innerText = `TYPE:${pokeType.toUpperCase()}`;
            postImg.src = pokeIMG;
        
            main.appendChild(showPoke);
            cred[index].setAttribute("data-pokemonid",pokeName);
            cred[index].style.backgroundColor = colors[pokeType];
            index = index + 1;
        })
    }
}


function searchFor(){
    search = searchBar.value;

    fetch("https://pokeapi.co/api/v2/pokemon?limit="+limit)
        .then (res => res.json())
        .then (json =>{
            const filterOut = json.results.filter(function(pokemon){
                return (pokemon.name.includes(search)) ? pokemon : (search === "") ? pokemon : null
            })
            loadPoke(filterOut)
        })

}

searchBar.addEventListener('keyup',function(){
    (event.keyCode === 13) ? searchFor() : null;
})

function clickonPoke(){
    console.log("hi")
}