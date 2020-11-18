import React from 'react'
import styles from './Configure.module.css'
import { useHistory } from "react-router-dom";

const Configure = (props) => {
    const history = useHistory();
    return (
        <div className={styles.container}>
            <div className={styles.window}>
                <h1 className={styles.title}>Create your team</h1>
                <div className={styles.grid1}>
                    <p className={styles.p}>TEAM INFORMATION</p>
                    <div>
                        <h1 className={styles.h1}>Team name</h1>
                        <input></input>
                    </div>
                    <div>
                        <h1 className={styles.h1}>Description</h1>
                        <input></input>
                    </div>
                    <div>
                        <h1 className={styles.h1}>Team website</h1>
                        <input></input>
                    </div>
                    <div>
                        <h1 className={styles.h1}>Team type</h1>
                        <input></input>
                    </div>
                    <div>
                        <h1 className={styles.h1}>Tags</h1>
                        <input></input>
                    </div>



                </div>
                <div className={styles.grid2}>
                    <p className={styles.p}>CONFIGURE SQUAD</p>
                    <div className={styles.formation}>
                        <h1 className={styles.h1}>Formation</h1>
                        <select name="cars" id="cars">
                            <option value="volvo">Volvo</option>
                            <option value="saab">Saab</option>
                            <option value="opel">Opel</option>
                            <option value="audi">Audi</option>
                        </select>
                        <div className={styles.field}></div>
                        <button onClick={() => history.push("/")} className={styles.saveBtn}>Save</button>
                    </div>
                    <div className={styles.search}>
                        <h1 className={styles.h1}>Search Players</h1>
                        <input></input>
                        <div className={styles.resultWindow}></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Configure