import React from 'react'

import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'

import styles from './NotFound404.module.scss'

const NotFound404 = () => {
    return (
        <div className={styles['home-app']}>
            <Header />
            <div className={styles['not-found-404']}>
                <div className={styles['error-message-wrapper']}>
                    <h1>Oops, something went wrong!</h1>
                    <h1>404</h1>
                </div>
            </div>
            <Footer />
        </div>
       
    )
}

export default NotFound404
