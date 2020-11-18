import React from 'react'
import styles from './MyTeams.module.css'
import { useHistory } from "react-router-dom";

const MyTeams = () => {
  const history = useHistory();
    return (
        <div className={styles.container}>
            <div className={styles.title}>
                <p>My Teams</p>
            </div>
            <button onClick={()=>history.push("/configure")} className={styles.newTeamBtn}>+</button>
        </div>
    )
}

export default MyTeams