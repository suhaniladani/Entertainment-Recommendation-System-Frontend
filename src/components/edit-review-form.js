import React from 'react';
import $ from "jquery";
import { Button, FormGroup, Label, Input } from 'reactstrap';
import { connect } from 'react-redux';
import {Link} from "react-router-dom";
import api from '../api';
import swal from "sweetalert";

function EditReviewForm(params) {

    function update(ev) {
        let tgt = $(ev.target);

        let data = {};
        data[tgt.attr('name')] = tgt.val();
        //console.log("data",data);
        let action = {
            type: 'UPDATE_REVIEW_FORM',
            data: data,
        };
        //console.log("update action",action);
        params.dispatch(action);
    }

    function edit() {
        if(params.params.review_form.description===""){
            //params.dispatch({type: 'ERROR', msg: 'Please enter some thoughts'});
            swal("All fields are mandatory", "Please try again", "warning");
        } else {
            //console.log("link", params.params.review_form.description);
            //api.add_link(params.params.token.id,params.params.details.imdbID,params.params.link.data);
            api.edit_review(params.params.token.id, params.params.review_form.id,
                params.params.review_form.title, params.params.review_form.description);
            api.get_watchlist(params.params.token.id);

        }
    }

    function adminEdit(){
        if(params.params.review_form.description===""){
            //params.dispatch({type: 'ERROR', msg: 'Please enter some thoughts'});
            swal("All fields are mandatory", "Please try again", "warning");
        } else {
            //console.log("link", params.params.review_form.description);
            //api.add_link(params.params.token.id,params.params.details.imdbID,params.params.link.data);
            api.edit_review_by_admin(params.params.review_form.id,
                params.params.review_form.title, params.params.review_form.description);
            //api.get_watchlist(params.params.token.id);

        }
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

    if(params.params.review_form.description==="" ) {
        return (
            <div>
                <h3>Edit Review</h3>
                <FormGroup>
                    <FormGroup>
                        <Label for="imdbid">IMDB ID: </Label>
                        <Input type="hidden" name="imdbid"/>
                        <span>{params.params.details.imdbID}</span>
                    </FormGroup>
                    <FormGroup>
                        <Label for="title">Title: </Label>
                        <Input type="hidden" name="title"/>
                        <span>{params.params.details.Title}</span>
                    </FormGroup>
                    <FormGroup>
                        <Label for="title">Review Title</Label>
                        <Input type="text" name="title" placeholder="Title"
                               value={params.params.review_form.title} onChange={update}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="description">Buying Link</Label>
                        <Input type="textarea" name="description" placeholder="My thoughts"
                               value={params.params.review_form.description} onChange={update}/>
                    </FormGroup>
                    <Button onClick={edit} type="button" className="btn btn-primary">Edit</Button>
                </FormGroup>
            </div>
        );
    } else {
        return (
            <div>
                <h3>Edit Review</h3>
                <FormGroup>
                    <FormGroup>
                        <Label for="imdbid">IMDB ID: </Label>
                        <Input type="hidden" name="imdbid"/>
                        <span>{params.params.details.imdbID}</span>
                    </FormGroup>
                    <FormGroup>
                        <Label for="title">Title: </Label>
                        <Input type="hidden" name="title"/>
                        <span>{params.params.details.Title}</span>
                    </FormGroup>
                    <FormGroup>
                        <Label for="title">Review Title</Label>
                        <Input type="text" name="title" placeholder="Title"
                               value={params.params.review_form.title} onChange={update}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="description">Thoughts</Label>
                        <Input type="textarea" name="description" placeholder="My thoughts"
                               value={params.params.review_form.description} onChange={update}/>
                    </FormGroup>
                    {button}
                </FormGroup>
            </div>
        );
    }
}

function state2props(state) {
    //console.log("rerender", state);
    return { review_form: state.review_form };
}

export default connect(state2props)(EditReviewForm);