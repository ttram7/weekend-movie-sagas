import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App.js';
import { createStore, combineReducers, applyMiddleware } from 'redux';
// Provider allows us to use redux within our react app
import { Provider } from 'react-redux';
import logger from 'redux-logger';
// Import saga middleware
import createSagaMiddleware from 'redux-saga';
import { takeEvery, put, take } from 'redux-saga/effects';
import axios from 'axios';

// Create the rootSaga generator function
function* rootSaga() {
    yield takeEvery('FETCH_MOVIES', fetchAllMovies);
    yield takeEvery('FETCH_MOVIE', fetchSelectedMovie);
    yield takeEvery('FETCH_GENRES', fetchGenres);
}

function* fetchAllMovies() {
    // get all movies from the DB
    try {
        const movies = yield axios.get('/api/movie');
        console.log('get all:', movies.data);
        yield put({ type: 'SET_MOVIES', payload: movies.data });

    } catch (error) {
        console.log('get all error', error);
    }
        
}

function* fetchSelectedMovie(action) {
    try {
        console.log('id in fetchSelectedMovie', action.payload)
        const selectedMovie = yield axios.get(`/api/movie/${action.payload}`); //id
        console.log('get movie:', selectedMovie.data);
        yield put({ type: 'SET_MOVIE', payload: selectedMovie.data });

    } catch (error) {
        console.log('get selectedMovie error', error);
    }
    }

    function* fetchGenres(action) {
        try {
            console.log('id in fetchGenres', action.payload)
            const selectedGenres = yield axios.get(`/api/genre/${action.payload}`); //id
            yield put({ type: 'SET_GENRES', payload: selectedGenres.data });
    
        } catch (error) {
            console.log('get fetchGenres error', error);
        }
        }


// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

// Used to store movies returned from the server
const movies = (state = [], action) => {
    switch (action.type) {
        case 'SET_MOVIES':
            return action.payload;
        default:
            return state;
    }
}

const selectedMovie = (state = [], action) => {
    switch (action.type) {
        case 'SET_MOVIE':
            return action.payload;
        default:
            return state;
    }
}

// Used to store the movie genres
const genres = (state = [], action) => {
    switch (action.type) {
        case 'SET_GENRES':
            return action.payload;
        default:
            return state;
    }
}

const movieId = (state = '', action) => {
    switch (action.type) {
        case 'STORE_ID':
            return action.payload;
        default:
            return state;
    }
}

// Create one store that all components can use
const storeInstance = createStore(
    combineReducers({
        movies,
        genres,
        selectedMovie,
        movieId
    }),
    // Add sagaMiddleware to our store
    applyMiddleware(sagaMiddleware, logger),
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

ReactDOM.render(
    <React.StrictMode>
        <Provider store={storeInstance}>
        <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);
