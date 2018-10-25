import React from 'react';
import {Button} from 'reactstrap';
import {Link} from 'react-router-dom';

import api from '../api';

export default function AdminUser(props) {

    //console.log("admin user props", props.props.register);

    //let user=props.props.register;

    function edit() {
       api.find_user(props.props.register.id);
    }

    function deleteUser() {
        api.delete_user(props.props.register.id);
    }

    return(
        <div>
            <div>User Details:</div>
            <div>First Name: {props.props.register.firstName}</div>
            <div>Last Name:{props.props.register.lastName}</div>
            <div>Email: {props.props.register.email}</div>
            <div>Password: {props.props.register.password}</div>
            <div>Type: {props.props.register.obj}</div>
            <div>
                <Link to={"/system/user/edit"}>
                    <Button className="btn btn-primary" onClick={edit}>Edit User</Button>
                </Link>
            </div>
            <div>
                <Link to={"/system"}>
                    <Button className="btn btn-danger" onClick={deleteUser}>Delete User</Button>
                </Link>
            </div>
        </div>
    );
}