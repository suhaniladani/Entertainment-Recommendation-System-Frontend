import React from 'react';
import $ from "jquery";
//import swal from 'sweetalert';
//import { Redirect } from 'react-router-dom';

import { Button, Form, FormGroup, Input } from 'reactstrap';
import { connect } from 'react-redux';

import api from '../api';
import {Link} from "react-router-dom";
import swal from "sweetalert";

function EditRegistrationForm(params) {
    //console.log("edit params", params);

    function update(ev) {
        let tgt = $(ev.target);

        let data = {};
        data[tgt.attr('name')] = tgt.val();
        //console.log("data",data);
        let action = {
            type: 'UPDATE_REGISTER_FORM',
            data: data,
        };
        //console.log("update action",action);
        params.dispatch(action);
    }

    function ValidateEmail()
    {
        var re = /^(([^<>()[\]\\.,;:\s@]+(\.[^<>()[\]\\.,;:\s@]+)*)|(.+))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3})|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        //console.log("validating email",re.test(params.register.email));
        return re.test(params.register.email);
    }

    function validatePassword() {
        var pass = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$");
        //console.log("validating password", params.register.password);
        return pass.test(params.register.password);
    }

    let button;
    let button1;

    function register() {

        if(params.register.firstName === "" ||
            params.register.lastName === "" ||
            params.register.email === "" ||
            params.register.password === "" ||
            params.register.retype_password === ""){
            swal("All fields are mandatory", "Please try again", "warning");
        } else if(!(params.register.password === params.register.retype_password)){
            swal("Passwords do not match", "Please try again", "warning");
        } else if(ValidateEmail() === false){
            swal("Invalid email address", "Please try again", "warning");
        } else  if(validatePassword() === false){
            swal("Weak password", "Make sure the password has Minimum 8 characters which includes 1 Uppercase and 1 Number", "warning");
        } else {
            //console.log("sending edit request");
            if(params.props) {
                if (params.props.token.obj === "Admin") {
                    api.edit_user_by_admin(params.props.register.id, params.props.register);
                    params.props.dispatch({type:'CLEAR_REGISTER_FORM'});
                }
            } else {
                api.edit_profile(params.params.token.id, params.params.register);
                params.params.dispatch({type:'CLEAR_REGISTER_FORM'});
            }
           // api.get_watchlist(params.params.token.id);
           // api.get_user_follows_critic(params.params.token.id);
        }
    }

    function validate() {
        if(params.register.firstName === "" ||
            params.register.lastName === "" ||
            params.register.email === "" ||
            params.register.password === "" ||
            params.register.retype_password === ""){
            swal("All fields are mandatory", "Please try again", "warning");
        } else if(!(params.register.password === params.register.retype_password)){
            swal("Passwords do not match", "Please try again", "warning");
        } else if(ValidateEmail() === false){
            swal("Invalid email address", "Please try again", "warning");
        } else  if(validatePassword() === false) {
            swal("Weak password", "Make sure the password has Minimum 8 characters which includes 1 Uppercase and 1 Number", "warning");
        }
    }

    if(params.register.firstName === "" ||
        params.register.lastName === "" ||
        params.register.email === "" ||
        params.register.password === "" ||
        !(params.register.password === params.register.retype_password) ||
        ValidateEmail() === false ||
        validatePassword() === false){
        //console.log("error");
        button = <Button onClick={validate} type="button" className="btn btn-primary">Edit</Button>;
    } else {
        //console.log("sending edit request");
        button =
            <Link to={"/"}>
                <Button onClick={register} type="button" className="btn btn-primary">Edit</Button>
            </Link>;
        //api.edit_profile(params.params.token.id,params.register);
    }

    if(params.register.firstName === "" ||
        params.register.lastName === "" ||
        params.register.email === "" ||
        params.register.password === "" ||
        !(params.register.password === params.register.retype_password) ||
        ValidateEmail() === false ||
        validatePassword() === false){
        //console.log("error");
        button1 = <Button onClick={validate} type="button" className="btn btn-primary">Edit</Button>;
    } else {
        //console.log("sending edit request");
        button1 =
            <Link to={"/system"}>
                <Button onClick={register} type="button" className="btn btn-primary">Edit</Button>
            </Link>;
        //api.edit_profile(params.params.token.id,params.register);
    }

    if(params.params) {
        return (
            <div className="editprofile-form">
                <Form>
                    <label className="editprofile-label">Edit Profile</label>
                    {/*<FormGroup>*/}
                        {/*<Label for="firstName">First Name:</Label>*/}
                        {/*<Input type="text" name="firstName" placeholder="First Name"*/}
                               {/*value={params.register.firstName} onChange={update}/>*/}
                    {/*</FormGroup>*/}

                    <FormGroup>
                        <div className="input-group">
                            <div className="input-group-addon">
                                <span className="glyphicon glyphicon-user"></span>
                            </div>
                            <Input type="text" id="firstName" name="firstName" placeholder="First Name"
                                   value={params.register.firstName} onChange={update}/>
                        </div>
                    </FormGroup>


                    {/*<FormGroup>*/}
                        {/*<Label for="lastName">Last Name:</Label>*/}
                        {/*<Input type="text" name="lastName" placeholder="Last Name"*/}
                               {/*value={params.register.lastName} onChange={update}/>*/}
                    {/*</FormGroup>*/}


                    <FormGroup>
                        <div className="input-group">
                            <div className="input-group-addon">
                                <span className="glyphicon glyphicon-user"></span>
                            </div>
                            <Input type="text" id="lastName" name="lastName" placeholder="Last Name"
                                   value={params.register.lastName} onChange={update}/>
                        </div>
                    </FormGroup>

                    {/*<FormGroup>*/}
                        {/*<Label for="email">Email:</Label>*/}
                        {/*<Input type="email" name="email" placeholder="email"*/}
                               {/*value={params.register.email} onChange={update}/>*/}
                    {/*</FormGroup>*/}


                    <FormGroup>
                        <div className="input-group">
                            <div className="input-group-addon">
                                <span className="glyphicon glyphicon-envelope"></span>
                            </div>
                            <Input type="email" id="email" name="email" placeholder="Email"
                                   value={params.register.email} onChange={update}/>
                        </div>
                    </FormGroup>

                    {/*<FormGroup>*/}
                        {/*<Label for="password">Password: <i>[Min. length 8, 1 Uppercase, 1 Number]</i></Label>*/}
                        {/*<Input type="password" name="password" placeholder="password"*/}
                               {/*value={params.register.password} onChange={update}/>*/}
                    {/*</FormGroup>*/}

                    <FormGroup>
                        <div className="input-group">
                            <div className="input-group-addon">
                                <span className="glyphicon glyphicon-lock"></span>
                            </div>
                            <Input type="password" id="password" name="password" placeholder="Password"
                                   value={params.register.password} onChange={update}/>
                        </div>
                    </FormGroup>


                    {/*<FormGroup>*/}
                        {/*<Label for="retype_password">Re-Type Password:</Label>*/}
                        {/*<Input type="password" name="retype_password" placeholder="retype password"*/}
                               {/*value={params.register.retype_password} onChange={update}/>*/}
                    {/*</FormGroup>*/}


                    <FormGroup>
                        <div className="input-group">
                            <div className="input-group-addon">
                                <span className="glyphicon glyphicon-lock"></span>
                            </div>
                            <Input type="password" id="retype_password" name="retype_password" placeholder="Confirm Password"
                                   value={params.register.retype_password} onChange={update}/>
                        </div>
                    </FormGroup>

                    {button}
                </Form>
            </div>);
    } else {
        return (
            <div className="editprofile-form">
                <Form>
                    <label className="editprofile-label">Admin Edit</label>
                    {/*<FormGroup>*/}
                    {/*<Label for="firstName">First Name:</Label>*/}
                    {/*<Input type="text" name="firstName" placeholder="First Name"*/}
                    {/*value={params.register.firstName} onChange={update}/>*/}
                    {/*</FormGroup>*/}

                    <FormGroup>
                        <div className="input-group">
                            <div className="input-group-addon">
                                <span className="glyphicon glyphicon-user"></span>
                            </div>
                            <Input type="text" id="firstName" name="firstName" placeholder="First Name"
                                   value={params.register.firstName} onChange={update}/>
                        </div>
                    </FormGroup>


                    {/*<FormGroup>*/}
                    {/*<Label for="lastName">Last Name:</Label>*/}
                    {/*<Input type="text" name="lastName" placeholder="Last Name"*/}
                    {/*value={params.register.lastName} onChange={update}/>*/}
                    {/*</FormGroup>*/}


                    <FormGroup>
                        <div className="input-group">
                            <div className="input-group-addon">
                                <span className="glyphicon glyphicon-user"></span>
                            </div>
                            <Input type="text" id="lastName" name="lastName" placeholder="Last Name"
                                   value={params.register.lastName} onChange={update}/>
                        </div>
                    </FormGroup>

                    {/*<FormGroup>*/}
                    {/*<Label for="email">Email:</Label>*/}
                    {/*<Input type="email" name="email" placeholder="email"*/}
                    {/*value={params.register.email} onChange={update}/>*/}
                    {/*</FormGroup>*/}


                    <FormGroup>
                        <div className="input-group">
                            <div className="input-group-addon">
                                <span className="glyphicon glyphicon-envelope"></span>
                            </div>
                            <Input type="email" id="email" name="email" placeholder="Email"
                                   value={params.register.email} onChange={update}/>
                        </div>
                    </FormGroup>

                    {/*<FormGroup>*/}
                    {/*<Label for="password">Password: <i>[Min. length 8, 1 Uppercase, 1 Number]</i></Label>*/}
                    {/*<Input type="password" name="password" placeholder="password"*/}
                    {/*value={params.register.password} onChange={update}/>*/}
                    {/*</FormGroup>*/}

                    <FormGroup>
                        <div className="input-group">
                            <div className="input-group-addon">
                                <span className="glyphicon glyphicon-lock"></span>
                            </div>
                            <Input type="password" id="password" name="password" placeholder="Password"
                                   value={params.register.password} onChange={update}/>
                        </div>
                    </FormGroup>


                    {/*<FormGroup>*/}
                    {/*<Label for="retype_password">Re-Type Password:</Label>*/}
                    {/*<Input type="password" name="retype_password" placeholder="retype password"*/}
                    {/*value={params.register.retype_password} onChange={update}/>*/}
                    {/*</FormGroup>*/}


                    <FormGroup>
                        <div className="input-group">
                            <div className="input-group-addon">
                                <span className="glyphicon glyphicon-lock"></span>
                            </div>
                            <Input type="password" id="retype_password" name="retype_password"
                                   placeholder="Confirm Password"
                                   value={params.register.retype_password} onChange={update}/>
                        </div>
                    </FormGroup>
                    {button1}
                </Form>
            </div>);
    }
}



function state2props(state) {
    //console.log("rerender", state);
    return { register: state.register };
}

export default connect(state2props)(EditRegistrationForm);