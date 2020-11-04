import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import axios from 'axios'
import * as movieActions from './movieActions'
import MockAdapter from 'axios-mock-adapter'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)
const mock = new MockAdapter(axios)

describe('movieActions', () => {
    afterEach(() => {
        mock.reset()
    })

    afterAll(() => {
        mock.restore()
    })

    const mockMovieDataResponse = {
        totalAmount: 1,
        data: [
            {
                id: 150117,
                title: 'I Give It a Year',
                vote_average: 5.4,
                release_date: '2013-02-08',
                poster_path:
                    'https://image.tmdb.org/t/p/w500/d05UThmFSAUD6FTHNjYxhrmdTec.jpg',
                overview:
                    'After a quick courtship, two lovers hastily decide to tie the knot. As their first year of marriage unfolds, temptation and incompatibility put their relationship in jeopardy.',
                genres: ['Comedy', 'Romance'],
                runtime: 97,
            },
        ],
    }

    it('should perform getMoviesData correctly', () => {
        mock.onGet('http://localhost:4000/movies').reply(
            200,
            mockMovieDataResponse
        )

        const expectedAction = [
            {
                movies: [mockMovieDataResponse.data[0]],
                type: 'GET_MOVIES',
            },
        ]

        const store = mockStore({ movies: [] })

        return store.dispatch(movieActions.getMoviesData({})).then((result) => {
            expect(result.data).toEqual(mockMovieDataResponse)
            expect(store.getActions()).toEqual(expectedAction)
        })
    })

    it('should perform updateMovieData correctly', () => {
        const mockUpdateMovieData = {
            ...mockMovieDataResponse,
            data: { ...mockMovieDataResponse.data[0], runtime: 103 },
        }

        mock.onPut('http://localhost:4000/movies').reply(
            204,
            mockUpdateMovieData
        )

        const expectedAction = [
            {
                movie: mockUpdateMovieData,
                type: 'UPDATE_MOVIE',
            },
        ]

        const store = mockStore({ movies: [] })

        return store
            .dispatch(movieActions.updateMovieData({ runtime: 103 }))
            .then((result) => {
                expect(result.data).toEqual(mockUpdateMovieData)
                expect(store.getActions()).toEqual(expectedAction)
            })
    })

    it('should perform createMovieData correctly', () => {
        const mockCreateMovieData = {
            id: 131313,
            title: 'The Devil All The Time',
            vote_average: 6.4,
            release_date: '2019-03-03',
            poster_path:
                'https://image.tmdb.org/t/p/w500/d05UThmFSAUD6FTHNjYxhrmdTec.jpg',
            overview:
                'Sinister characters converge around a young man devoted to protecting those he loves in a postwar backwoods town teeming with corruption and brutality.',
            genres: ['Thriller', 'Crime'],
            runtime: 138,
        }

        mock.onPost('http://localhost:4000/movies').reply(
            201,
            mockCreateMovieData
        )

        const expectedAction = [
            {
                movie: mockCreateMovieData,
                type: 'CREATE_MOVIE',
            },
        ]

        const store = mockStore({ movies: [] })

        return store
            .dispatch(movieActions.createMovieData(mockCreateMovieData))
            .then((result) => {
                expect(result.data).toEqual(mockCreateMovieData)
                expect(store.getActions()).toEqual(expectedAction)
            })
    })

    it('should perform deleteMovieData correctly', () => {
        const mockDeleteMovieData = {
            id: 131313,
        }

        mock.onDelete().reply(204)

        const expectedAction = [
            {
                movie: mockDeleteMovieData.id,
                type: 'DELETE_MOVIE',
            },
        ]

        const store = mockStore({ movies: [] })

        return store
            .dispatch(movieActions.deleteMovieData(mockDeleteMovieData.id))
            .then(() => {
                expect(store.getActions()).toEqual(expectedAction)
            })
    })

    it('should perform setSortByData correctly', () => {
        mock.onGet().reply(200, mockMovieDataResponse)

        const expectedActions = [
            {
                type: 'SET_SORT_BY',
                sortBy: 'release_date',
            },
            {
                type: 'GET_MOVIES',
                movies: [mockMovieDataResponse.data[0]],
            },
        ]

        const store = mockStore({ movies: [] })

        return store
            .dispatch(movieActions.setSortByData('release_date'))
            .then((result) => {
                expect(result.data).toEqual(mockMovieDataResponse)
                expect(store.getActions()).toEqual(expectedActions)
            })
    })

    it('should perform setSearchData correctly', () => {
        mock.onGet().reply(200, mockMovieDataResponse)

        const expectedActions = [
            {
                type: 'SEARCH_MOVIES',
                movies: [mockMovieDataResponse.data[0]],
            },
        ]

        const store = mockStore({ movies: [] })

        return store
            .dispatch(movieActions.setSearchData('Year'))
            .then((result) => {
                expect(result.data).toEqual(mockMovieDataResponse)
                expect(store.getActions()).toEqual(expectedActions)
            })
    })

    it('should perform setInitialMoviesData correctly', () => {
        const expectedActions = [
            {
                type: 'SET_INITIAL_MOVIES',
                movies: [],
            },
        ]

        const store = mockStore({ movies: [] })

        store.dispatch(movieActions.setInitialMoviesData())
        expect(store.getActions()).toEqual(expectedActions)
    })

    it('should perform setSelectedMovieData correctly', () => {
        const expectedActions = [
            {
                type: 'SET_SELECTED_MOVIE',
                selectedMovie: { id: 1 },
            },
        ]

        const store = mockStore({ movies: [], selectedMovie: {} })

        store.dispatch(movieActions.setSelectedMovieData({ id: 1 }))
        expect(store.getActions()).toEqual(expectedActions)
    })

    it('should create an action to get movies', () => {
        const expectedAction = {
            type: 'GET_MOVIES',
            movies: [],
        }

        expect(movieActions.getMoviesAction([])).toEqual(expectedAction)
    })

    it('should create an action to update a movie', () => {
        const expectedAction = {
            type: 'UPDATE_MOVIE',
            movie: [],
        }

        expect(movieActions.updateMovieAction([])).toEqual(expectedAction)
    })

    it('should create an action to create a movie', () => {
        const expectedAction = {
            type: 'CREATE_MOVIE',
            movie: [],
        }

        expect(movieActions.createMovieAction([])).toEqual(expectedAction)
    })

    it('should create an action to delete a movie', () => {
        const expectedAction = {
            type: 'DELETE_MOVIE',
            movie: [],
        }

        expect(movieActions.deleteMovieAction([])).toEqual(expectedAction)
    })

    it('should create an action to set sort by filter', () => {
        const expectedAction = {
            type: 'SET_SORT_BY',
            sortBy: 'release_date',
        }

        expect(movieActions.setSortByAction('release_date')).toEqual(
            expectedAction
        )
    })

    it('should create an action to search movies', () => {
        const expectedAction = {
            type: 'SEARCH_MOVIES',
            movies: [],
        }

        expect(movieActions.setSearchMoviesAction([])).toEqual(expectedAction)
    })

    it('should create an action to set initial movies', () => {
        const expectedAction = {
            type: 'SET_INITIAL_MOVIES',
            movies: [],
        }

        expect(movieActions.setInitialMoviesAction([])).toEqual(expectedAction)
    })

    it('should create an action to set selected movie', () => {
        const expectedAction = {
            type: 'SET_SELECTED_MOVIE',
            selectedMovie: { id: 1 },
        }

        expect(movieActions.setSelectedMovieAction({ id: 1 })).toEqual(
            expectedAction
        )
    })
})
