import React from 'react';
import _ from "underscore";
import {Link} from "react-router-dom";
import api from '../api';

export default function ReviewDetails(props) {

   // console.log("movie reviews",props.props.movie_review);
    let list = props.props.movie_review;
   // console.log("list of review", list);
    let show = _.map(list, (ll, i) => <Maps key={i} r={ll}/>);

    if(list.length === 0){
        return (
            <div>
                <Link to={"/profile"} exact="true">Back to Profile</Link>
                <div>
                    No reviews found for
                </div>
                <div>
                    <b>{props.props.details.Title}</b>
                </div>
            </div>
        )
    } else {
        return (
            <div>
                <Link to={"/profile"} exact="true">Back to Profile</Link>
                <div>
                    Reviews for
                </div>
                <div>
                    <b>{props.props.details.Title}</b>
                </div>
                { show }
            </div>
        )
    }
}

function Maps(props) {
    //console.log("critic object",props.r.critic.firstName);
    //console.log("critic object",props.r.movie.title);
    function getCritic(){
        //console.log("critic id", props.r.critic.id);
        api.get_critic_reviews(props.r.critic.id);
        //api.get_user_follows_critic(props.props.token.id);
    }

    if(props.r.movie && props.r.critic){
        return (
            <div>
                <ul>
                    <li>
                        Title:{props.r.movie.title}
                    </li>
                    <li>
                        <Link to={"/viewer/critic"} onClick={getCritic}>
                            Critic:{props.r.critic.firstName}
                        </Link>
                    </li>
                    <li>
                        Details: {props.r.description}
                    </li>
                </ul>
            </div>
        );
    } else {
        return (
            <div>
                Details: {props.r.description}
            </div>
        );
    }
}