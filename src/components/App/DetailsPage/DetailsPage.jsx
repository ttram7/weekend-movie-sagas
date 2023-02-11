import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

function DetailsPage() {
    const thisMovie = useSelector(store => store.selectedMovie);
    const history = useHistory();
    console.log(thisMovie)
    console.log('title',thisMovie[0].title)
    
    return (
        <>
            <h3>{thisMovie[0].title}</h3>
            <img src={thisMovie[0].poster} alt={thisMovie[0].title} />
            <p>{thisMovie[0].description}</p>
            <button onClick = {() => history.push('/')}>Back To List</button>
        </>
    )
}
export default DetailsPage;