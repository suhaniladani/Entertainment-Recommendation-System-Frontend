import React from 'react';
import Individual from "./individual-details";
import {Link} from 'react-router-dom';
import {Button} from "reactstrap";
import api from "../api";
import swal from "sweetalert";

export default function WatchDetails(params) {
    //console.log("details", params.params.details);
    let props=params.params.details;

    function add() {
        if(params.params.token == null){
            //params.params.dispatch({type: 'ERROR', msg: 'Please login'});
            swal({
                title: "Login Required",
                text: "Please login to use the services!",
                icon: "error",
                button: "OK",
            });
        } else {
            //alert("make api call");
            let id = params.params.token.id;
            let data = {
                imdbid: props.imdbID,
                title: props.Title
            }
            api.add_to_watchlist(id,data);
        }
    }

    if(params.params.token.obj === "Viewer"){
        return(
            <div>
                <Link to={"/profile/list"} exact="true">Back to Profile</Link> |&nbsp;
                <Link to={"/criticList"} exact="true">Critic List</Link>
                <Individual props={props}/>
                <Link to={"/profile/list"} exact={"true"}><Button onClick={add}>Add to Watchlist</Button></Link>
            </div>
        );
     } else if(params.params.token.obj === "Seller") {
        return(
            <div>
                <Link to={"/profile/list"} exact="true">Back to Profile</Link> |&nbsp;
                <Link to={"/criticList"} exact="true">Critic List</Link>
                <Individual props={props}/>
                <Link to={"/profile/list"} exact={"true"}><Button onClick={add}>Add to Watchlist</Button></Link>
                <Link to={"/addBuyingOptions"} exact={"true"}><Button>Add buying option for this movie</Button></Link>
            </div>
        );
    } else if(params.params.token.obj === "Critic") {
        return (
            <div>
                <Link to={"/profile/list"} exact="true">Back to Profile</Link>
                <Individual props={props}/>
                <Link to={"/profile/list"} exact={"true"}><Button onClick={add}>Add to Watchlist</Button></Link>
                <Link to={"/review"} exact={"true"}><Button>Write a review!</Button></Link>
            </div>
        );
    } else {
        return <div>
            <Link to={"/profile/list"} exact="true">Back to List</Link>
            <Individual props={props}/>
        </div>;
    }

}