import React from 'react';
import $ from "jquery";
import { Button, FormGroup, Label, Input } from 'reactstrap';
import { connect } from 'react-redux';
import {Link} from "react-router-dom";
import api from '../api';
import swal from "sweetalert";

function AddBuyLink(params) {

    function update(ev) {
        let tgt = $(ev.target);

        let data = {};
        data[tgt.attr('name')] = tgt.val();
        //("data",data);
        let action = {
            type: 'UPDATE_BUY_FORM',
            data: data,
        };
        //console.log("update action",action);
        params.dispatch(action);
    }

    function add_link() {
        if(params.params.link.data===""){
            //params.dispatch({type: 'ERROR', msg: 'Please enter valid link'});
            swal("All fields are mandatory", "Please try again", "warning");
        } else if(!isUrl(params.params.link.data)){
            //params.dispatch({type: 'ERROR', msg: 'Please enter valid link'});
            swal("Invalid Link", "Please try again", "warning");
        }
        else {
            //console.log("link", params.params.link.data);
            api.add_link(params.params.token.id,params.params.details.imdbID,params.params.link.data);
        }
    }

    function isUrl(s) {
        var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?/
        return regexp.test(s);
    }

    // function isUrlValid(userInput) {
    //     var res = userInput.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
    //     if(res == null)
    //         return false;
    //     else
    //         return true;
    // }

    if(params.params.link.data==="" ||
    !isUrl(params.params.link.data)) {
        return (
            <div>
                <FormGroup>
                    <FormGroup>
                        <Label for="imdbid">IMDB ID:</Label>
                        <Input type="hidden" name="imdbid" value={params.params.details.imdbID}/>
                        <span>{params.params.details.imdbID}</span>
                    </FormGroup>
                    <FormGroup>
                        <Label for="title">Title:</Label>
                        <Input type="hidden" name="title" value={params.params.details.Title}/>
                        <span>{params.params.details.Title}</span>
                    </FormGroup>
                    {/*<FormGroup>*/}
                        {/*<Label for="data">Buying Link:</Label>*/}
                        {/*<Input type="text" name="data" placeholder="link"*/}
                               {/*value={params.link.data} onChange={update}/>*/}
                    {/*</FormGroup>*/}
                    <FormGroup>
                        <div className="input-group">
                            <div className="input-group-addon">
                                <span className="glyphicon glyphicon-link"></span>
                            </div>
                            <Input type="text" id="data" name="data" placeholder="Link"
                                   value={params.link.data} onChange={update}/>
                        </div>
                    </FormGroup>
                        <Button onClick={add_link} type="button" className="btn btn-primary">Add</Button>
                </FormGroup>
            </div>
        );
    } else {
        return (
            <div>
                <FormGroup>
                    <FormGroup>
                        <Label for="imdbid">IMDB ID:</Label>
                        <Input type="hidden" name="imdbid" value={params.params.details.imdbID}/>
                        <span>{params.params.details.imdbID}</span>
                    </FormGroup>
                    <FormGroup>
                        <Label for="title">Title:</Label>
                        <Input type="hidden" name="title" value={params.params.details.Title}/>
                        <span>{params.params.details.Title}</span>
                    </FormGroup>
                    {/*<FormGroup>*/}
                        {/*<Label for="data">Buying Link:</Label>*/}
                        {/*<Input type="text" name="data" placeholder="link"*/}
                               {/*value={params.link.data} onChange={update}/>*/}
                    {/*</FormGroup>*/}
                    <FormGroup>
                        <div className="input-group">
                            <div className="input-group-addon">
                                <span className="glyphicon glyphicon-link"></span>
                            </div>
                            <Input type="text" id="data" name="data" placeholder="Link"
                                   value={params.link.data} onChange={update}/>
                        </div>
                    </FormGroup>
                    <Link to={"/profile"} exact={"true"}>
                        <Button onClick={add_link} type="button" className="btn btn-primary">Add</Button>
                    </Link>
                </FormGroup>
            </div>
        );
    }
}

function state2props(state) {
    //console.log("rerender", state);
    return { link: state.link };
}

export default connect(state2props)(AddBuyLink);