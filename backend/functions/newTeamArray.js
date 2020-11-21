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
            name: playersNamesArray[i], //player name. Names are randomly provided by the API "names.drycodes"
            age: parseInt(Math.random() * 22 + 18, 10), //player age between 18 and 40 years
            numberPicks: parseInt(Math.random() * 45+5, 10), // number of times the player was picked (between 5 and 50 times)
            nacionality: countriesArray[parseInt((countriesArray.length - 1) * Math.random(), 10)] // player nacionality randomly provided by the API "REST Countries"
        }
        playersArray.push(newPlayer);
    }
    return playersArray;
}


exports.newTeamArray = newTeamArray;
