import React, { useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

// on page load, load selected movie data and genres
function DetailsPage() {
    useEffect(() => {
        dispatch({type: 'FETCH_MOVIE', payload: movieId})
        dispatch({type: 'FETCH_GENRES', payload: movieId})
     }, []);
    
    const dispatch = useDispatch()
    const history = useHistory();

    const movieId = useSelector(store => store.movieId)
    const thisMovie = useSelector(store => store.selectedMovie);
    const thisGenre = useSelector(store => store.genres);
    
    console.log('display selected movie info',thisMovie)
    console.log('display selected movie genre',thisGenre);
    
    return (
        <section className="movie">
            {thisMovie.map(movie => (
                <>
                    <h3>{movie.title}</h3>
                    {thisGenre.map(genre => (
                        <p>{genre.name}</p>
                    ))}
                    <img src={movie.poster} alt={movie.title} />
                    <p>{movie.description}</p>
                </>
            ))}
            <button onClick = {() => history.push('/')}>Back To List</button>
        </section>
    )
}
export default DetailsPage;