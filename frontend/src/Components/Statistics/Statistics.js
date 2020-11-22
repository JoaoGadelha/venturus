import React, { useEffect, useRef, useState } from 'react'
import { useContext } from "react";
import { Context } from '../../Context'
import styles from './Statistics.module.css'

const Statistics = () => {
    // these variables are explained in the Context.js file
    let { teamID, clientData } = useContext(Context);
    // stores the index of the currently clicked team
    let [teamIndex, setTeamIndex] = useState('');
    let [mostPicked, setMostPicked] = useState(0);
    let [leastPicked, setLeastPicked] = useState(0);
    // stores the most and least picked players names initials
    let [mostPickedInitials, setMostPickedInitials] = useState('');
    let [leastPickedInitials, setLeastPickedInitials] = useState('');
    // stores the most and least picked players percentages
    let [mostPickedPercentage, setMostPickedPercentage] = useState('');
    let [leastPickedPercentage, setLeastPickedPercentage] = useState('');
    
    // this snippet runs whenever teamID updates its value.
    // used to update the index of the currently clicked team
    useEffect(() => {
        setMostPicked(0);
        setLeastPicked(0);
        if (clientData.length > 0) {
            let index = -1;
            for (let i = 0; i < clientData[0].teams.length; i++) {
                if (clientData[0].teams[i].teamID === teamID) {
                    index = i;
                }
            }
            setTeamIndex(index);
        }
    }, [teamID])

    // this runs whenever teamIndex changes.
    // used to find the initials of the most and least picked players
    useEffect(() => {
        let mostAux = 0;
        let leastAux = 0;
        if (clientData.length > 0 && teamIndex !== '' && teamID !== '') {
            for (let i = 0; i < clientData[0].teams[teamIndex].team.length; i++) {
                if (clientData[0].teams[teamIndex].team[mostAux].numberPicks < clientData[0].teams[teamIndex].team[i].numberPicks) {
                    mostAux = i;
                }
                if (clientData[0].teams[teamIndex].team[leastAux].numberPicks > clientData[0].teams[teamIndex].team[i].numberPicks) {
                    leastAux = i;
                }
            }
            let mostInitials = clientData[0].teams[teamIndex].team[mostAux].name.match(/\b\w/g) || [];
            mostInitials = ((mostInitials.shift() || '') + (mostInitials.pop() || '')).toUpperCase();
            let leastInitials = clientData[0].teams[teamIndex].team[leastAux].name.match(/\b\w/g) || [];
            leastInitials = ((leastInitials.shift() || '') + (leastInitials.pop() || '')).toUpperCase();
            setMostPickedInitials(mostInitials);
            setLeastPickedInitials(leastInitials);
            calcPercentages();
        }
    }, [teamIndex])

    // function to calculate the percentages of the most and least picked players.
    // the percentages are calculated between the most and least picked players.
    // if the most picked player was chosen M times, and the least, L times, then
    // the percentage for the most picked player is given by M/(M+L)*100 %, and
    // for the least picked player, L/(M+L)*100%. For example, say that the most
    // picked player was chosen 30 times and the least picked one, 10 times.
    // then, the contribution of the most picked player in the total number of times
    // chosen between these two players is calculated by 30/(30+10). To calculate a
    // percentage, the result of this calculation is multiplied by 100, resulting in 75%.
    // For the least picked player, the calculation is 10 /(30+10), resulting in 25% when
    // multiplied by 100.
    let calcPercentages = () => {
        if (clientData.length > 0 && teamIndex !== '') {
            let totalSum = 0; // total sum of picks from the whole team
            let highestPick = 0;
            let lowestPick = 1000000;
            for (let i = 0; i < clientData[0].teams[teamIndex].team.length; i++) {
                totalSum += clientData[0].teams[teamIndex].team[i].numberPicks;
                if (highestPick < clientData[0].teams[teamIndex].team[i].numberPicks) {
                    highestPick = clientData[0].teams[teamIndex].team[i].numberPicks;
                }
                if (lowestPick > clientData[0].teams[teamIndex].team[i].numberPicks) {
                    lowestPick = clientData[0].teams[teamIndex].team[i].numberPicks;
                }
            }
            setMostPickedPercentage((Math.round(((highestPick / (highestPick + lowestPick)) * 100) * 100) / 100).toFixed(2));
            setLeastPickedPercentage((Math.round(((lowestPick / (highestPick + lowestPick)) * 100) * 100) / 100).toFixed(2));
        }
    }

    return (
        <div className={styles.container}>
                <p className={styles.MostPickedTag}>Most picked player</p>
                <p className={styles.MostPickedPercentage}>{clientData.length > 0 && teamIndex !== '' && teamID !== '' ? mostPickedPercentage : ''} %</p>
                <div className={styles.most}><p className={styles.p}>{clientData.length > 0 && teamIndex !== '' && teamID !== '' ? mostPickedInitials : ''}</p></div>
                <p className={styles.LeastPickedTag}>Least picked player</p>
                <p className={styles.LeastPickedPercentage}>{clientData.length > 0 && teamIndex !== '' && teamID !== '' ? leastPickedPercentage : ''} %</p>
                <div className={styles.least}><p className={styles.p}>{clientData.length > 0 && teamIndex !== '' && teamID !== '' ? leastPickedInitials : ''}</p></div>
            <div className={styles.verticalLine}></div>
            <div className={styles.circle}></div>
        </div>
    )
}

export default Statistics