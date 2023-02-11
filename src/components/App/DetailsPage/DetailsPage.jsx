import React, { useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

function DetailsPage() {
    useEffect(() => {
        //dispatch({type: 'FETCH_MOVIE', payload: movieId})
        dispatch({type: 'FETCH_GENRES', payload: movieId})
     }, []);
    // on page load, load selected movie data and genres
    const dispatch = useDispatch();
    const movieId = useSelector(store => store.movieId)
    const thisMovie = useSelector(store => store.selectedMovie);
    const thisGenre = useSelector(store => store.genres);
    const movies = useSelector(store => store.movies);
    const history = useHistory();
    console.log('display selected movie info',thisMovie)
    //console.log('title',thisMovie[0].title)
    console.log('display selected movie genre',thisGenre);
    
    return (
        <>
            {/* <h3>{thisMovie[0].title}</h3>
            <img src={thisMovie[0].poster} alt={thisMovie[0].title} />
            <p>{thisMovie[0].description}</p> */}
            {/* <h3>{thisMovie.title}</h3>
            <img src={thisMovie.poster} alt={thisMovie.title} />
            <p>{thisMovie.description}</p> */}
            <h3>{movies[movieId-1].title}</h3>
            {thisGenre.map(genre => (
                <p>{genre.name}</p>
            ))}
            <img src={movies[movieId-1].poster} alt={movies[movieId-1].title} />
            <p>{movies[movieId-1].description}</p> 
            <button onClick = {() => history.push('/')}>Back To List</button>
        </>
    )
}
export default DetailsPage;