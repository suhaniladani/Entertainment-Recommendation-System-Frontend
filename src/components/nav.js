import React from 'react';
import { Form, Button, FormGroup, Input } from 'reactstrap';
import $ from "jquery";
import {connect} from "react-redux";
import {Link} from 'react-router-dom';
import api from '../api';
//import Cookies from 'universal-cookie';
//import store from "../store";
import TitleNav from "./title-nav";
import swal from "sweetalert";


let Login = connect(({login}) => {return {login};})((props) =>{

    function update(ev) {
        let tgt = $(ev.target);

        let data = {};
        data[tgt.attr('name')] = tgt.val();
        //console.log("data",data);
        let action = {
            type: 'UPDATE_LOGIN_FORM',
            data: data,
        };
        //console.log(action);
        props.dispatch(action);

    }

    function login() {
        if(props.login.email === "" ||
            props.login.password === "" ){
            //props.dispatch({type: 'ERROR', msg: 'Please enter valid credentials'});
            swal({
                title: "NO CREDENTIALS!",
                text: "Please enter your email and password!",
                icon: "warning",
                button: "Okay",
                dangerMode: false,
            })
        } else {
            api.login(props.login);
        }
    }

    function clear() {
        props.dispatch({type:'CLEAR_REGISTER_FORM'});
    }

    return (
        <div className="navbar">
            <div className="float-right">
                <Form inline>
                    <FormGroup>
                        <div className="input-group">
                            <div className="input-group-addon">
                                <span className="glyphicon glyphicon-envelope"></span>
                            </div>
                            <Input type="email" id="email" name="email" placeholder="Email"
                                   value={props.login.email} onChange={update}/>
                        </div>
                        {/*<Input type="email" name="email" placeholder="email"*/}
                               {/*value={props.login.email} onChange={update}/>*/}
                    </FormGroup> &nbsp; &nbsp;
                    <FormGroup>
                        <div className="input-group">
                            <div className="input-group-addon">
                                <span className="glyphicon glyphicon-lock"></span>
                            </div>
                            <Input type="password" id="password" name="password" placeholder="Password"
                                   value={props.login.password} onChange={update}/>
                        </div>
                        {/*<Input type="password" name="password" placeholder="password"*/}
                               {/*value={props.login.password} onChange={update}/>*/}
                    </FormGroup> &nbsp; &nbsp;
                    {/*<Button onClick={login} type="button" className="btn btn-primary">Login</Button>*/}
                    <Button className="btn btn-primary" onClick={login}><span className="glyphicon glyphicon-log-in"></span>&nbsp;<b>Log In</b></Button>
                </Form>
                <Link to="/registration" exact="true" onClick={clear}>
                    <span className="admin-head">
                        New here? Register Now!
                    </span>
                </Link>
            </div>
        </div>
    );
})



let Session = connect(({token}) => {return {token};})((props) => {

    function logout(){
        //console.log("making logout call");
        api.logout();
    }

    function getList() {
        if(props.token.obj === "Viewer") {
            api.get_watchlist(props.token.id);
            api.get_user_follows_critic(props.token.id);
        } else if(props.token.obj === "Seller"){
            api.get_watchlist(props.token.id);
            api.get_user_follows_critic(props.token.id);
            api.get_seller_list(props.token.id);
        } else if(props.token.obj === "Critic"){
            api.get_watchlist(props.token.id);
            api.get_user_follows_critic(props.token.id);
            api.get_followers_critic(props.token.id);
            api.get_critic_reviews(props.token.id);
        } else if(props.token.obj === "Admin"){
            api.get_person_list();
            api.get_movie_list();
            api.get_link_list();
            api.get_review_list();
        }
    }

    function fillForm() {
        //console.log("id", props.token.id);
        api.find_user(props.token.id);
    }

    if(props.token.obj === "Admin"){
        return<div className="navbar">
            <p className="nav-item">Welcome {props.token.firstName}!</p> &nbps;
            <p className="nav-item"><Link to={"/system"} exact="true" onClick={getList}>
                <span className="admin-head">
                    System Administration
                </span></Link></p> &nbps;
            <Link to={"/"}>
                <Button className=" btn btn-danger" onClick={logout}><span className="glyphicon glyphicon-log-out"></span>&nbsp;<b>Logout</b></Button>
            </Link>
        </div>;
    } else {
    return <div className="navbar ">
        <p className="nav-item">Welcome {props.token.firstName}!</p> &nbsp;	&nbsp;
        <p className="nav-item"><Link to={"/profile"} exact="true" onClick={getList}>
            <span className="admin-head"> My Profile </span>
        </Link></p>	&nbsp;	&nbsp;
        <p className="nav-item"><Link to={"/editProfile"} exact="true" onClick={fillForm}>
            <span className="admin-head-edit"> Edit Profile </span>
        </Link></p>	&nbsp;	&nbsp;
            <Link to={"/"}>
                {/*<Button onClick={logout} className="btn btn-danger">Logout</Button>*/}
                <Button className=" btn btn-danger" onClick={logout}><span className="glyphicon glyphicon-log-out"></span>&nbsp;<b>Logout</b></Button>
            </Link>
         </div>;
    }
});

function Nav(props) {

    let session;
    //let cookie = new Cookies();
    //let token;

    if(props.token != null){
        session = <Session token={props.token}/>
    }  else {
        session = <Login/>
    }

// else if(cookie.get('email')){
//         console.log("email", cookie.get('email'));
//         token = { id: cookie.get('id'), firstName: cookie.get('firstName'), email: cookie.get('email'), obj: cookie.get('obj')};
//         store.dispatch({
//             type: 'SET_TOKEN',
//             data: token
//         })
//         session = <Session token={token}/>
//     }

            return (
                <div className="navbar">
                    <TitleNav/>
                    <span className="navbar-text">
	                 { session }
                    </span>
                </div>
            );
}

function state2props(state) {
    //console.log("rerender", state);
    return { token: state.token };
}

export default connect(state2props)(Nav);