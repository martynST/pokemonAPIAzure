import { getPokemonTypeMatchups } from "./PokemonAPI.js";


async function getTeamTypes() { 
    let myPokemon = [];
    let pokemonMatchUps = []
    for (let i = 0; i < 6; i++) {
        myPokemon[i] = document.getElementById('pokemon' + (i + 1)).value.toLowerCase();
    }
    let promise = (getPokemonTypeMatchups(myPokemon));
    let weaknessTable = await promise;    

    printTable(weaknessTable);
}

function printTable(table) {    
    let myTable = "<table><tr><th></th><th colspan='3'>Number of pokemon</th><tr><th></th><th>Resistant Against</th><th>Normal Against</th><th>Weak Against</th></tr>"
    for (let key in table) {
        myTable += "<tr><th>"+key+"</th>"
        for (let j = 0; j < table[key].length; j++) {
            myTable += `<td>${table[key][j]}</td>`
        }
        myTable += "</tr>"
    }
    myTable += "</table>";
    document.getElementById("teamWeeknesses").innerHTML = myTable;    
}

window.getTeamTypes = getTeamTypes;

