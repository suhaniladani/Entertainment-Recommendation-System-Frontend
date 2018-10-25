import React from 'react';
import Cookies from "universal-cookie";

export default function Profile(props) {

    let token = props.props.token;
    let name;
    let lname="";
    let email="";
    let cookie = new Cookies();
    if(token==null){
        name = cookie.get('name');
    } else {
        name = token.firstName;
        lname = token.lastName;
        email = token.email;
    }

    return (
        <div>
            <div className="admin-table">
                My profile
            </div>
            <div>
                Name: {name} {lname}
            </div>
            <div>
                Email: {email}
            </div>
        </div>
    );
}