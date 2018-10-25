import React from 'react';
import _ from 'underscore';
import {Button} from 'reactstrap';
import {Link} from 'react-router-dom';
import api from '../api';

export default function Admin(props) {

    //console.log("admin props", props);

    function clear(){
        props.props.dispatch({type:'CLEAR_REGISTER_FORM'});
    }

    let person = props.props.person_list;

    let disp_person = _.map(person, (kk, i) => <Person person={kk} key={i} token={props.props.token}/>);

    let movies = props.props.movie_list;

    let disp_movie = _.map(movies, (mm, i) => <Movie movie={mm} key={i}/>);

    let links = props.props.link_list;

    let disp_link = _.map(links, (ll, i) => <Links link={ll} key={i}/>);

    let reviews = props.props.review_list;

    let disp_review = _.map(reviews, (rr, i) => <Review review={rr} key={i}/>);

    return <div>
        <div>
            <Link to={"/system/createUser"}>
                <Button className="btn btn-primary" onClick={clear}>Create New User</Button>
            </Link>
        </div>
        <div>
            <div className="admin-table"> List of users </div>
            <table>
                <tbody>
            {disp_person}
                </tbody>
            </table>
        </div>
        <div>
            <div className="admin-table"> List of Movies </div>
            <table>
                <tbody>
            {disp_movie}
                </tbody>
            </table>
        </div>
        <div>
            <div className="admin-table"> List of Links </div>
            <table>
            <tbody>
            {disp_link}
            </tbody>
            </table>
        </div>
        <div>
            <div className="admin-table"> List of Reviews </div>
            <table>
            <tbody>
            {disp_review}
            </tbody>
            </table>
        </div>
    </div>;
}

function Person(props) {
    //console.log("person props", props);

    function getPerson() {
        //console.log("person id", props.person.id);
        api.find_user(props.person.id);
    }

    return (
            <tr>
                <td width="200">
            {props.person.firstName}
                </td>
                <td width="200">
            <Link to={"/system/user"}>
                <Button className="btn btn-info" onClick={getPerson}>View</Button>
            </Link>
                </td>
            </tr>
    );
}

function Movie(props) {
    //console.log("movie props", props);

    function getMovie() {
        api.get_details(props.movie.imdbid);
    }

    return (
        <tr>
            <td width="200">
            {props.movie.title}
            </td>
            <td width="200">
            <Link to={"/system/movie"}>
                <Button className="btn btn-info" onClick={getMovie}>View</Button>
            </Link>
            </td>
        </tr>
    );
}

function Links(props) {
    //console.log("link props", props);

    function getLink() {
        api.get_link(props.link.id);
        api.get_details(props.link.movie.imdbid);
    }

    return (
        <tr>
            <td width="200">
            {props.link.link}
            </td>
            <td width="200">
            <Link to={"/system/link"}>
                <Button className="btn btn-info" onClick={getLink}>View</Button>
            </Link>
            </td>
        </tr>
    );
}

function Review(props) {
    //console.log("review props", props);

    function getReview() {
        api.get_review(props.review.id);
        api.get_details(props.review.movie.imdbid);
    }

    return (
        <tr>
            <td width="200">
            {props.review.title}
            </td>
            <td width="200">
            <Link to={"/system/review"}>
                <Button className="btn btn-info" onClick={getReview}>View</Button>
            </Link>
            </td>
        </tr>
    );
}