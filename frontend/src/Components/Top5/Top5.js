import React from 'react'
import styles from './Top5.module.css'

const Top5 = () => {
    return (
        <div className={styles.container}>
            <div className={styles.title}>
                <p>Top 5</p>
            </div>
            <div className={styles.board}>
                <div className={styles.highest}>
                    <p>Highest avg age</p>
                    <div className={styles.box}></div>
                </div>
                <div className={styles.lowest}>
                    <p>Lowest avg age</p>
                    <div className={styles.box}></div>
                </div>
            </div>
        </div>
    )
}

export default Top5