import React from 'react'
import styles from './Statistics.module.css'

const Statistics = () => {
    return (
        <div className={styles.container}>
            <div className={styles.most}><p className={styles.p}>AR</p></div>
            <div className={styles.least}><p className={styles.p}>BL</p></div>
        </div>
    )
}

export default Statistics