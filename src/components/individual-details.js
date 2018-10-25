import React from 'react';
import {Card} from "reactstrap";
import {CardBody} from "reactstrap";
import {CardTitle} from "reactstrap";


export default function Individual(props){
    //console.log("inside individual", props);


    return(
        <div>
            <Card>
                <CardBody>
                    <CardTitle>
                        {props.props.Title}
                    </CardTitle>
                    <div>
                        <img src={props.props.Poster} alt="Poster" className="float-right"/>
                        <ul>
                            <li>
                                Plot: {props.props.Plot}
                            </li>
                            <li>
                                Actors: {props.props.Actors}
                            </li>
                            <li>
                                Director: {props.props.Director}
                            </li>
                            <li>
                                Writer: {props.props.Writer}
                            </li>
                            <li>
                                Genre: {props.props.Genre}
                            </li>
                            <li>
                                Runtime: {props.props.Runtime}
                            </li>
                            <li>
                                Released: {props.props.Released}
                            </li>
                            <li>
                                Imdb Rating: {props.props.imdbRating}
                            </li>
                            <li>
                                Imdb Votes: {props.props.imdbVotes}
                            </li>
                            <li>
                                Awards: {props.props.Awards}
                            </li>
                        </ul>
                    </div>
                </CardBody>
            </Card>
        </div>);
}