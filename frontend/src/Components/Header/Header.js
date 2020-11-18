import React from 'react'
import styles from './Header.module.css'
import logo from './img/venturusLogo.png'

const Header = () => {
    return (
        <div className={styles.container}>
            <img src={logo}></img>
            <h1 className={styles.h1}>Squad Management Tool</h1>
        </div>
    )
}

export default Header