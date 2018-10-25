import React from 'react';

//import {NavItem} from 'reactstrap';
import { NavLink } from 'react-router-dom';
import store from '../store';

export default function TitleNav() {

    function clear() {
        store.dispatch({type: 'CLEAR_SEARCH_TAB'});
    }

    return (
  //      {/*<div>*/}
  //          {/*<span className="navbar-brand navbar-nav">*/}
  //              {/*<NavItem>*/}
  //                  {/*<NavLink to="/" onClick={clear}>*/}
  //                      {/*<h2>Recommendation System</h2>*/}
  //                  {/*</NavLink>*/}
  //              {/*</NavItem>*/}
  //          {/*</span>*/}
  //      {/*</div>*/}

    <div className="reg-nav">



        <NavLink to="/" onClick={clear}>
            <h2 className="title-css">Movie Mania</h2>
        </NavLink>


    </div>
    )

}