import { getMovies, updateMovie, createMovie, deleteMovie } from '../../api/api'

export const getMoviesAction = (movies) => ({
    type: 'GET_MOVIES',
    movies,
})

export const updateMovieAction = (movieData) => ({
    type: 'UPDATE_MOVIE',
    movie: movieData,
})

export const createMovieAction = (movieData) => ({
    type: 'CREATE_MOVIE',
    movie: movieData,
})

export const deleteMovieAction = (movieData) => ({
    type: 'DELETE_MOVIE',
    movie: movieData,
})

export const setSortByAction = (sortBy) => ({
    type: 'SET_SORT_BY',
    sortBy,
})

export const setSearchMoviesAction = (movies) => ({
    type: 'SEARCH_MOVIES',
    movies,
})

export const setInitialMoviesAction = () => ({
    type: 'SET_INITIAL_MOVIES',
    movies: [],
})

export const setSelectedMovieAction = (selectedMovie) => ({
    type: 'SET_SELECTED_MOVIE',
    selectedMovie,
})

export const getMoviesData = (options) => {
    return async (dispatch) => {
        try {
            const response = await getMovies(options)
            await dispatch(getMoviesAction(response.data.data))
            return response
        } catch (error) {
            console.log(error)
        }
    }
}

export const updateMovieData = (data) => {
    return async (dispatch) => {
        try {
            const response = await updateMovie(data)
            dispatch(updateMovieAction(response.data))
            return response
        } catch (error) {
            console.log(error)
        }
    }
}

export const createMovieData = (data) => {
    return async (dispatch) => {
        try {
            const response = await createMovie(data)
            dispatch(createMovieAction(response.data))
            return response
        } catch (error) {
            console.log(error)
        }
    }
}

export const deleteMovieData = (data) => {
    return async (dispatch) => {
        try {
            const response = await deleteMovie(data)
            dispatch(deleteMovieAction(data))
            return response
        } catch (error) {
            console.log(error)
        }
    }
}

export const setSortByData = (sortBy) => {
    return async (dispatch, getState) => {
        dispatch(setSortByAction(sortBy))
        const updatedState = getState()

        const options = {
            sortBy: updatedState.movies.sortBy,
        }

        try {
            const response = await getMovies(options)
            await dispatch(getMoviesAction(response.data.data))
            return response
        } catch (error) {
            console.log(error)
        }
    }
}

export const setSearchData = (searchValue) => {
    return async (dispatch) => {
        const options = {
            search: searchValue,
        }

        try {
            const response = await getMovies(options)
            await dispatch(setSearchMoviesAction(response.data.data))
            return response
        } catch (error) {
            console.log(error)
        }
    }
}

export const setInitialMoviesData = () => {
    return (dispatch) => {
        try {
            dispatch(setInitialMoviesAction())
        } catch (error) {
            console.log(error)
        }
    }
}

export const setSelectedMovieData = (selectedMovie) => {
    return (dispatch) => {
        try {
            dispatch(setSelectedMovieAction(selectedMovie))
        } catch (error) {
            console.log(error)
        }
    }
}
