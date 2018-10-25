import { createStore, combineReducers } from 'redux';
import deepFreeze from 'deep-freeze';

//let store;

const persistedState = localStorage.getItem('reduxState') ? JSON.parse(localStorage.getItem('reduxState')) : {};

let empty_search_form = {
    search: ""
};

function search_tab(state=empty_search_form, action) {
    switch (action.type) {
        case 'UPDATE_SEARCH_TAB':
            return Object.assign({},state, action.data);
        case 'CLEAR_SEARCH_TAB':
            return empty_search_form;
        default:
            return state;
    }
    
}


let empty_results = {
    results: ""
}

function results(state=empty_results, action) {
    switch (action.type) {
        case 'SEARCH_RESULTS':
            return action.data;
        case 'CLEAR_RESULTS':
            return empty_results;
        default:
            return state;

    }
}

let initial_page= {
    page:""
};

function page(state=initial_page, action) {
    switch (action.type) {
        case 'UPDATE_PAGE_NO':
            return action.data;
        default:
            return state;
    }
}

let initial_details= {
    details:""
};

function details(state=initial_details, action) {
    switch (action.type) {
        case 'DETAILS':
            return action.data;
        case 'CLEAR_DETAILS':
            return initial_details;
        default:
            return state;
    }
}

let empty_login = {
    email: "",
    password: "",
};

function login(state = empty_login, action) {
    switch (action.type) {
        case 'UPDATE_LOGIN_FORM':
            return Object.assign({}, state, action.data);
        case 'CLEAR_LOGIN_FORM':
            return empty_login;
        default:
            return state;
    }
}

let empty_register = {
    dtype: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    retype_password:""
};

function register(state = empty_register, action) {
    switch (action.type) {
        case 'UPDATE_REGISTER_FORM':
            return Object.assign({}, state, action.data);
        case 'CLEAR_REGISTER_FORM':
            return empty_register;
        default:
            return state;
    }
}

function errors(state="", action) {
    switch (action.type) {
        case 'ERROR':
            return action.msg;
        default:
            return "";
    }
}

function token(state = null, action) {
    switch (action.type) {
        case 'SET_TOKEN':
            return action.data;
        case 'RESET_TOKEN':
            return null;
        default:
            return state;
    }
}

let empty_watchlist = "";

function watchlist(state = empty_watchlist, action) {
    switch (action.type) {
        case 'WATCHLIST':
            return action.data;
        default:
            return state;
    }
}

let empty_seller_list = "";

function seller_list(state = empty_seller_list, action) {
    switch (action.type) {
        case 'SELLERLIST':
            return action.data;
        default:
            return state;
    }
}

let empty_link = {
    data:"",
    link:"",
    id:""
};


function link(state = empty_link, action) {
    switch (action.type) {
        case 'UPDATE_BUY_FORM':
            return Object.assign({}, state, action.data);
        case 'CLEAR_BUY_FORM':
            return empty_link;
        default:
            return state;
    }
}

let empty_review = {
    description:"",
    thoughts:"",
    review_title: "",
    title: "",
};

function review_form(state = empty_review, action) {
    switch (action.type) {
        case 'UPDATE_REVIEW_FORM':
            return Object.assign({}, state, action.data);
        case 'CLEAR_REVIEW_FORM':
            return empty_review;
        default:
            return state;
    }
}

let empty_list_link={
    links: ""
};

function links(state = empty_list_link, action) {
    switch (action.type) {
        case 'LINKS':
            return action.data;
        default:
            return state;
    }
}

let empty_movie_review={
    reviews: ""
};

function movie_review(state = empty_movie_review, action) {
    switch (action.type) {
        case 'MOVIE_REVIEW':
            return action.data;
        default:
            return state;
    }
}

let empty_edit_link={
    data: ""
};

function edit_link(state = empty_edit_link, action) {
    switch (action.type) {
        case 'EDIT_LINK':
            return action.data;
        default:
            return state;
    }
}

let empty_critic_review="";

function critic_review(state = empty_critic_review, action) {
    switch (action.type) {
        case 'CRITIC_REVIEW_LIST':
            return action.data;
        default:
            return state;
    }
}

let empty_view_review={
    description:""
};

function view_review(state = empty_view_review, action) {
    switch (action.type) {
        case 'VIEW_REVIEW':
            return action.data;
        default:
            return state;
    }
}

let empty_person_list="";

function person_list(state = empty_person_list, action) {
    switch (action.type) {
        case 'PERSON_LIST':
            return action.data;
        default:
            return state;
    }
}

let empty_movie_list="";

function movie_list(state = empty_movie_list, action) {
    switch (action.type) {
        case 'MOVIE_LIST':
            return action.data;
        default:
            return state;
    }
}

let empty_link_list="";

function link_list(state = empty_link_list, action) {
    switch (action.type) {
        case 'LINK_LIST':
            return action.data;
        default:
            return state;
    }
}

let empty_review_list="";

function review_list(state = empty_review_list, action) {
    switch (action.type) {
        case 'REVIEW_LIST':
            return action.data;
        default:
            return state;
    }
}

let empty_rec="";

function rec(state = empty_rec, action) {
    switch (action.type) {
        case 'RECOMMENDATIONS':
            return action.data;
        default:
            return state;
    }
}

let empty_user_follows_list="";

function user_follows(state = empty_user_follows_list, action) {
    switch (action.type) {
        case 'FOLLOWS':
            return action.data;
        default:
            return state;
    }
}

let empty_critic_followers_list="";

function critic_followers(state = empty_critic_followers_list, action) {
    switch (action.type) {
        case 'FOLLOWERS':
            return action.data;
        default:
            return state;
    }
}

let empty_critics="";

function critics(state = empty_critics, action) {
    switch (action.type) {
        case 'CRITICS':
            return action.data;
        default:
            return state;
    }
}


let empty_critic_object="";

function critic_object(state = empty_critic_object, action) {
    switch (action.type) {
        case 'CRITIC_OBJECT':
            return action.data;
        default:
            return state;
    }
}


function root_reducer(state0, action) {
    //console.log("reducer", action);
    let reducer = combineReducers({search_tab, results, page, details, login, register, errors, token,
        watchlist, link, seller_list, review_form, links, movie_review, edit_link, critic_review, view_review,
        person_list, movie_list, link_list, review_list, rec, user_follows, critic_followers, critics, critic_object});
    //console.log("state0", state0);
    let state1 = reducer(state0, action);
    //console.log("state1", state1);
    return deepFreeze(state1);
};

let store = createStore(root_reducer, persistedState);
export default store;