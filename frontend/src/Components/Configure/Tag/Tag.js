import React from 'react'
import styles from './Tag.module.css'

const Tag = (props) => {


    return (
        <div className={styles.container}>
            {props.data.value} <span onClick={() => props.close(props.data.id)} className={styles.closeBtn}><i class="fas fa-times"></i></span>
        </div>
    )
}

export default Tag