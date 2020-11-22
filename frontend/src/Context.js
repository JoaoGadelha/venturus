import React, { useEffect } from "react";
import { useState } from "react";
import { postData } from './commonFunctions'

export const Context = React.createContext();

export const Provider = (props) => {
  let [clientID, setClientID] = useState('5fb5459de50e9f429ef7a85c');
  let [globalDataID, setGlobalDataID] = useState('5fb918d4259d5a00244ba167'); // global client ID. Stores a collection of teams used in the average ages board in the main page.
  let [createTeam, setCreateTeam] = useState(false); // flag that turns 'true' if the 'create new team' button was clicked, instead of the 'edit team button'.
  let [clientData, setClientData] = useState('');
  let [globalData, setGlobalData] = useState('');
  let [teamID, setTeamID] = useState('');

  useEffect(() => {
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