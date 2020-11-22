import React from 'react'
import styles from './Top5Item.module.css'

const Top5Item = (props) => {
    return (
        <div className={styles.container}>
            <p>{props.data !== undefined ? props.data.teamName:''}</p>
            <p>{props.data !== undefined ? props.data.avgAge: ''}</p>
        </div>
    )
}

export default Top5Item