import React, { useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom'; 
import './MovieList.css'

import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'

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
        dispatch({type: 'STORE_ID', payload: movieId })
        //dispatch({type: 'FETCH_MOVIE', payload: movieId});
        // if (thisMovie.length === 1) {
        //     history.push('/details');
        // }
        history.push('/details');
        
    }
    console.log(movies);
    return (
        <main>
            <h1>MovieList</h1>
            <section className="movies">
            <Grid container>
                {movies.map(movie => {
                    return (
                        <Grid item key={movie.id} >
                            <Card>
                                <h3>{movie.title}</h3>
                                <img src={movie.poster} alt={movie.title} onClick = {() => selectMovie(movie.id)}/>
                            </Card>
                        </Grid>
                    );
                })}
            </Grid>
            </section>
        </main>

    );
}

export default MovieList;