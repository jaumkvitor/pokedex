const button = document.getElementById("button-pokedex");
const conteudoOculto = document.getElementById("conteudo-oculto");
const pokehide = document.getElementById("pokedex__full");

button.addEventListener("click", function () {
    if (conteudoOculto.style.display === "none" || conteudoOculto.style.display === "") {
        conteudoOculto.style.display = "block";
        button.style.top = "400px"; 
        button.style.left = "400px"; 
        pokehide.style.display = "none";
    } else {
        conteudoOculto.style.display = "none";
        button.style.top = "400px"; 
        button.style.left = "900px"; 
        pokehide.style.display = "block";
    }
});

const pokemonName = document.querySelector('.pokemon__name');
const pokemonNumber = document.querySelector('.pokemon__number');
const pokemonImage = document.querySelector('.pokemon__image');
const pokemonTypeone = document.querySelector('.pokemon__typeone');
const pokemonTypetwo = document.querySelector('.pokemon__typetwo');
const typeToImage = {
    normal:"/pokeicon/typenormal.png",
    fire:"/pokeicon/typefire.png",
    water:"/pokeicon/typewater.png",
    ground:"/pokeicon/typeground.png",
    rock:"/pokeicon/typerock.png",
    grass:"/pokeicon/typeleaf.png",
    bug:"/pokeicon/typebug.png",
    ice:"/pokeicon/typeice.png",
    dragon:"/pokeicon/typedragon.png",
    fairy:"/pokeicon/typefairy.png",
    dark:"/pokeicon/typedark.png",
    steel:"/pokeicon/typesteel.png",
    psychic:"/pokeicon/typepsy.png",
    poison:"/pokeicon/typepoison.png",
    ghost:"/pokeicon/typeghost.png",
    fighting:"/pokeicon/typefight.png",
    electric:"/pokeicon/typeelectric.png",
    flying:"/pokeicon/typeflying.png",
}

const form = document.querySelector('.form');
const input = document.querySelector('.input__search');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');

let searchPokemon = 1;

const fetchPokemon = async(pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if (APIResponse.status === 200) {
    const data = await APIResponse.json();
    return data;
    }
}

const renderPokemon = async (pokemon) => {

    pokemonName.innerHTML = 'Loading...';
    pokemonNumber.innerHTML = '';

    const data = await fetchPokemon(pokemon);
   
    if (data) {
    pokemonImage.style.display = 'block';
    pokemonName.innerHTML = data.name;  
    pokemonNumber.innerHTML = data.id;
    pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];

    if (data.types.length > 0) {
        const typeOne = data.types[0].type.name;
        pokemonTypeone.innerHTML = typeOne;
        pokemonTypeone.innerHTML = `<img src="${typeToImage[typeOne]}" alt="${typeOne}">`;
        pokemonTypeone.querySelector('img').style.width = '70px'; 
        pokemonTypeone.querySelector('img').style.height = '70px'; 
    
    } else {
        pokemonTypeone.innerHTML = 'None';
    }
    if (data.types.length > 1) {
        const typeTwo = data.types[1].type.name;
        pokemonTypetwo.innerHTML = typeTwo;
        pokemonTypetwo.innerHTML = `<img src="${typeToImage[typeTwo]}" alt="${typeTwo}">`;
        pokemonTypetwo.querySelector('img').style.width = '70px'; 
        pokemonTypetwo.querySelector('img').style.height = '70px'; 
    
    } else {
        pokemonTypetwo.innerHTML = '';
     }
    input.value = '';
    searchPokemon = data.id
    } else {
        pokemonTypetwo.innerHTML = ''
        pokemonTypeone.innerHTML = 'None'
        pokemonTypeone.className = 'pokemon__typeone';
        pokemonTypetwo.className = 'pokemon__typetwo';
        pokemonImage.style.display = 'none';
        pokemonName.innerHTML = 'Not found';
        pokemonNumber.innerHTML = '';
    }
}

form.addEventListener('submit', (event) => {
   event.preventDefault();
   renderPokemon(input.value.toLowerCase());
   input.value = '';
});

   buttonPrev.addEventListener('click', () => {
    if (searchPokemon >1) {
    searchPokemon -= 1;
    renderPokemon(searchPokemon);
   }
});
   buttonNext.addEventListener('click', () => {
    searchPokemon += 1;
    renderPokemon(searchPokemon);
})

renderPokemon(searchPokemon);
