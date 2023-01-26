const pokedex = document.querySelector(".container");

const pokemon = () => {
    const promises = [];
    for (let i = 1; i <= 10; i++) {
        const api = `https://pokeapi.co/api/v2/pokemon/${i}`;
        promises.push(fetch(api)
        .then((res) => res.json()));
    }

    Promise.all(promises).then((res) => {
        const qpokemon = res.map((res) => ({
            id: res.id,
            name: res.name,
            color: res.color,
            type : res.types.map((type) => type.type.name).join(", "),
            base_experience: res.base_experience,   
            base_happiness: res.base_happiness,
            capture_rate: res.capture_rate,
            image: res.sprites["front_default"],
        }));
        showPok(qpokemon);
    });
};

const showPok = (qpokemon) => {
console.log(qpokemon);
    const pokemonnHTMLString = qpokemon
        .map(
            (pokemonn) => `
        <li class="card" style="padding: 2%;margin: 2%;list-style-type: none; display: flax">
            <img class="cardimage" src="${pokemonn.image}"/>
            <h2 class="cardname"> ${pokemonn.name}</h2>
            <p class="cardtype">Type: ${pokemonn.type}</p>
            <p class="cardid">Id: ${pokemonn.id}</p
            <p class="cardbase">Base: ${pokemonn.base_experience}</p>
        </li>
    `
        )
        .join('.');
    pokedex.innerHTML = pokemonnHTMLString;
};

pokemon();