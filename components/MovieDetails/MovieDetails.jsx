import React from 'react';
import * as moment from 'moment';

import styles from './MovieDetails.module.scss';

const MovieDetails = props => {
    const { title, poster_path, overview, tagline, release_date, runtime, vote_average } = props.movie;
    const displayedRuntime = runtime ? `${runtime} min` : '';

    return (
        <div className={styles['movie-details']}>
            <div className={styles['left-section']}>
                <div className={styles['movie-image']}>
                    <img className={styles['movie-details-image']} src={poster_path} alt={title} />
                </div>
            </div>
            <div className={styles['right-section']}>
                <div className={styles['inner-top-section-wrapper']}>
                    <p className={styles['movie-title']}>{title}</p>
                    <div className={styles['movie-rating-container']}>
                        <p className={styles['movie-rating']}>{vote_average ? vote_average : 0}</p>
                    </div>
                </div>
                <div style={{ color: '#ffffff', fontSize: '0.75em' }}>
                    <span className={styles['movie-tagline']}>{tagline}</span>
                </ div>
                <div className={styles['inner-middle-section-wrapper']}>
                    <span className={styles['movie-year']}>{`${moment(release_date).format('Y')}`}</span>
                    <span className={styles['movie-duration']}>{displayedRuntime}</span>
                </div>
                <div className={styles['inner-bottom-section-wrapper']}>
                    <p className={styles['movie-description']}>{overview}</p>
                </div>
            </div>
        </div>
    )
};

export default MovieDetails;