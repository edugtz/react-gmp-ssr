import React from 'react'

import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import MovieList from '../MovieList/MovieList'
import NotFound404 from '../NotFound404/NotFound404'
import MovieFilters from '../../components/MovieFilters/MovieFilters'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getMoviesData } from '../../redux/actions/movieActions'

import styles from './Home.module.scss'

const Home = (props) => {
    const { movies } = props

    const [isAddMovieModalOpen, setAddMovieModal] = React.useState(false)
    const [isDeleteModalOpen, setDeleteMovieModal] = React.useState(false)
    const [isEditModalOpen, setEditMovieModal] = React.useState(false)

    const toggleAddMovieModal = () => {
        console.log('toggleAddMovieModal')
        setAddMovieModal((prevState) => !prevState)
    }

    const toggleDeleteMovieModal = () => {
        setDeleteMovieModal((prevState) => !prevState)
    }

    const toggleEditMovieModal = () => {
        setEditMovieModal((prevState) => !prevState)
    }

    const MoviesWrapper = (props) => {
        return (
            <MovieList
                isAddMovieModalOpen={isAddMovieModalOpen}
                toggleAddMovieModal={toggleAddMovieModal}
                isDeleteModalOpen={isDeleteModalOpen}
                toggleDeleteMovieModal={toggleDeleteMovieModal}
                isEditModalOpen={isEditModalOpen}
                toggleEditMovieModal={toggleEditMovieModal}
                {...props}
            />
        )
    }

    return (
        <div className={styles['home-app']}>
            <Header toggleAddMovieModal={toggleAddMovieModal} />
            <div className={styles['main-content']}>
                <div className={`${styles.container} ${styles['main-app-container']}`}>
                    <MovieFilters />
                    <MoviesWrapper movies={props.movies} />
                </div>
            </div>
            <Footer />
        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ getMoviesData }, dispatch)
}

const mapStateToProps = (state) => {
    const { movies, sortBy } = state.movies

    return { movies, sortBy }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
