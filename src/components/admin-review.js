import React from 'react';
import {Button} from 'reactstrap';
import {Link} from 'react-router-dom';

import api from '../api';
import ViewReview from './view-review';

export default function AdminReview(props){
    
    function edit() {
        api.get_review(props.props.view_review.id);
        api.get_details(props.props.view_review.movie.imdbid);
    }
    
    function deleteReview() {
        api.delete_review_by_admin(props.props.view_review.id);
    }

    return <div>
        <ViewReview params={props}/>
        <div>
            <Link to={"/system/review/edit"}>
                <Button className="btn btn-primary" onClick={edit}>Edit Review</Button>
            </Link>
        </div>
        <div>
            <Link to={"/system"}>
                <Button className="btn btn-danger" onClick={deleteReview}>Delete Review</Button>
            </Link>
        </div>
    </div>;
}