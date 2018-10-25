import React from 'react';
import {Button} from 'reactstrap';
import {Link} from 'react-router-dom';

import api from '../api';
import Individual from './individual-details';

export default function AdminMovie(props) {
    //console.log("props movies admin", props);

    function deleteMovie() {
        api.delete_movie(props.props.details.imdbID);
    }

    return <div>
        <Individual props={props.props.details}/>
        <Link to={"/system"}>
            <Button className="btn btn-danger" onClick={deleteMovie}>Delete Movie</Button>
        </Link>
    </div>;
}