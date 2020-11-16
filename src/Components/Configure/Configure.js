import React from 'react'
import styles from './Configure.module.css'

const Configure = (props) => {
    console.log(props)
    return (
        <div className={styles.container}>
            <button onClick={()=>props.configure(false)}>FECHAR</button>
        </div>
    )
}

export default Configure