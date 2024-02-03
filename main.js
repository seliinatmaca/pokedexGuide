const poke_container = document.querySelector(".poke-container");
const search = document.querySelector(".search");
const searchBtn= document.querySelector(".searchBtn");
const searchInput = document.querySelector(".searchInput");

const pokemon_count = 151;



const bg_color = {
    grass: '#8CD36C',
    fire: '#FF6143',
    water:'#3399FE',
    bug:'#AABA23',
    normal:'#AAAA99',
    flying: '#8898FF',
    poison: '#B76EA5',
    electric: '#FFCC33',
    ground:'#E2C46B',
    fairy: '#F1A8EC',
    psychic: '#FF70A4',
    fighting: '#C66D5B',
    rock:'#C5B678',
    dragon:'#8779E6',
    ice: '#65CCFF',
}

searchBtn.addEventListener("click", () =>{
    search.classList.toggle("active")
})

searchInput.addEventListener("input", (e) => {
    const searchValue = searchInput.value.toLowerCase()
    const pokemonNames = document.querySelectorAll(".poke-name")

    pokemonNames.forEach((pokemonName) => {
        if (pokemonName.innerHTML.toLowerCase().includes(searchValue)) {
            pokemonName.parentElement.parentElement.style.display = "block";
        } else {
            pokemonName.parentElement.parentElement.style.display = "none";
        }
    });
});


const fetchPokemons = async() => {
    for(let i=1; i<pokemon_count; i++){
        await getPokemon(i)
    }
}

const getPokemon = async (id)=> {
    const url= `https://pokeapi.co/api/v2/pokemon/${id}`
    const rest = await fetch(url)
    const data = await rest.json()
    // console.log(data)
    createPokemonCard(data)
}

const createPokemonCard = (pokemon) =>{
    const pokemonDiv = document.createElement("div")
    pokemonDiv.classList.add("pokemon")


    const pokemonId = pokemon.id.toString().padStart(3, "0")
    // console.log(pokemonId)
   const pokemonType = pokemon.types[0].type.name
   const pokemonBg = bg_color[pokemonType]
   pokemonDiv.style.backgroundColor= `${pokemonBg}`

    const pokemonDivInnerHTML = ` 
    <div class="image-container">
    <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png" alt="first pokemon">
</div>
<div class="poke-info">
    <span class="poke-id">#${pokemonId}</span>
    <h3 class="poke-name">${pokemon.name}</h3>
    <div class="small">
        <small class="poke-exp">
            <i class="fa solid fa-flask"></i> ${pokemon.base_experience} exp
        </small>
        <small class="poke-weight">
            <i class="fa solid fa-flask"></i> ${pokemon.weight}  kg
        </small>
    </div>
    <div class="poke-type">
<i class="fa-brands fa-uncharted"></i> ${pokemonType} 
</div>
</div>`



pokemonDiv.innerHTML= pokemonDivInnerHTML
poke_container.appendChild(pokemonDiv)
}

fetchPokemons()