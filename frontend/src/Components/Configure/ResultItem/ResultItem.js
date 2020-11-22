import React from 'react'
import styles from './ResultItem.module.css'


// implements one item of the results of the player search in the configuration page.
// Each item displays the name, nacionality and age of one player.
const ResultItem = (props) => {
    return (
        <div className={styles.container}>
            <div className={styles.item}><p className={styles.p}>Name:</p><h1 className={styles.h1}>{props.data[0].teams[props.teamIndex].team[props.index].name}</h1></div>
            <div className={styles.item}><p className={styles.p}>Age:</p><h1 className={styles.h1}>{props.data[0].teams[props.teamIndex].team[props.index].age}</h1></div>
            <div className={styles.item}><p className={styles.p}>Nacionality:</p><h1 className={styles.h1}>{props.data[0].teams[props.teamIndex].team[props.index].nacionality}</h1></div>
        </div>

    )
}

export default ResultItem