import React from 'react'
import PropTypes from 'prop-types'
import * as moment from 'moment'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { setSelectedMovieData } from '../../redux/actions/movieActions'

import styles from './MovieCard.module.scss'
import Popover from '../Common/Popover/Popover'

const MovieCard = (props) => {
    const [isPopoverOpen, setPopoverOpen] = React.useState(false)
    const { title, genres, poster_path, release_date } = props.movie
    const movieYear = moment(release_date).format('Y')
    const genresToBeDisplayed = genres.join(', ')

    const toggleOpenMovieOptions = () => {
        setPopoverOpen((prevState) => !prevState)
    }

    const onDeleteMovie = () => {
        toggleOpenMovieOptions()
        props.setSelectedMovieData(props.movie)
        props.toggleDeleteMovieModal()
    }

    const onEditMovie = () => {
        toggleOpenMovieOptions()
        props.setSelectedMovieData(props.movie)
        props.toggleEditMovieModal()
    }

    const onMovieClick = () => {
        // history.push(`/film/${props.movie.id}`)
        props.setSelectedMovieData(props.movie)
    }

    return (
        <div className={styles['movie-card']} onClick={onMovieClick}>
            <div className={styles['movie-options-wrapper']}>
                <span
                    onClick={toggleOpenMovieOptions}
                    className={styles['movie-options']}
                >
                    
                    <FontAwesomeIcon data-testid="close-icon" icon={faEllipsisV} />
                </span>
                <Popover
                    toggleOpenMovieOptions={toggleOpenMovieOptions}
                    isPopoverOpen={isPopoverOpen}
                    onDeleteMovie={onDeleteMovie}
                    onEditMovie={onEditMovie}
                />
            </div>
            <div className={styles['movie-image']}>
                <img src={poster_path} alt={title} />
            </div>
            <div className={styles['movie-info']}>
                <div className={styles['left-section']}>
                    <p className={styles['movie-title']}>{title}</p>
                    <p className={styles['movie-genre']}>{genresToBeDisplayed}</p>
                </div>
                <div className={styles['right-section']}>
                    <span className={styles['movie-year']}>{movieYear}</span>
                </div>
            </div>
        </div>
    )
}

MovieCard.propTypes = {
    movie: PropTypes.shape({
        title: PropTypes.string.isRequired,
        genres: PropTypes.array.isRequired,
        poster_path: PropTypes.string,
        release_date: PropTypes.string.isRequired,
    }).isRequired,
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ setSelectedMovieData }, dispatch)
}

export default connect(null, mapDispatchToProps)(MovieCard)
