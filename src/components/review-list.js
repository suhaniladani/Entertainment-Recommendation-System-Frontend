import React from 'react';
import _ from "underscore";
//import Cookies from "universal-cookie";
import api from "../api";
import { Card } from "reactstrap";
import { CardBody } from "reactstrap";
import {Link} from "react-router-dom";
import {Button} from "reactstrap";


export default function List(props) {
    //console.log("props", props);

    let rlist = props.props.critic_review;

    //let crtiticlist = props.props.critics;
    //let fc;

    let first;

    function follow() {
        //console.log(first.critic.id);
        api.follow(props.props.token.id,first.critic.id, props.props.token.obj);
        if(props.props.token.obj === "Critic"){
            api.get_followers_critic(props.props.token.id);
            api.get_user_follows_critic(props.props.token.id);
        }
    }

    function unfollow() {
        //console.log("unfollow");
        api.unfollow(props.props.token.id,first.critic.id, props.props.token.obj);
        if(props.props.token.obj === "Critic"){
            api.get_followers_critic(props.props.token.id);
            api.get_user_follows_critic(props.props.token.id);
        }
    }

    function follow1() {
        //console.log(first.id);
        api.follow(props.props.token.id,first.id, props.props.token.obj);
        if(props.props.token.obj === "Critic"){
            api.get_followers_critic(props.props.token.id);
            api.get_user_follows_critic(props.props.token.id);
        }
    }

    function unfollow1() {
        //console.log("unfollow");
        api.unfollow(props.props.token.id,first.id, props.props.token.obj);
        if(props.props.token.obj === "Critic"){
            api.get_followers_critic(props.props.token.id);
            api.get_user_follows_critic(props.props.token.id);
        }
    }


    if(rlist.length > 0) {
        first = _.first(rlist);
        let rdisp = _.map(rlist, (ss, i) => <Result2 key={i} reviewlist={ss}/>);
        //console.log("first review", first);

        let followList = props.props.user_follows;
        let button;

        let found = _.find(followList, function (o) {
            return o.id === first.critic.id
        });

        if (typeof found === "undefined") {
            //console.log("not found");
            button = <Link to={"/profile"}>
                <Button onClick={follow} className="btn btn-primary">Follow</Button>
            </Link>;
        } else {
            //console.log("found");
            button = <Link to={"/profile"}>
                <Button onClick={unfollow} className="btn btn-danger">Unfollow</Button>
            </Link>;
        }

        if (first.critic) {
            return <div>
                <div>
                    <b>{first.critic.firstName}'s Reviews</b>
                </div>
                {button}
                {rdisp}
            </div>;
        } else {
            return <div>
                loading
            </div>;
        }
    } else if(rlist.length === 0) {
    first = props.props.critic_object;
    let rdisp =  _.map(rlist, (ss, i) => <Result2 key={i} reviewlist={ss}/>);
    //console.log("first review", first);

    let followList = props.props.user_follows;
    let button;

    let found = _.find(followList, function (o) {return o.id === first.id});

    if(typeof found === "undefined" ){
        //console.log("not found");
        button = <Link to={"/profile"}>
            <Button onClick={follow1} className="btn btn-primary">Follow</Button>
        </Link>;
    } else {
        //console.log("found");
        button = <Link to={"/profile"}>
            <Button onClick={unfollow1} className="btn btn-danger">Unfollow</Button>
        </Link>;
    }

    if(first) {
        return <div>
            <div>
                <b>{first.firstName}'s Reviews</b>
            </div>
            {button}
            {rdisp}
        </div>;
    } else {
        return <div>
            loading
        </div>;
    }
    } else {

        return <div>
            No reviews found
        </div>;
    }



}


function Result2(props){
    //let cookie = new Cookies();

    function details() {
        api.get_details(props.reviewlist.movie.imdbid);
    }

    // function deleteFromReviews(){
    //     let id = cookie.get('id');
    //     api.delete_review(id, props.reviewlist.id);
    // }

    // function editLink(){
    //     let id = cookie.get('id');
    //     api.get_details(props.sellerlist.movie.imdbid);
    //     api.get_link(props.sellerlist.id);
    // }

    function view(){
        api.get_review(props.reviewlist.id);
        api.get_details(props.reviewlist.movie.imdbid);
    }

    //console.log("inside display",props);
    return <Card>
        <CardBody>
            <div>
                Title:{props.reviewlist.movie.title} &nbsp;
                <Link to={"/profile/list/"+ props.reviewlist.movie.imdbid}>
                    <Button onClick={details} className="btn btn-info">Details</Button>
                </Link> &nbsp;
                <Link to={"/viewReview"}>
                    <Button onClick={view} className="btn btn-info">View Review</Button>
                </Link>
            </div>
        </CardBody>
    </Card>;
}