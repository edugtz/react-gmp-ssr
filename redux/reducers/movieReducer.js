const initialState = {
    movies: [],
    sortBy: 'release_date',
    search: '',
    selectedMovie: {},
}

export default function moviesReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_SELECTED_MOVIE':
            return {
                ...state,
                selectedMovie: action.selectedMovie,
            }
        case 'GET_MOVIES':
            return {
                ...state,
                movies: action.movies,
            }
        case 'UPDATE_MOVIE':
            return {
                ...state,
                movies: state.movies.map((movie) => {
                    if (movie.id === action.movie.id) {
                        return action.movie
                    }

                    return movie
                }),
            }
        case 'CREATE_MOVIE':
            return {
                ...state,
                movies: [...state.movies, action.movie],
            }
        case 'DELETE_MOVIE':
            return {
                ...state,
                movies: state.movies.filter(
                    (movie) => movie.id !== action.movie.id
                ),
            }
        case 'SET_SORT_BY':
            return {
                ...state,
                sortBy: action.sortBy,
            }
        case 'SEARCH_MOVIES':
            return {
                ...state,
                movies: action.movies,
            }
        case 'SET_INITIAL_MOVIES':
            return {
                ...state,
                movies: action.movies,
            }
        default:
            return state
    }
}
