import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

function DetailsPage() {
    // useEffect(() => {
    //     dispatch({type: 'DISPLAY_DETAILS', payload: movieId});
    // }, []);
    // on page load, load selected movie data and genres

    const thisMovie = useSelector(store => store.selectedMovie);
    const thisGenre = useSelector(store => store.genres);
    const history = useHistory();
    console.log('display selected movie info',thisMovie)
    //console.log('title',thisMovie[0].title)
    console.log('display selected movie genre',thisGenre);
    
    return (
        <>
            <h3>{thisMovie.title}</h3>
            <img src={thisMovie.poster} alt={thisMovie.title} />
            <p>{thisMovie.description}</p>
            <button onClick = {() => history.push('/')}>Back To List</button>
        </>
    )
}
export default DetailsPage;