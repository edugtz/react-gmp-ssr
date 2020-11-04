import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import MovieCard from '../../components/MovieCard/MovieCard'
import AddMovieModal from '../../components/AddMovieModal/AddMovieModal'
import DeleteMovieModal from '../../components/DeleteMovieModal/DeleteMovieModal'
import EditMovieModal from '../../components/EditMovieModal/EditMovieModal'
import NoMovieResults from '../NoMovieResults/NoMovieResults'

import styles from './MovieList.module.scss'

const MovieList = (props) => {
    const {
        movies,
        isAddMovieModalOpen,
        isDeleteModalOpen,
        isEditModalOpen,
        toggleAddMovieModal,
        toggleDeleteMovieModal,
        toggleEditMovieModal,
    } = props

    return (
        <>
            <AddMovieModal
                isModalOpen={isAddMovieModalOpen}
                toggleModalOpen={toggleAddMovieModal}
            />
            {movies.length > 0 ? (
                <div className={styles.movies}>
                    <div className={styles['movie-results-container']}>
                        <span className={styles['movie-results']}>
                            <b>{movies && movies.length}</b> movies found
                        </span>
                    </div>
                    {props.selectedMovie &&
                        Object.keys(props.selectedMovie).length !== 0 && (
                            <>
                                <DeleteMovieModal
                                    movie={props.selectedMovie}
                                    isModalOpen={isDeleteModalOpen}
                                    toggleModalOpen={toggleDeleteMovieModal}
                                />
                                <EditMovieModal
                                    movie={props.selectedMovie}
                                    isModalOpen={isEditModalOpen}
                                    toggleModalOpen={toggleEditMovieModal}
                                />
                            </>
                        )}
                    {movies.length > 0 &&
                        movies.map((movie, index) => (
                            <MovieCard
                                key={`${movie.title}${index}`}
                                movie={movie}
                                toggleDeleteMovieModal={toggleDeleteMovieModal}
                                toggleEditMovieModal={toggleEditMovieModal}
                            />
                        ))}
                </div>
            ) : (
                <NoMovieResults />
            )}
        </>
    )
}

MovieList.propTypes = {
    toggleAddMovieModal: PropTypes.func.isRequired,
    isAddMovieModalOpen: PropTypes.bool.isRequired,
    toggleDeleteMovieModal: PropTypes.func.isRequired,
    isDeleteModalOpen: PropTypes.bool.isRequired,
    toggleEditMovieModal: PropTypes.func.isRequired,
    isEditModalOpen: PropTypes.bool.isRequired,
    movies: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string.isRequired,
            genres: PropTypes.array.isRequired,
            poster_path: PropTypes.string,
            release_date: PropTypes.string.isRequired,
        })
    ).isRequired,
}

const mapStateToProps = (state) => {
    const { movies, totalMovies, selectedMovie } = state.movies

    return {
        movies,
        totalMovies,
        selectedMovie,
    }
}

export default connect(mapStateToProps, null)(MovieList)
