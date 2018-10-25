import React from 'react';

import {Card, CardBody} from "reactstrap";
import {Link} from "react-router-dom";

export default function ViewReview(params) {

    //console.log("view review params", params);

    if(params.params.details) {
        return (
            <div>
                <Link to={"/profile/list"} exact="true">Back to Profile</Link> |&nbsp;
                <Link to={"/viewer/critic"} exact="true">Back to Review List</Link>
                <h3>Review Details</h3>
                <Card>
                    <CardBody>
                        <div>IMDB ID: {params.params.details.imdbID}</div>
                        <div>Title: {params.params.details.Title}</div>
                        <div>Review Title: {params.params.view_review.title}</div>
                        <div>Thoughts: {params.params.view_review.description}</div>
                    </CardBody>
                </Card>
            </div>
        );
    } else {
        return (
            <div>
                <h3>Review Details</h3>
                <Card>
                    <CardBody>
                        <div>IMDB ID: {params.params.props.details.imdbID}</div>
                        <div>Title: {params.params.props.details.Title}</div>
                        <div>Review Title: {params.params.props.view_review.title}</div>
                        <div>Thoughts: {params.params.props.view_review.description}</div>
                    </CardBody>
                </Card>
            </div>
        );
    }

}
