import React, { useEffect, useRef } from 'react'
import styles from './MyTeamsItem.module.css'
import { useContext } from "react";
import { Context } from '../../Context'
import { useHistory } from "react-router-dom"
import { postData } from '../../commonFunctions'

// represents each item from the MyTeams board in the main page
const MyTeamsItem = (props) => {
    // these variables are explained in the Context.js file
    let { setCreateTeam, setTeamID, teamID, clientData, setClientData } = useContext(Context);
    // used to navigate between pages
    const history = useHistory();
    // refs for the elements in this component
    let refContainer = useRef();
    let refTeamName = useRef();
    let refDescription = useRef();
    let refTools = useRef();

    // checks if the user is using a phone to access the page or not.
    useEffect(() => {
        if (props.isMobile) {
            refContainer.current.style.display = 'block';
        }
    }, [])

    // this snippet runs whenever teamID changes value,
    // and is used to update color properties of elements
    // in the MyTeams board in the main page
    useEffect(() => {
        if (!props.isMobile) {
            if (props.data.teamID === teamID) {
                refContainer.current.style.background = '#f7eef7';
                refContainer.current.style.borderRadius = '5px';
                refTeamName.current.style.color = '#b13f7d';
                refDescription.current.style.color = '#b13f7d';
                refTools.current.style.display = 'flex';
            } else {
                refContainer.current.style.background = 'white';
                refContainer.current.style.borderRadius = '0';
                refTeamName.current.style.color = 'black';
                refDescription.current.style.color = 'black';
                refTools.current.style.display = 'none';
            }
        } else {
            refContainer.current.style.borderRadius = '5px';
            refTeamName.current.style.color = '#b13f7d';
            refDescription.current.style.color = 'black';
            refTools.current.style.display = 'flex';
        }
    }, [teamID])

    const onClickContainer = () => {
        setTeamID(props.data.teamID); // important for the update of the Statistics component.
        // The initial letters of the most and least picked players names displayed in the purple
        // soccer field depend on the teamID update.
    }

    // function used to delete elements in the MyTeams board in the main page
    let deleteTeam = async () => {

        let corsAnywhere = '';

        let destiny = 'deleteTeam';
        let url = corsAnywhere + 'https://venturus.herokuapp.com/' + destiny;
        let data = {
            id: clientData[0]._id,
            teamID: props.data.teamID
        }
        let answer = await postData(url, data);
        setClientData(answer);
        setTeamID('');
    }


    return (
        <div className={styles.container} onClick={onClickContainer} ref={refContainer}>
            <p className={styles.p} ref={refTeamName}>{props.data.teamName}</p>
            <p className={styles.p} ref={refDescription}>{props.data.description}</p>
            <div className={styles.tools} ref={refTools}>
                <i className="fas fa-trash" onClick={deleteTeam}></i>
                <i className="fas fa-share-alt"></i>
                <i className="fas fa-pencil-alt" onClick={() => {
                    setTeamID(props.data.teamID);
                    setCreateTeam(false);
                    history.push("/configure");
                }}></i>
            </div>
        </div>
    )
}


export default MyTeamsItem