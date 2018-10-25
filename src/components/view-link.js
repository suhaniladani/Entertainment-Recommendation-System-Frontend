import React from 'react';

import {Card, CardBody} from "reactstrap";
import {Link} from "react-router-dom";

export default function ViewLink(params) {

    //console.log("view params", params);

    if(params.params.details) {
        return (
            <div>
                <Link to={"/profile/list"} exact="true">Back to List</Link>
                <h3>Link Details</h3>
                <Card>
                    <CardBody>
                        <div>IMDB ID: {params.params.details.imdbID}</div>
                        <div>Title: {params.params.details.Title}</div>
                        <div>Buy Link: <a href={params.params.link.link} target="_blank">{params.params.link.link}</a>
                        </div>
                    </CardBody>
                </Card>
            </div>
        );
    } else {
        return <div>
            <h3>Link Details</h3>
            <Card>
                <CardBody>
                    <div>IMDB ID: {params.params.props.details.imdbID}</div>
                    <div>Title: {params.params.props.details.Title}</div>
                    <div>Buy Link: <a href={params.params.props.link.link} target="_blank">{params.params.props.link.link}</a>
                    </div>
                </CardBody>
            </Card>
        </div>;
    }
}
