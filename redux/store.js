import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import moviesReducer from './reducers/movieReducer';

const middleware = applyMiddleware(
    thunkMiddleware
)

const rootReducer = combineReducers({
    movies: moviesReducer
});


const store = createStore(
    rootReducer,
    middleware
);

export default store;