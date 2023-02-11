import React, { useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom'; 
import './MovieList.css'

function MovieList() {

    const dispatch = useDispatch();
    const movies = useSelector(store => store.movies);
    const thisMovie = useSelector(store => store.selectedMovie);

    useEffect(() => {
        dispatch({ type: 'FETCH_MOVIES' });
    }, []);

    const history = useHistory();

    const selectMovie = (movieId) => {
        console.log('in MovieList',movieId)
        // maybe genre only?]
        // send selected movie data to redux not saga
        dispatch({type: 'DISPLAY_DETAILS', payload: movieId});
        if (thisMovie.length === 1) {
            history.push('/details');
        }
        
    }

    return (
        <main>
            <h1>MovieList</h1>
            <section className="movies">
                {movies.map(movie => {
                    return (
                        <div key={movie.id} >
                            <h3>{movie.title}</h3>
                            <img src={movie.poster} alt={movie.title} onClick = {() => selectMovie(movie.id)}/>
                        </div>
                    );
                })}
            </section>
        </main>

    );
}

export default MovieList;