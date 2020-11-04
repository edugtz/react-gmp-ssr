import React from 'react'

import styles from './NoMovieResults.module.scss'

const NoMovieResults = () => {
    return (
        <div className={styles['no-movie-results']}>
            <h1>No Movies Found</h1>
        </div>
    )
}

export default NoMovieResults
