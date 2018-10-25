import React from 'react';
import _ from 'underscore';
import api from '../api';
import {Link} from 'react-router-dom';

export default function CriticList(props) {

    let disp = props.props.critics;

    let map = _.map(disp, (cc, i) => <Show c={cc} key={i}/>);

    return <div>
        List of critics:
        {map}
    </div>;
}

function Show(props) {

    function getReviews() {
        api.get_critic_reviews(props.c.id);
        api.get_critic_object(props.c.id);
    }

    return <div>
        <Link to={"/viewer/critic"} onClick={getReviews}>
            {props.c.firstName} {props.c.lastName}
        </Link>
    </div>
}