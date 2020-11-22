import React from 'react'
import styles from './Header.module.css'
import logo from './img/venturusLogo.png'

const Header = () => {
    return (
        <div className={styles.container}>
            <div className={styles.logo}>
                <img src={logo}></img>
                <h1 className={styles.h1}>Squad Management Tool</h1>
            </div>
            <div className={styles.client}>
                <div className={styles.name}>John Doe</div>
                <div className={styles.initials}>JD</div>
            </div>
        </div>
    )
}

export default Header