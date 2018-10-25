import React from 'react';

import { Button } from 'reactstrap';
import {Link} from 'react-router-dom';
import api from "../api";
import Cookies from "universal-cookie";
import Individual from "./individual-details";

export default function RecDetails(params) {
    //console.log("details", params.params.details);
    let props;
    let cookie = new Cookies();
    //let imdb = cookie.get('imdb');
    //console.log("imdb from cookie", imdb);
    // if(params.params.details.details === ""){
    //     //let cookie = new Cookies();
    //     let imdb = cookie.get('imdb');
    //     console.log("imdb from cookie", imdb);
    //     api.get_details(imdb);
    //     props = params.params.details;
    // } else {
    //     console.log("going to else");
    //     //api.get_details(imdb);
    props=params.params.details;
    //}


    function add() {
        if(params.params.token == null){
            params.params.dispatch({type: 'ERROR', msg: 'Please login'});
        } else {
            //alert("make api call");
            let id = cookie.get('id');
            let data = {
                imdbid: props.imdbID,
                title: props.Title
            }
            api.add_to_watchlist(id,data);
        }
    }

    // function buying_option() {
    //     if(params.params.token == null){
    //         params.params.dispatch({type: 'ERROR', msg: 'Please login'});
    //     } else {
    //         //alert("make api call");
    //         let id = cookie.get('id');
    //         let data = {
    //             imdbid: props.imdbID,
    //             title: props.Title
    //         }
    //         //api.add_to_watchlist(id,data);
    //     }
    // }

    function submit() {
        //let cookies = new Cookies();
        //let search = cookie.get('search');
        //let page = cookie.get('page');
        api.search_request(params.params.search_tab.search , params.params.page.page);
    }

    function recommend() {

    }

    if(params.params.token == null){
        return(
            <div>
                <Link to="/results"><Button onClick={submit}>Back to List</Button></Link>
                <Individual props={props}/>
                <p>To add to watchlist, please login!</p>
            </div>
        );} else if(params.params.token.obj === "Viewer") {
        return(
            <div>
                <Link to="/recommendations"><Button onClick={recommend}>Back to Recommendations</Button></Link>
                <Individual props={props}/>
                <Link to={"/profile/list"} exact={"true"}><Button onClick={add}>Add to Watchlist</Button></Link>
            </div>
        );
    } else if(params.params.token.obj === "Seller"){
        return(
            <div>
                <Link to="/recommendations"><Button onClick={recommend}>Back to Recommendations</Button></Link>
                <Individual props={props}/>
                <Link to={"/profile/list"} exact={"true"}><Button onClick={add}>Add to Watchlist</Button></Link>
                <Link to={"/addBuyingOptions"} exact={"true"}><Button>Add buying option for this movie</Button></Link>
            </div>
        );
    } if(params.params.token.obj === "Critic"){
        return(
            <div>
                <Link to="/recommendations"><Button onClick={recommend}>Back to Recommendations</Button></Link>
                <Individual props={props}/>
                <Link to={"/profile/list"} exact={"true"}><Button onClick={add}>Add to Watchlist</Button></Link>
                <Link to={"/review"} exact={"true"}><Button>Write a review!</Button></Link>
            </div>
        );
    }
}