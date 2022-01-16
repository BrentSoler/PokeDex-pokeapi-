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
const limit = "100";
let offset = 0;
let search
let results = []


/**
 * LOAD
 */
loadAll();
async function loadAll() {
    let poke = await fetch("https://pokeapi.co/api/v2/pokemon?limit=" + limit)
    let pokemon = await poke.json();

    let display = pokemon.results.map(function (pokemon) {
        return pokemon.url
    })

    let i;
    let index = 0;

    for (i = 0; i <= display.length; i++) {
        fetch(display[i])
            .then(res => res.json())
            .then(json => {
                let pokeArray = Object.values(json);
                results.push(pokeArray);

            })
    }
    // loadPoke(results)
    console.log(results)
}

function loadPoke(data) {
    main.innerHTML = "";

    let display = data.map(function (pokemon) {
        return pokemon.url
    })

    let i;
    let index = 0;

    for (i = 0; i <= display.length; i++) {
        fetch(display[i])
            .then(res => res.json())
            .then(json => {
                let pokeArray = Object.values(json);
                let pokeName = pokeArray[10];
                let pokeIMG = pokeArray[14].front_default;
                let pokeType = pokeArray[16][0].type.name

                const showPoke = document.importNode(template.content, true);

                const postName = showPoke.querySelector(".name");
                const postImg = showPoke.querySelector(".pokeimg");
                const postType = showPoke.querySelector(".type");

                postName.innerText = pokeName.toUpperCase();
                postType.innerText = `TYPE:${pokeType.toUpperCase()}`;
                postImg.src = pokeIMG;

                main.appendChild(showPoke);
                cred[index].setAttribute("data-pokemonid", pokeName);
                cred[index].style.backgroundColor = colors[pokeType];
                index = index + 1;
                if (index === display.length) {
                    onclick();
                }
            })
    }
}

/**
 * SEARCH
 */
function searchFor() {
    search = searchBar.value;

    const filterOut = results.filter(function (pokemon) {
        return (pokemon.name.includes(search)) ? pokemon : (search === "") ? pokemon : null
    })
    loadPoke(filterOut)


}

searchBar.addEventListener('keyup', function (e) {
    searchFor();
})

/**
 * On Click
 */
let xButt;


function onclick() {
    for (let i = 0; i < cred.length; i++) {
        cred[i].addEventListener("click", () => {
            let pokemonName = cred[i].getAttribute("data-pokemonid");

            showPokemon(pokemonName);
        })
    }
}

function showPokemon(x) {
    const pokeContain = document.querySelector('.pokeContainer');
    const pokeName = document.querySelector('.pokeName');
    const pokeImg = document.querySelector('.pokeimg');
    const hpProg = document.querySelector('.hpProg');
    const atkProg = document.querySelector('.atkProg');
    const dfnProg = document.querySelector('.dfnProg');
    const satkProg = document.querySelector('.satkProg');
    const sdfnProg = document.querySelector('.sdfnProg');
    const spdProg = document.querySelector('.spdProg');
    const hpstat = document.querySelector('.hpstat');
    const atkstat = document.querySelector('.atkstat');
    const dfnstat = document.querySelector('.dfnstat');
    const satkstat = document.querySelector('.satkstat');
    const sdfnstat = document.querySelector('.sdfnstat');
    const spdstat = document.querySelector('.spdstat');

    const w = document.querySelector('.weight');
    const h = document.querySelector('.height');

    fetch(`https://pokeapi.co/api/v2/pokemon/${x}`)
        .then(res => res.json())
        .then(json => {
            let pokeArray = Object.values(json);
            let name = pokeArray[10].toUpperCase();
            let image = pokeArray[14].front_default;
            let height = pokeArray[4];
            let weight = pokeArray[17];
            let hp = pokeArray[15][0].base_stat;
            let atk = pokeArray[15][1].base_stat;
            let dfn = pokeArray[15][2].base_stat;
            let satk = pokeArray[15][3].base_stat;
            let sdfn = pokeArray[15][4].base_stat;
            let spd = pokeArray[15][5].base_stat;

            console.log(pokeArray)

            pokeName.innerText = name;
            hpstat.innerText = hp;
            atkstat.innerText = atk;
            dfnstat.innerText = dfn;
            satkstat.innerText = satk;
            sdfnstat.innerText = sdfn;
            spdstat.innerText = spd;
            w.innerText = `Weight:${weight}`;
            h.innerText = `Height:${height}`;

            hpProg.value = hp;
            atkProg.value = atk;
            dfnProg.value = dfn;
            satkProg.value = satk;
            sdfnProg.value = sdfn;
            spdProg.value = spd;

            pokeImg.src = image;
            pokeContain.setAttribute('data-isVisible', true);

        })
}

window.addEventListener("click", (e) => {
    const pokeContain = document.querySelector('.pokeContainer');
    let attri = pokeContain.getAttribute('data-isVisible');
    (e.target != pokeContain && attri != "false") ? pokeContain.setAttribute('data-isVisible', false) : null;
    console.log(results)
})


function closeConatin() {
    const pokeContain = document.querySelector('.pokeContainer');
    pokeContain.setAttribute('data-isVisible', false);
}
