import React from 'react'
import styles from './MyTeams.module.css'

const MyTeams = (props) => {
    return (
        <div className={styles.container}>
            MY TEAMS
            <button onClick={()=>props.configure(true)}>ABRIR</button>
        </div>
    )
}

export default MyTeams