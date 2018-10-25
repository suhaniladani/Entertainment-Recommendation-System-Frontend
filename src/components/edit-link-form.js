import React from 'react';
import $ from "jquery";
import { Button, FormGroup, Label, Input } from 'reactstrap';
import { connect } from 'react-redux';
import {Link} from "react-router-dom";
import api from '../api';
import swal from "sweetalert";

function EditLinkForm(params) {

    function update(ev) {
        let tgt = $(ev.target);

        let data = {};
        data[tgt.attr('name')] = tgt.val();
        //console.log("data",data);
        let action = {
            type: 'UPDATE_BUY_FORM',
            data: data,
        };
        //console.log("update action",action);
        params.dispatch(action);
    }

    function edit() {
        if(params.params.link.link===""){
            //params.dispatch({type: 'ERROR', msg: 'Please enter valid link'});
            swal("All fields are mandatory", "Please try again", "warning");
        } else if(!isUrl(params.params.link.link)){
            //params.dispatch({type: 'ERROR', msg: 'Please enter valid link'});
            swal("Invalid Link", "Please try again", "warning");
        } else {
            //console.log("link", params.params.link.link);
            //api.add_link(params.params.token.id,params.params.details.imdbID,params.params.link.data);
            api.edit_link(params.params.token.id, params.params.link.id, params.params.link.link);
            api.get_watchlist(params.params.token.id);

        }
    }

    function adminEdit() {
        if(params.params.link.link===""){
            //params.dispatch({type: 'ERROR', msg: 'Please enter valid link'});
            swal("All fields are mandatory", "Please try again", "warning");
        } else if(!isUrl(params.params.link.link)){
            //params.dispatch({type: 'ERROR', msg: 'Please enter valid link'});
            swal("Invalid Link", "Please try again", "warning");
        } else {
            //console.log("link", params.params.link.link);
            //api.add_link(params.params.token.id,params.params.details.imdbID,params.params.link.data);
            api.edit_link_by_admin(params.params.link.id, params.params.link.link);

        }
    }

    // function isUrlValid(userInput) {
    //     var res = userInput.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
    //     if(res == null)
    //         return false;
    //     else
    //         return true;
    // }

    // function assign(link){
    //     alert("inside assign");
    //     let action = {
    //         type: 'UPDATE_BUY_FORM',
    //         data: {data: link}
    //     };
    //     params.dispatch(action);
    // }

    //let link = params.params.edit_link.link;

    // if(params.params.link.data===""){
    //     console.log("link", link);
    //     let action = {
    //         type: 'UPDATE_BUY_FORM',
    //     };
    //     params.dispatch(action);
    // }

    function isUrl(s) {
        var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?/
        return regexp.test(s);
    }

    let button;

    if(params.params.token.obj === "Admin"){
        button = <Link to={"/system"} exact="true">
            <Button onClick={adminEdit} type="button" className="btn btn-primary">Edit</Button>
        </Link>;
    } else {
        button = <Link to={"/profile"} exact="true">
            <Button onClick={edit} type="button" className="btn btn-primary">Edit</Button>
        </Link>;
    }

    if(params.params.link.link==="" || !isUrl(params.params.link.link) ) {
        return (
            <div>
                <h3>Edit Link</h3>
                <FormGroup>
                    <FormGroup>
                        <Label for="imdbid">IMDB ID:</Label>
                        <Input type="hidden" name="imdbid"/>
                        <span>{params.params.details.imdbID}</span>
                    </FormGroup>
                    <FormGroup>
                        <Label for="title">Title:</Label>
                        <Input type="hidden" name="title"/>
                        <span>{params.params.details.Title}</span>
                    </FormGroup>
                    {/*<FormGroup>*/}
                        {/*<Label for="link">Buying Link:</Label>*/}
                        {/*<Input type="text" name="link" placeholder="link"*/}
                               {/*value={params.link.link} onChange={update}/>*/}
                    {/*</FormGroup>*/}
                    <FormGroup>
                        <div className="input-group">
                            <div className="input-group-addon">
                                <span className="glyphicon glyphicon-link"></span>
                            </div>
                            <Input type="text" id="link" name="link" placeholder="Link"
                                   value={params.link.link} onChange={update}/>
                        </div>
                    </FormGroup>
                    <Button onClick={edit} type="button" className="btn btn-primary">Edit</Button>
                </FormGroup>
            </div>
        );
    } else {
        return (
            <div>
                <h3>Edit Link</h3>
                <FormGroup>
                    <FormGroup>
                        <Label for="imdbid">IMDB ID:</Label>
                        <Input type="hidden" name="imdbid"/>
                        <span>{params.params.details.imdbID}</span>
                    </FormGroup>
                    <FormGroup>
                        <Label for="title">Title:</Label>
                        <Input type="hidden" name="title"/>
                        <span>{params.params.details.Title}</span>
                    </FormGroup>
                    {/*<FormGroup>*/}
                        {/*<Label for="link">Buying Link:</Label>*/}
                        {/*<Input type="text" name="link" placeholder="link"*/}
                               {/*value={params.link.link} onChange={update}/>*/}
                    {/*</FormGroup>*/}
                    <FormGroup>
                        <div className="input-group">
                            <div className="input-group-addon">
                                <span className="glyphicon glyphicon-link"></span>
                            </div>
                            <Input type="text" id="link" name="link" placeholder="Link"
                                   value={params.link.link} onChange={update}/>
                        </div>
                    </FormGroup>
                    {button}
                </FormGroup>
            </div>
        );
    }
}

function state2props(state) {
    //console.log("rerender", state);
    return { link: state.link };
}

export default connect(state2props)(EditLinkForm);