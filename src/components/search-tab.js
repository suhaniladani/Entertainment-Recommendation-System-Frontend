import React from 'react';

import { connect } from 'react-redux';
import { Button, FormGroup, Label, Input } from 'reactstrap';

import { Link } from 'react-router-dom';

import $ from 'jquery';
import api from '../api';
import Cookies from 'universal-cookie';

import swal from 'sweetalert';

function SearchTab(params) {

    function update(ev) {
        let tgt = $(ev.target);

        let data = {};
        data[tgt.attr('name')] = tgt.val();
        //console.log("data",data);
        let action = {
            type: 'UPDATE_SEARCH_TAB',
            data: data,
        };
        //console.log(action);
        params.dispatch(action);

    }

    function submit() {
        let cookies = new Cookies();
        if(params.search_tab.search === ""){
            //params.dispatch({type: 'ERROR', msg: 'Please enter a keyword to search!'});
            swal({
                title: "No KEYWORD!",
                text: "Please enter a movie or TV show to search",
                icon: "error",
                button: "OK",
            });
        } else if(params.search_tab.search){
            //cookies.set('search', params.search_tab.search);
            //cookies.set('page', 1);
            cookies.set('search', params.search_tab.search);
            //console.log("cookie set");
            //let data = params.search_tab.search;
            //params.dispatch({type:'SET_SEARCH_TOKEN', data: data});
            api.search_request(params.search_tab.search, 1);
            //params.dispatch({type:'CLEAR_SEARCH_TAB'});
        } else {
            //let search = cookies.get('search');
            //console.log("should make api query to omdb");
            //params.dispatch({type:'SET_SEARCH_TOKEN', data: search});
            api.search_request(params.search_token, 1);
            //console.log(params.search_tab);
        }
    }

    function reload() {
        //window.location.reload();
        params.params.dispatch({type: 'CLEAR_SEARCH_TAB'});
        params.params.dispatch({type: 'CLEAR_RESULTS'});
        params.params.dispatch({type: 'CLEAR_DETAILS'});
    }

    function getList(){
        api.get_person_list();
        api.get_movie_list();
        api.get_link_list();
        api.get_review_list();
    }

    let button;

    if(params.search_tab.search === ""){
        button = <Button onClick={submit} color="primary"><i className="fa fa-search"></i></Button>;
    } else {
        button = <Link to={"/results"} exact="true">
            <Button onClick={submit} color="primary"><i className="fa fa-search"></i>
            </Button></Link>;
    }

    //console.log("serach tab params", params);

    if(params.params.token){

        if(params.params.token.obj === "Admin"){
            return <div>
                <Link to={"/system"} exact="true" onClick={getList}>System Administration</Link>
            </div>;
        } else {
            return <div style={{padding: "4ex"}} className="image-div">
                <h2>Search Tab</h2>
                <Link to="/" exact="true"><Button onClick={reload}>Start Again?</Button></Link>
                <FormGroup>
                    <Label for="search"></Label>
                    <Input type="text" name="search" value={params.search_tab.search} onChange={update}
                           placeholder="Search for movies and TV shows"/>
                </FormGroup>
                {button}
            </div>;
        }

    } else {
        return <div style={{padding: "4ex"}} className="image-div">
            <h2>Search Tab</h2>
            <Link to="/" exact="true"><Button onClick={reload}>Start Again?</Button></Link>
            <FormGroup>
                <Label for="search"></Label>
                <Input type="text" name="search" value={params.search_tab.search} onChange={update}
                       placeholder="Search for movies and TV shows"/>
            </FormGroup>
            {button}
        </div>;
    }
}

function state2props(state) {
    //console.log("rerender", state);
    return { search_tab: state.search_tab };
}

export default connect(state2props)(SearchTab);