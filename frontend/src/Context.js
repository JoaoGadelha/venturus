import React, { useEffect } from "react";
import { useState } from "react";
import { postData } from './commonFunctions'

export const Context = React.createContext();


// stores and provides variables to the whole application, 
// working analogously to Redux in this sense.
export const Provider = (props) => {
  // stores the ID of the John Doe Client. Since it's only one 
  // client for this test, Doe's ID is hardcoded. In a bigger application,
  // with more clients, a login page is necessary.
  let [clientID, setClientID] = useState('5fb5459de50e9f429ef7a85c');
// globalData works a global register of teams in the database, being its registers mainly
// used to calculate the Top 5 board in the main page.
  let [globalDataID, setGlobalDataID] = useState('5fb918d4259d5a00244ba167'); // global client ID. Stores a collection of teams used in the average ages board in the main page.
  // flag that signals if the client has clicked on the create new team button, assuming TRUE value,
  // or on the update team value, receiving the value FALSE
  let [createTeam, setCreateTeam] = useState(false);
// stores all the data from John Doe, such as teams registered in his name
  let [clientData, setClientData] = useState('');
  // receives all the teams stored the global variable in the MongoDB database
  let [globalData, setGlobalData] = useState('');
 // whenever the user clicks in one team in the MyTeams board in the main page,
 // teamID stores the ID of the currently clicked team
  let [teamID, setTeamID] = useState('');

  // runs in the first render of the app
  useEffect(() => {

    // fetches the info from the Node.js/Express.js API built by me.
    // clientData stores teams from John Doe
    // globalData stores many teams used to calculate the average age
    const fetchFun = async () => {
      let corsAnywhere = '';

      let answer1 = await postData(corsAnywhere + 'https://venturus.herokuapp.com/getUsrInfo', { id: clientID });
      setClientData(answer1);

      let answer2 = await postData(corsAnywhere + 'https://venturus.herokuapp.com/getUsrInfo', { id: globalDataID });
      setGlobalData(answer2);
    };
    fetchFun();
  }, [])


  return (
    <Context.Provider value={{ clientID, setClientID, createTeam, setCreateTeam, clientData, setClientData, teamID, setTeamID, globalData, setGlobalData }}>
      {props.children}
    </Context.Provider>
  );
};

export default Provider;