import React from 'react';

import {Card, CardBody, Button} from 'reactstrap';

import {Link} from 'react-router-dom';

import _ from 'underscore';

import api from '../api';
import Cookies from "universal-cookie";
import swal from "sweetalert";

export default function ShowResults(params){

    let current_page = params.params.page.page;
    //let cookies = new Cookies();

    function prev_ten() {
        //console.log(params.params.page.page);
        if (current_page === 1){
            params.params.dispatch({type: 'ERROR', msg: 'This is the first page'});
        }
        else {
            //cookies.set('search', params.params.search_tab.search);
            //cookies.set('page', current_page - 1);
            api.search_request(params.params.search_tab.search , current_page - 1);
        }

    }

    function next_ten() {
        //console.log(params.params.page.page);
       // console.log(fir.totalResults);

        let next_pages = Math.round(fir.totalResults/10);
        //console.log(next_pages);

        if (current_page >= next_pages){
            params.params.dispatch({type: 'ERROR', msg: 'No more pages to show'});
        }
        else {
            //cookies.set('search', params.params.search_tab.search);
            // cookies.set('page', current_page + 1);
            api.search_request(params.params.search_tab.search , current_page + 1);
        }
    }

    //console.log("inside show results",params);
    let fir = params.params.results;
    //console.log("first element",fir);
    let arr = fir.Search;
    //console.log(arr);

    let res = _.map(arr, (nn, i) => <Result key={i} result={nn} />);

    if(fir.results === "") {
        return <div className="col">
            {res}
        </div>;
    } else {
        if (fir.Response === "False") {
            params.params.dispatch({type: 'CLEAR_SEARCH_TAB'});
            params.params.dispatch({type: 'CLEAR_RESULTS'});
            //params.params.dispatch({type: 'ERROR', msg: 'No movie found!'});
            swal({
                title: "No sugestions found",
                text: "Please enter a different keyword to search!",
                icon: "warning",
                button: "OK",
            });
            return <div>
                <p>No results found, try a different search keyword!</p>
            </div>;
        }
        else {
            return <div className="col">
                {res}
                <Button onClick={prev_ten}>&laquo; Previous</Button>
                <Button onClick={next_ten}>Next &raquo;</Button>
            </div>;
        }
    }
}

function Result(params){

    function details() {
        let cookie = new Cookies();
        cookie.set('imdb', params.result.imdbID);
        api.get_details(params.result.imdbID);
    }

    //console.log(params);
    return <Card>
        <CardBody>
            <div>
                <p>Title:{params.result.Title}</p>
                <Link to={"/results/"+ params.result.imdbID}><Button onClick={details}>Show Details</Button></Link>
            </div>
        </CardBody>
    </Card>;
}



