const axios = require("axios");

let newTeamArray = async () => {
    let playersNamesArray = await axios.get('http://names.drycodes.com/30?nameOptions=boy_names');
    playersNamesArray = playersNamesArray.data;
    let countriesArray = await axios.get('https://restcountries.eu/rest/v2/all');
    countriesArray = countriesArray.data;
    for (let i = 0; i < playersNamesArray.length; i++) {
        let playerName = playersNamesArray[i];
        playerName = playerName.replace('_', ' ');
        playersNamesArray[i] = playerName;
    }

    for (let i=0; i < countriesArray.length; i++){
        countriesArray[i] = countriesArray[i].name;
    }

    let numPlayers = parseInt(Math.random() * 3 + 22, 10); // numero de jogadores do time (numero aleatorio entre 22 e 25, ja que sao 11 titulares mais um numero aleatorio de reservas)
    let playersArray = [];
    for (let i = 0; i < numPlayers; i++) {
        let newPlayer = {
            name: playersNamesArray[i], //nome do jogador. Nomes sao fornecidos aleatoriamente pela API "names.drycodes"
            age: parseInt(Math.random() * 22 + 18, 10), //idade do jogador entre 18 e 40 anos
            numberPicks: parseInt(Math.random() * 20, 10), // numero de vezes que o jogador foi escolhido (entre 0 e 20 vezes)
            nacionality: countriesArray[parseInt((countriesArray.length - 1) * Math.random(), 10)] // nacionalidade aleatoriamente escolhida do vetor fornecido pela API "REST Countries"
        }
        playersArray.push(newPlayer);
    }
    return playersArray;
}


exports.newTeamArray = newTeamArray;