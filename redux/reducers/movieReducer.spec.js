import moviesReducer from './movieReducer'
const initialState = {
    movies: [],
    sortBy: 'release_date',
    search: '',
    selectedMovie: {},
}

describe('moviesReducer', () => {
    it('should return the initial state', () => {
        expect(moviesReducer(undefined, {})).toEqual(initialState)
    })

    it('should handle SET_SELECTED_MOVIE', () => {
        const result = moviesReducer(undefined, {
            type: 'SET_SELECTED_MOVIE',
            selectedMovie: { id: 1 },
        })

        expect(result).toEqual({
            ...initialState,
            selectedMovie: { id: 1 },
        })
    })

    it('should handle GET_MOVIES', () => {
        const result = moviesReducer(undefined, {
            type: 'GET_MOVIES',
            movies: [{ id: 13, title: 'The Devil All The Time' }],
        })

        expect(result).toEqual({
            ...initialState,
            movies: [{ id: 13, title: 'The Devil All The Time' }],
        })
    })

    it('should handle UPDATE_MOVIE', () => {
        const result = moviesReducer(
            {
                ...initialState,
                movies: [
                    { id: 13, title: 'The Devil All The Time' },
                    { id: 24, title: 'Harry Potter' },
                ],
            },
            {
                type: 'UPDATE_MOVIE',
                movie: { id: 13, title: 'The Devil All The Times' },
            }
        )

        expect(result).toEqual({
            ...initialState,
            movies: [
                { id: 13, title: 'The Devil All The Times' },
                { id: 24, title: 'Harry Potter' },
            ],
        })
    })

    it('should handle CREATE_MOVIE', () => {
        const result = moviesReducer(undefined, {
            type: 'CREATE_MOVIE',
            movie: { id: 13, title: 'The Devil All The Time' },
        })

        expect(result).toEqual({
            ...initialState,
            movies: [{ id: 13, title: 'The Devil All The Time' }],
        })
    })

    it('should handle DELETE_MOVIE', () => {
        const result = moviesReducer(
            {
                ...initialState,
                movies: [{ id: 13, title: 'The Devil All The Time' }],
            },
            {
                type: 'DELETE_MOVIE',
                movie: { id: 13, title: 'The Devil All The Time' },
            }
        )

        expect(result).toEqual({
            ...initialState,
            movies: [],
        })
    })

    it('should handle SET_SORT_BY', () => {
        const result = moviesReducer(undefined, {
            type: 'SET_SORT_BY',
            sortBy: 'release_date',
        })

        expect(result).toEqual({
            ...initialState,
            sortBy: 'release_date',
        })
    })

    it('should handle SEARCH_MOVIES', () => {
        const result = moviesReducer(undefined, {
            type: 'SEARCH_MOVIES',
            movies: [],
        })

        expect(result).toEqual({
            ...initialState,
            movies: [],
        })
    })

    it('should handle SET_INITIAL_MOVIES', () => {
        const result = moviesReducer(undefined, {
            type: 'SET_INITIAL_MOVIES',
            movies: [],
        })

        expect(result).toEqual({
            ...initialState,
            movies: [],
        })
    })
})
