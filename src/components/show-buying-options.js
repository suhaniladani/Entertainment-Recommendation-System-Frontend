import React from 'react';
import _ from "underscore";
import {Link} from 'react-router-dom';

export default function BuyingOptions(props) {

    //console.log(props.props.links);
    let list = props.props.links;
    let show = _.map(list, (ll, i) => <Maps key={i} buy={ll}/>);

    if(list.length === 0){
        return (
            <div>
                <Link to={"/profile"} exact="true">Back to List</Link>
                <div>
                    No buying options found for
                </div>
                <div>
                    <b>{props.props.details.Title}</b>
                </div>
            </div>
        )
    } else {
        return (
            <div>
                <Link to={"/profile"} exact="true">Back to List</Link>
                <div>
                    Buying options for
                </div>
                <div>
                    <b>{props.props.details.Title}</b>
                </div>
                <div>
                { show }
                </div>
            </div>
        )
    }
}

function Maps(props) {
    //console.log(props);
    return(
        <div>
            <a href="props.buy.link" target="_blank">{props.buy.link}</a>
        </div>
    );
}