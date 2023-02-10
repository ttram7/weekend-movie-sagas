import { useHistory } from 'react-router-dom';

function DetailsPage() {
    const history = useHistory();
    
    return (
        <>
            <h1>Hello</h1>
            <button onClick = {() => history.push('/')}>Back To List</button>
        </>
    )
}
export default DetailsPage;