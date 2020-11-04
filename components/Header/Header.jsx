import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
    setSearchData,
    setInitialMoviesData,
    setSelectedMovieData,
} from '../../redux/actions/movieActions'
import Link from 'next/link';
import { useRouter } from 'next/router';

import styles from './Header.module.scss'
import SearchBar from '../SearchBar/SearchBar'
import MovieDetails from '../MovieDetails/MovieDetails'

const Header = (props) => {
    const [searchValue, setSearchValue] = React.useState('')
    const router = useRouter();
    const query = router.query;

    const handleOnChange = (event) => {
        setSearchValue(event.target.value);
    };

    const handleKeyPress = (event) => {
        const value = event.target.value;
        if (value.trim().length > 0 && event.key == 'Enter') {
            searchMovies();
        }
    };

    const searchMovies = () => {
        if (router.pathname !== 'search') {
            router.push(`/search?search=${searchValue}`);
        }
        props.setSearchData(searchValue);
    };

    React.useEffect(() => {
        if (router && router.query) {
            if (query.search) {
                setSearchValue(query.search);
                props.setSearchData(query.search);
            } else {
                setSearchValue('')
                props.setSearchData('');
                props.setSelectedMovieData({})
            }
        }
    }, [router]);

    return (
        <header className={styles.header}>
            <div className={styles.overlay}></div>
            <div className={styles.container}>
                <div className={styles['top-section']}>
                    <Link href='/'>
                        <span onClick={searchMovies} className={styles['app-title']}>
                            <b>netflix</b>roulette
                        </span>
                    </Link>
                   
                    <div className={styles['search-icon-wrapper']}>
                        {props.selectedMovie &&
                        Object.keys(props.selectedMovie).length !== 0 ? (
                            <span
                                onClick={() => props.setSelectedMovieData({})}
                                className={styles['search-toggle-icon']}
                            >
                                <i className={`${styles.fa} ${styles['fa-search']}`}></i>
                            </span>
                        ) : (
                            <button
                                onClick={props.toggleAddMovieModal}
                                className={styles['add-movie']}
                            >
                                + ADD MOVIE
                            </button>
                        )}
                    </div>
                </div>
                <div className={styles['main-section']}>
                    {props.selectedMovie &&
                    Object.keys(props.selectedMovie).length !== 0 ? (
                        <MovieDetails movie={props.selectedMovie} />
                    ) : (
                        <>
                            <h2>FIND YOUR MOVIE</h2>
                            <div className={styles['search-section']}>
                                <SearchBar
                                    searchValue={searchValue}
                                    handleOnChange={handleOnChange}
                                    handleKeyPress={handleKeyPress}
                                />
                                 <Link href={`/search?search=${searchValue}`}>
                                    <button className={styles['search-movies-button']} 
                                    onClick={searchMovies}>SEARCH</button>
                                </Link>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </header>
    )
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(
        { setSearchData, setInitialMoviesData, setSelectedMovieData },
        dispatch
    )
}

const mapStateToProps = (state) => {
    const { selectedMovie } = state.movies

    return {
        selectedMovie,
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Header)
