import React, { useRef, useState } from 'react'
import { useContext } from "react";
import styles from './MyTeams.module.css'
import { Context } from '../../Context'
import { postData, useIsFirstRender } from '../../commonFunctions'
import { useHistory } from "react-router-dom"
import MyTeamsItem from '../MyTeamsItem/MyTeamsItem'

const MyTeams = () => {
    const history = useHistory();
    // these variables are explained in the Context.js file
    let { setCreateTeam, clientData, setClientData } = useContext(Context);
    // used in the carousel for the phone version. 
    // signals which team must be displayed in the 
    // carousel
    let [currentTeam, setCurrentTeam] = useState(0);


    // updates currentTeam with the index of the 
    // team that must be displayed in the carousel
    // in the phone version
    const updateCarousel = (direction) => {
        if (direction === 1) {
            if (currentTeam + 1 <= clientData[0].teams.length - 1) {
                setCurrentTeam(val => val + 1);
            }
        } else {
            if (currentTeam - 1 >= 0) {
                setCurrentTeam(val => val - 1);
            }
        }
    }

    // method implemented to sort the array of teams by team name or description.
    // if the input 'sortingOrder' is equal to 'AZ', the method will sort the array from A to Z. 
    // if sortingOrder is equal to anything else, the method will sort the array from Z to A.
    // the input 'parameter can assume the values 'teamName' or 'description', and it will define
    // if the sorting method will sort the teams names or the descriptions of the teams.
    let sortArray = (sortingOrder, parameter) => {
        let sorted;
        let clientDataCopy = [...clientData];
        while (!sorted) {
            sorted = true;
            for (let i = 0; i < clientData[0].teams.length - 1; i++) {
                console.log(i);
                if (sortingOrder === 'AZ') {
                    if (clientData[0].teams[i][parameter].toLowerCase() > clientData[0].teams[i + 1][parameter].toLowerCase()) {
                        sorted = false;
                        let aux = clientDataCopy[0].teams[i];
                        clientDataCopy[0].teams[i] = clientDataCopy[0].teams[i + 1];
                        clientDataCopy[0].teams[i + 1] = aux;
                    }
                } else {
                    if (clientData[0].teams[i][parameter].toLowerCase() < clientData[0].teams[i + 1][parameter].toLowerCase()) {
                        sorted = false;
                        let aux = clientDataCopy[0].teams[i];
                        clientDataCopy[0].teams[i] = clientDataCopy[0].teams[i + 1];
                        clientDataCopy[0].teams[i + 1] = aux;
                    }
                }
            }
        }
        setClientData(clientDataCopy);
        console.log(clientData[0].teams);
    }

    return (
        <div className={styles.container}>
            <div className={styles.containerMobile}>
                <div className={styles.carouselFrame}>
                    <div className={styles.carousel}>
                        {clientData.length > 0 ? clientData[0].teams.map((item, i) => i === currentTeam ? <MyTeamsItem data={item} isMobile={true} /> : '') : ''}

                    </div>

                </div>
                <div className={styles.buttonsContainer}>
                    <div className={styles.leftButton} onClick={() => updateCarousel(-1)}><i class="fas fa-chevron-left"></i></div>
                    <button onClick={() => {
                        setCreateTeam(true);
                        history.push("/configure")
                    }
                    } className={styles.newTeamBtn}>+</button>
                    <div className={styles.rightButton} onClick={() => updateCarousel(+1)}><i class="fas fa-chevron-right"></i></div>
                </div>
            </div>
            <div className={styles.containerDesktop} >
                <div className={styles.firstLine}>
                    <div className={styles.title}>
                        <p>My Teams</p>
                    </div>
                    <button onClick={() => {
                        setCreateTeam(true);
                        history.push("/configure")
                    }
                    } className={styles.newTeamBtn}>+</button>
                </div>
                <div className={styles.divider}></div>
                <div className={styles.secondLine}>
                    <div className={styles.firstSelector}>
                        <p>Name</p>
                        <div className={styles.sortByNameBtns}>
                            <i className="fas fa-caret-left" onClick={() => sortArray('AZ', 'teamName')}></i>
                            <i className="fas fa-caret-left" onClick={() => sortArray('ZA', 'teamName')}></i>
                        </div>
                    </div>
                    <div className={styles.secondSelector}>
                        <p>Description</p>
                        <div className={styles.sortByDescriptionBtns}>
                            <i className="fas fa-caret-left" onClick={() => sortArray('AZ', 'description')}></i>
                            <i className="fas fa-caret-left" onClick={() => sortArray('ZA', 'description')}></i>
                        </div>
                    </div>
                </div>
                <div className={styles.teams}>
                    {clientData.length > 0 ? clientData[0].teams.map((item, i) => <MyTeamsItem data={item} isMobile={false} />) : ''}
                </div>
            </div>
        </div>
    )
}

export default MyTeams