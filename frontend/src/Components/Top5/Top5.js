import React, { useState, useEffect } from 'react'
import styles from './Top5.module.css'
import { useContext } from "react";
import { Context } from '../../Context'
import Top5Item from './Top5Item/Top5Item'

const Top5 = () => {
    let { globalData } = useContext(Context);
    let [avgAgeIndexesArray, setAvgAgeIndexesArray] = useState([]);
    let [highestAvgAgeArray, setHighestAvgAgeArray] = useState([]);
    let [lowestAvgAgeArray, setLowestAvgAgeArray] = useState([]);
    useEffect(() => {
        if (globalData.length > 0) {
            let avgAgeAuxArray = [];
            for (let i = 0; i < globalData[0].teams.length; i++) {
                let sumAge = 0;
                for (let j = 0; j < globalData[0].teams[i].team.length; j++) {
                    sumAge += globalData[0].teams[i].team[j].age;
                }
                avgAgeAuxArray[i] = { teamName: globalData[0].teams[i].teamName, avgAge: Math.round((sumAge / globalData[0].teams[i].team.length) * 100) / 100, index: i };
            }
            setAvgAgeIndexesArray(avgAgeAuxArray);
        }
    }, [globalData])

    useEffect(() => {
        // sort avgIndexesArray from the lowest to highest average age value
        let sorted = false;
        let auxArray = [...avgAgeIndexesArray];
        while (!sorted) {
            sorted = true;
            for (let i = 0; i < auxArray.length - 1; i++) {
                if (auxArray[i].avgAge > auxArray[i + 1].avgAge) {
                    sorted = false;
                    let temp = auxArray[i];
                    auxArray[i] = auxArray[i + 1];
                    auxArray[i + 1] = temp;
                }
            }
        }

        // place sorted values in the respective arrays (5 lowest in lowestAvgAgeArray and 5 highest in highestAvgAgeArray)
        let lowestAvgAgeAuxArray = [];
        for (let i = 0; i < 5; i++) {
            lowestAvgAgeAuxArray[i] = auxArray[i];
        }
        setLowestAvgAgeArray(lowestAvgAgeAuxArray);

        let highestAvgAgeAuxArray = [];
        let count = 0;
        for (let i = auxArray.length - 1; i > auxArray.length - 6; i--) {
            highestAvgAgeAuxArray[count] = auxArray[i];
            count++;
        }
        setHighestAvgAgeArray(highestAvgAgeAuxArray);
    }, [avgAgeIndexesArray])

    return (
        <div className={styles.container}>
            <div className={styles.title}>
                <p>Top 5</p>
            </div>
            <div className={styles.divider}></div>
            <div className={styles.highest}>
                <p className={styles.boxTitle}>Highest avg age</p>
                <div className={styles.box}>
                    {highestAvgAgeArray.length > 0 ? highestAvgAgeArray.map(item => <Top5Item data={item} />) : ''}
                </div>
            </div>
            <div className={styles.lowest}>
                <p className={styles.boxTitle}>Lowest avg age</p>
                <div className={styles.box}>
                    {lowestAvgAgeArray.length > 0 ? lowestAvgAgeArray.map((item, i) => <Top5Item data={item} />) : ''}
                </div>
            </div>
        </div>
    )
}

export default Top5