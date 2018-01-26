let pokemonURL = "https://pokeapi.co/api/v2/pokemon";
let typeURL = "https://pokeapi.co/api/v2/type";

function removeBlank(pokemon) {
    let temp = [];
    for (let i of pokemon) {
        i && temp.push(i);
    }
    return temp;
    
}

export async function getPokemonTypeMatchups(pokemon) {    
    pokemon = removeBlank(pokemon);

    //get all pokemon
    let promise = [];
    for (let p of pokemon) {
        promise.push(
            fetch(`${pokemonURL}/${p}`)
        );
    }
    let result = await Promise.all(promise);
    //make json
    let promise2 = [];
    for (let p of result) {
        promise2.push(
            p.json()
        );
    }
    
    let result2 = await Promise.all(promise2);

    //get type data
    let promise3 = [];
    for (let i = 0; i < result2.length; i++) {
        for (let j = 0; j < result2[i].types.length; j++) {
            promise3.push(
                fetch(`${typeURL}/${result2[i].types[j].type.name}`)
            );
        }
    }

    let result3 = await Promise.all(promise3);

    //make JSON
    let promise4 = [];
    for (let i = 0; i < result3.length; i++) {
        promise4.push(result3[i].json());
    }

    let result4 = await Promise.all(promise4);

    //split up types for each pokemon
    let pokemonTypes = [];
    for (let i = 0; i < result2.length; i++) {
        pokemonTypes.push(result4.splice(0, result2[i].types.length));
    }

    //get damage multipliers
    let typeMatchUpModifiers = [];
    for (let i = 0; i < pokemonTypes.length; i++) {
        typeMatchUpModifiers[i] = [];
        for (let j = 0; j < pokemonTypes[i].length; j++) {
            typeMatchUpModifiers[i][j] = damageModifiers(pokemonTypes[i][j]);
        }
    }
    //combine type match ups for single pokemon
    let pokemonTypeMatchUps = [];
    for (let i = 0; i < typeMatchUpModifiers.length; i++) {
        pokemonTypeMatchUps[i] = getTypeMatchUp();
        if (typeMatchUpModifiers[i].length === 2) {
            for (let key in typeMatchUpModifiers[0][0]) {
                pokemonTypeMatchUps[i][key] = typeMatchUpModifiers[i][0][key] * typeMatchUpModifiers[i][1][key];
            }
        } else {
            pokemonTypeMatchUps[i] = typeMatchUpModifiers[i][0];
        }
    }

    //Calculate team weeknesses
    let weaknessTable = {};
    for (let key in pokemonTypeMatchUps[0]) {
        weaknessTable[key] = [];
        for (let i = 0; i < 3; i++) {
            weaknessTable[key].push(0);
        }
    }

    for (let i = 0; i < pokemonTypeMatchUps.length; i++) {
        for (let key in weaknessTable) {
            if (pokemonTypeMatchUps[i][key] < 1) {
                weaknessTable[key][0]++;
            } else if (pokemonTypeMatchUps[i][key] == 1) {
                weaknessTable[key][1]++;
            } else if (pokemonTypeMatchUps[i][key] > 1) {
                weaknessTable[key][2]++;
            }
        }
    }
    return weaknessTable;
}

function damageModifiers(typeData) {
    let noDamage = typeData.damage_relations.no_damage_from;
    let halfDamage = typeData.damage_relations.half_damage_from;
    let doubleDamage = typeData.damage_relations.double_damage_from;
    let typeMatchUp = getTypeMatchUp();
    for (let i = 0; i < noDamage.length; i++) {
        typeMatchUp[noDamage[i].name] = 0;
    }
    for (let i = 0; i < halfDamage.length; i++) {
        typeMatchUp[halfDamage[i].name] = 0.5;
    }
    for (let i = 0; i < doubleDamage.length; i++) {
        typeMatchUp[doubleDamage[i].name] = 2;
    }
    return typeMatchUp;
}

function getTypeMatchUp() {
    return {
        "normal": 1,
        "fighting": 1,
        "flying": 1,
        "poison": 1,
        "ground": 1,
        "rock": 1,
        "bug": 1,
        "ghost": 1,
        "steel": 1,
        "fire": 1,
        "water": 1,
        "grass": 1,
        "electric": 1,
        "psychic": 1,
        "ice": 1,
        "dragon": 1,
        "dark": 1,
        "fairy": 1
    }
}