import store from './store';
import $ from 'jquery';
import Cookies from 'universal-cookie';
import _ from 'underscore';
import swal from 'sweetalert';


class TheServer{

    search_request(data, page) {
        //console.log("got this data", data);

        let URL = "http://www.omdbapi.com/?s="+ data +"&apikey=d777acf4&page="+page;
        //console.log(URL);
        $.ajax(URL,
            {
                method:"get",
                dataType: "json",
                success: (resp) => {
                    //console.log("data from request:", resp);
                    store.dispatch({
                        type: 'SEARCH_RESULTS',
                        data: resp
                    })
                    store.dispatch({
                        type:'UPDATE_PAGE_NO',
                        data: {page: page}
                    })

                },
                error: (resp) => {
                    //console.log("error occurred", resp)
                }
            });
    }

    get_details(data) {
        //console.log("got this data", data);

        let URL = "http://www.omdbapi.com/?i="+ data +"&apikey=d777acf4";
        //console.log(URL);
        $.ajax(URL,
            {
                method:"get",
                dataType: "json",
                success: (resp) => {
                    //console.log("data from request:", resp);
                    store.dispatch({
                        type: 'DETAILS',
                        data: resp
                    })
                    let movie={
                        "title": resp.Title,
                        "imdbid": resp.imdbID
                    }
                    this.save_movie(movie);
                },
                error: (resp) => {
                    //console.log("error occurred", resp)
                }
            });
    }

    save_movie(data){
        //console.log("saving movie",data);
        $.ajax("http://cs5200-recommendation-system-project.us-east-2.elasticbeanstalk.com/api/movie", {
            method: "post",
            dataType: "json",
            contentType: "application/json; charset=UTF-8",
            data: JSON.stringify(data),
            success: (resp) => {
                //console.log("sucess", resp);

            },
            error: (resp) => {
                //console.log("error", resp);
                // store.dispatch({
                //     type: 'CLEAR_REGISTER_FORM',
                // })
            },
        });
    }


    submit_registration(data) {
        //console.log(data.dtype);
        let login_data={
            "email": data.email,
            "password": data.password
        }
        if (data.dtype === "Viewer") {
            //console.log("inside if");
            let data1 = {
                "firstName": data.firstName,
                "lastName": data.lastName,
                "email": data.email,
                "password": data.password,
                "obj": "Viewer"
            }
            $.ajax("http://cs5200-recommendation-system-project.us-east-2.elasticbeanstalk.com/api/user/register", {
                method: "post",
                dataType: "json",
                contentType: "application/json; charset=UTF-8",
                data: JSON.stringify(data1),
                success: (resp) => {
                    //console.log("success", resp);
                    this.login(login_data);
                    store.dispatch({
                        type: 'CLEAR_REGISTER_FORM',
                    })
                },
                error: (resp) => {
                    //console.log("error", resp);
                    // store.dispatch({
                    //     type: 'CLEAR_REGISTER_FORM',
                    // })
                },
            });
        } else if (data.dtype === "Critic") {
            let data1 = {
                "firstName": data.firstName,
                "lastName": data.lastName,
                "email": data.email,
                "password": data.password,
                "obj": "Critic"
            }
            $.ajax("http://cs5200-recommendation-system-project.us-east-2.elasticbeanstalk.com/api/critic/register", {
                method: "post",
                dataType: "json",
                contentType: "application/json; charset=UTF-8",
                data: JSON.stringify(data1),
                success: (resp) => {
                    //console.log("sucess", resp);
                    this.login(login_data);
                    store.dispatch({
                        type: 'CLEAR_REGISTER_FORM',
                    })
                },
                error: (resp) => {
                    //console.log("error", resp);
                    // store.dispatch({
                    //     type: 'CLEAR_REGISTER_FORM',
                    // })
                },
            });
        } else if (data.dtype === "Seller") {
            let data1 = {
                "firstName": data.firstName,
                "lastName": data.lastName,
                "email": data.email,
                "password": data.password,
                "obj": "Seller"
            }
            $.ajax("http://cs5200-recommendation-system-project.us-east-2.elasticbeanstalk.com/api/seller/register", {
                method: "post",
                dataType: "json",
                contentType: "application/json; charset=UTF-8",
                data: JSON.stringify(data1),
                success: (resp) => {
                    //console.log("sucess", resp);
                    this.login(login_data);
                    store.dispatch({
                        type: 'CLEAR_REGISTER_FORM',
                    })

                },
                error: (resp) => {
                    //console.log("error", resp);
                    // store.dispatch({
                    //     type: 'CLEAR_REGISTER_FORM',
                    // })
                },
            });
        }
    }

        login(data) {

        //console.log("login data", data);
            $.ajax("http://cs5200-recommendation-system-project.us-east-2.elasticbeanstalk.com/api/login", {
                method: "post",
                dataType: "json",
                contentType: "application/json; charset=UTF-8",
                data: JSON.stringify(data),
                success: (resp) => {
                    //console.log("sucess", resp);
                    //console.log("type", resp.);
                    const cookies = new Cookies();
                    cookies.set('id', resp.id);
                    cookies.set('firstName', resp.firstName);
                    cookies.set('email', resp.email);
                    cookies.set('obj', resp.obj);
                    store.dispatch({
                        type: 'SET_TOKEN',
                        data: resp
                    })
                    store.dispatch({
                        type: 'CLEAR_LOGIN_FORM'
                    });
                },
                error: (resp) => {
                    //console.log("error", resp);
                    // store.dispatch({
                    //     type: 'CLEAR_REGISTER_FORM',
                    // })
                    //store.dispatch({type: 'ERROR', msg: 'Invalid Login! Please try again'});
                    swal({
                        title: "Invalid Login",
                        text: "Please enter correct Email and Password combination!",
                        icon: "error",
                        button: "OK",
                    });
                },
            });
    }

    logout(){
        //console.log("inside logout");
        $.ajax("http://cs5200-recommendation-system-project.us-east-2.elasticbeanstalk.com/api/logout", {
            method: "post",
            success: (resp) => {
                //console.log("sucess", resp);
                //console.log("type", resp.);
                const cookies = new Cookies();
                cookies.remove('id');
                cookies.remove('firstName');
                cookies.remove('email');
                cookies.remove('obj');
                //cookies.remove('search');
                //cookies.remove('page')
                localStorage.removeItem('reduxState');
                store.dispatch({
                    type: 'RESET_TOKEN',
                    data: null
                })
                store.dispatch({
                    type: 'CLEAR_SEARCH_TAB'
                })
                //window.location.reload();
            },
            error: (resp) => {
                //console.log("error", resp);
                // store.dispatch({
                //     type: 'CLEAR_REGISTER_FORM',
                // })
            },
        });
    }

    add_to_watchlist(id, data) {
        //console.log(id);
        //console.log(data);
        let imdb=data.imdbid;
        let URL = "http://cs5200-recommendation-system-project.us-east-2.elasticbeanstalk.com/api/movie/"+imdb+"/person/"+id+"/watchlist";
        $.ajax(URL , {
            method: "post",
            dataType: "json",
            contentType: "application/json; charset=UTF-8",
            success: (resp) => {
                //console.log("sucess", resp);
                this.get_watchlist(id);
                //alert("added succesfully");
                // store.dispatch({
                //     type: 'CLEAR_LOGIN_FORM'
                // });
            },
            error: (resp) => {
                //console.log("error", resp);
                // store.dispatch({
                //     type: 'CLEAR_REGISTER_FORM',
                // })
            },
        });
    }

    toggle_watched(id, imdb) {
        //console.log(id);
        //console.log(imdb);
        //let imdb=data.imdbid;
        let URL = "http://cs5200-recommendation-system-project.us-east-2.elasticbeanstalk.com/api/movie/"+imdb+"/person/"+id+"/watchlist";
        $.ajax(URL , {
            method: "put",
            success: (resp) => {
                //console.log("sucess", resp);
                this.get_watchlist(id);
                //alert("added succesfully");
                // store.dispatch({
                //     type: 'CLEAR_LOGIN_FORM'
                // });
            },
            error: (resp) => {
                //console.log("error", resp);
                // store.dispatch({
                //     type: 'CLEAR_REGISTER_FORM',
                // })
            },
        });
    }

    get_watchlist(id) {
        //console.log(id);
        //console.log(data);
        let URL = "http://cs5200-recommendation-system-project.us-east-2.elasticbeanstalk.com/api/person/"+id+"/watchlist";
        $.ajax(URL , {
            method: "get",
            dataType: "json",
            contentType: "application/json; charset=UTF-8",
            //data: JSON.stringify(data),
            success: (resp) => {
                //console.log("sucess", resp);

                //alert("added succesfully");
                store.dispatch({
                    type: 'WATCHLIST',
                    data: resp
                });
            },
            error: (resp) => {
                //console.log("error", resp);
                // store.dispatch({
                //     type: 'CLEAR_REGISTER_FORM',
                // })
            },
        });
    }

    remove_from_watchlist(id, wid){
        let URL = "http://cs5200-recommendation-system-project.us-east-2.elasticbeanstalk.com/api/watchlist/"+wid;
        $.ajax(URL , {
            method: "delete",
            success: (resp) => {
                //console.log("sucess", resp);
                this.get_watchlist(id);
                //alert("added succesfully");
                // store.dispatch({
                //     type: 'WATCHLIST',
                //     data: resp
                // });
            },
            error: (resp) => {
                //console.log("error", resp);
                // store.dispatch({
                //     type: 'CLEAR_REGISTER_FORM',
                // })
            },
        });
    }

    get_seller_list(id) {
        //console.log(id);
        //console.log(data);
        let URL = "http://cs5200-recommendation-system-project.us-east-2.elasticbeanstalk.com/api/seller/"+id+"/linklist";
        $.ajax(URL , {
            method: "get",
            dataType: "json",
            contentType: "application/json; charset=UTF-8",
            //data: JSON.stringify(data),
            success: (resp) => {
                //console.log("sucess", resp);

                //alert("added succesfully");
                store.dispatch({
                    type: 'SELLERLIST',
                    data: resp
                });
            },
            error: (resp) => {
                //console.log("error", resp);
                // store.dispatch({
                //     type: 'CLEAR_REGISTER_FORM',
                // })
            },
        });
    }

    get_link(linkid){
        //console.log(linkid);
        let URL = "http://cs5200-recommendation-system-project.us-east-2.elasticbeanstalk.com/api/link/"+linkid;
        $.ajax(URL , {
            method: "get",
            dataType: "json",
            contentType: "application/json; charset=UTF-8",
            //data: JSON.stringify(data),
            success: (resp) => {
                //console.log("sucess", resp);

                //alert("added succesfully");
                store.dispatch({
                    type: 'UPDATE_BUY_FORM',
                    data: resp
                });
            },
            error: (resp) => {
                //console.log("error", resp);
                // store.dispatch({
                //     type: 'CLEAR_REGISTER_FORM',
                // })
            },
        });
    }


    add_link(sid,imdb,data){
        //console.log("saving link",data);
        let URL = "http://cs5200-recommendation-system-project.us-east-2.elasticbeanstalk.com/api/seller/"+sid+"/movie/"+imdb+"/link";
        let data1 = {
            link: data
        };
        //console.log("url", URL);
        $.ajax(URL, {
            method: "post",
            dataType: "json",
            contentType: "application/json; charset=UTF-8",
            data: JSON.stringify(data1),
            success: (resp) => {
               // console.log("sucess", resp);
                this.get_seller_list(sid);
                store.dispatch({
                    type: 'CLEAR_BUY_FORM',
                })
            },
            error: (resp) => {
                //console.log("error", resp);
                // store.dispatch({
                //     type: 'CLEAR_REGISTER_FORM',
                // })
            },
        });
    }

    edit_link(sid, linkid, data){
       // console.log("saving link",data);
        let URL = "http://cs5200-recommendation-system-project.us-east-2.elasticbeanstalk.com/api/link/"+linkid;
        let data1 = {
            link: data
        };
        //console.log("url", URL);
        $.ajax(URL, {
            method: "put",
            contentType: "application/json; charset=UTF-8",
            data: JSON.stringify(data1),
            success: (resp) => {
               // console.log("sucess", resp);
                this.get_seller_list(sid);
                store.dispatch({
                    type: 'CLEAR_BUY_FORM',
                })
            },
            error: (resp) => {
               // console.log("error", resp);
                // store.dispatch({
                //     type: 'CLEAR_REGISTER_FORM',
                // })
            },
        });
    }

    // seller_movie_link(sid,imdb){
    //     let URL = "http://localhost:8080/api/seller/"+sid+"/movie/"+imdb;
    //     console.log("url", URL);
    //     $.ajax(URL, {
    //         method: "post",
    //         dataType: "json",
    //         contentType: "application/json; charset=UTF-8",
    //         success: (resp) => {
    //             console.log("sucess", resp);
    //             this.get_seller_list(sid);
    //         },
    //         error: (resp) => {
    //             console.log("error", resp);
    //             // store.dispatch({
    //             //     type: 'CLEAR_REGISTER_FORM',
    //             // })
    //         },
    //     });
    // }

    get_links(imdb) {
        //console.log(id);
        //console.log(data);
        let URL = "http://cs5200-recommendation-system-project.us-east-2.elasticbeanstalk.com/api/movie/"+imdb+"/link";
        $.ajax(URL , {
            method: "get",
            dataType: "json",
            contentType: "application/json; charset=UTF-8",
            //data: JSON.stringify(data),
            success: (resp) => {
               // console.log("sucess", resp);

                //alert("added succesfully");
                store.dispatch({
                    type: 'LINKS',
                    data: resp
                });
            },
            error: (resp) => {
               // console.log("error", resp);
                // store.dispatch({
                //     type: 'CLEAR_REGISTER_FORM',
                // })
            },
        });
    }

    remove_from_sellerlist(id, lid){
        let URL = "http://cs5200-recommendation-system-project.us-east-2.elasticbeanstalk.com/api/link/"+lid;
        $.ajax(URL , {
            method: "delete",
            success: (resp) => {
               // console.log("sucess", resp);
                this.get_seller_list(id);
                //alert("added succesfully");
                // store.dispatch({
                //     type: 'WATCHLIST',
                //     data: resp
                // });
            },
            error: (resp) => {
                //console.log("error", resp);
                // store.dispatch({
                //     type: 'CLEAR_REGISTER_FORM',
                // })
            },
        });
    }

    get_movie_reviews(id) {
        //console.log(id);
        //console.log(data);
        let URL = "http://cs5200-recommendation-system-project.us-east-2.elasticbeanstalk.com/api/movie/"+id+"/review";
        $.ajax(URL , {
            method: "get",
            dataType: "json",
            contentType: "application/json; charset=UTF-8",
            //data: JSON.stringify(data),
            success: (resp) => {
                //console.log("sucess", resp);

                //alert("added succesfully");
                store.dispatch({
                    type: 'MOVIE_REVIEW',
                    data: resp
                });
            },
            error: (resp) => {
                //console.log("error", resp);
                // store.dispatch({
                //     type: 'CLEAR_REGISTER_FORM',
                // })
            },
        });
    }

    add_review(cid,imdb,title,data){
        //console.log("saving thoughts",data);
        let URL = "http://cs5200-recommendation-system-project.us-east-2.elasticbeanstalk.com/api/movie/"+imdb+"/critic/"+cid+"/review";
        let data1 = {
            "title": title,
            "description": data
        };
        //console.log("url", URL);
        //console.log("data 1", data1);
        $.ajax(URL, {
            method: "post",
            dataType: "json",
            contentType: "application/json; charset=UTF-8",
            data: JSON.stringify(data1),
            success: (resp) => {
                //console.log("sucess", resp);
                this.get_critic_reviews(cid);
                store.dispatch({
                    type: 'CLEAR_REVIEW_FORM',
                })
            },
            error: (resp) => {
                //console.log("error", resp);
                // store.dispatch({
                //     type: 'CLEAR_REGISTER_FORM',
                // })
            },
        });
    }

    get_critic_reviews(cid){
        //console.log("waiting for backend");
        let URL = "http://cs5200-recommendation-system-project.us-east-2.elasticbeanstalk.com/api/critic/"+cid+"/review";
        $.ajax(URL , {
            method: "get",
            dataType: "json",
            contentType: "application/json; charset=UTF-8",
            //data: JSON.stringify(data),
            success: (resp) => {
                //console.log("sucess", resp);

                //alert("added succesfully");
                store.dispatch({
                    type: 'CRITIC_REVIEW_LIST',
                    data: resp
                });
            },
            error: (resp) => {
                //console.log("error this", resp);
                // store.dispatch({
                //     type: 'CLEAR_REGISTER_FORM',
                // })
            },
        });

    }

    get_review(rid){
        //console.log(rid);
        let URL = "http://cs5200-recommendation-system-project.us-east-2.elasticbeanstalk.com/api/review/"+rid;
        $.ajax(URL , {
            method: "get",
            dataType: "json",
            contentType: "application/json; charset=UTF-8",
            //data: JSON.stringify(data),
            success: (resp) => {
                //console.log("sucess", resp);

                //alert("added succesfully");
                store.dispatch({
                    type: 'VIEW_REVIEW',
                    data: resp
                });
                store.dispatch({
                    type: 'UPDATE_REVIEW_FORM',
                    data: resp
                });
            },
            error: (resp) => {
                //console.log("error", resp);
                // store.dispatch({
                //     type: 'CLEAR_REGISTER_FORM',
                // })
            },
        });
    }

    edit_review(cid, rid, title, desc){
        //console.log("rid", rid);
        let URL = "http://cs5200-recommendation-system-project.us-east-2.elasticbeanstalk.com/api/review/"+rid;
        let data1 = {
            "title": title,
            "description": desc
        };
        //console.log("url", URL);
        $.ajax(URL, {
            method: "put",
            contentType: "application/json; charset=UTF-8",
            data: JSON.stringify(data1),
            success: (resp) => {
                //console.log("sucess", resp);
                this.get_critic_reviews(cid);
                store.dispatch({
                    type: 'CLEAR_REVIEW_FORM',
                })
            },
            error: (resp) => {
                //console.log("error", resp);
                // store.dispatch({
                //     type: 'CLEAR_REGISTER_FORM',
                // })
            },
        });
    }

    delete_review(id, rid){
        let URL = "http://cs5200-recommendation-system-project.us-east-2.elasticbeanstalk.com/api/review/"+rid;
        $.ajax(URL , {
            method: "delete",
            success: (resp) => {
                //console.log("sucess", resp);
                this.get_critic_reviews(id);
                //alert("added succesfully");
                // store.dispatch({
                //     type: 'WATCHLIST',
                //     data: resp
                // });
            },
            error: (resp) => {
                //console.log("error", resp);
                // store.dispatch({
                //     type: 'CLEAR_REGISTER_FORM',
                // })
            },
        });
    }

    get_person_list(){
       // console.log(rid);
        let URL = "http://cs5200-recommendation-system-project.us-east-2.elasticbeanstalk.com/api/person";
        $.ajax(URL , {
            method: "get",
            dataType: "json",
            contentType: "application/json; charset=UTF-8",
            //data: JSON.stringify(data),
            success: (resp) => {
                //console.log("sucess", resp);

                //alert("added succesfully");
                store.dispatch({
                    type: 'PERSON_LIST',
                    data: resp
                });
            },
            error: (resp) => {
                //console.log("error", resp);
                // store.dispatch({
                //     type: 'CLEAR_REGISTER_FORM',
                // })
            },
        });
    }

    get_movie_list(){
        // console.log(rid);
        let URL = "http://cs5200-recommendation-system-project.us-east-2.elasticbeanstalk.com/api/movie";
        $.ajax(URL , {
            method: "get",
            dataType: "json",
            contentType: "application/json; charset=UTF-8",
            //data: JSON.stringify(data),
            success: (resp) => {
                //console.log("sucess", resp);

                //alert("added succesfully");
                store.dispatch({
                    type: 'MOVIE_LIST',
                    data: resp
                });
            },
            error: (resp) => {
                //console.log("error", resp);
                // store.dispatch({
                //     type: 'CLEAR_REGISTER_FORM',
                // })
            },
        });
    }

    get_link_list(){
        // console.log(rid);
        let URL = "http://cs5200-recommendation-system-project.us-east-2.elasticbeanstalk.com/api/link";
        $.ajax(URL , {
            method: "get",
            dataType: "json",
            contentType: "application/json; charset=UTF-8",
            //data: JSON.stringify(data),
            success: (resp) => {
                //console.log("sucess", resp);

                //alert("added succesfully");
                store.dispatch({
                    type: 'LINK_LIST',
                    data: resp
                });
            },
            error: (resp) => {
                //console.log("error", resp);
                // store.dispatch({
                //     type: 'CLEAR_REGISTER_FORM',
                // })
            },
        });
    }

    get_review_list(){
        // console.log(rid);
        let URL = "http://cs5200-recommendation-system-project.us-east-2.elasticbeanstalk.com/api/review";
        $.ajax(URL , {
            method: "get",
            dataType: "json",
            contentType: "application/json; charset=UTF-8",
            //data: JSON.stringify(data),
            success: (resp) => {
                //console.log("sucess", resp);

                //alert("added succesfully");
                store.dispatch({
                    type: 'REVIEW_LIST',
                    data: resp
                });
            },
            error: (resp) => {
                //console.log("error", resp);
                // store.dispatch({
                //     type: 'CLEAR_REGISTER_FORM',
                // })
            },
        });
    }

    get_recommendations(data){
        //console.log("data send", data);
        //let tmdb = this.get_movieid(data);
        let URL = "https://api.themoviedb.org/3/find/"+data+"?api_key=9e5f2732bb363ded081f6928efdd5f04&language=en-US&external_source=imdb_id";
        //console.log("URL", URL);
        $.ajax(URL , {
            method: "get",
            dataType: "json",
            contentType: "application/json; charset=UTF-8",
            //data: JSON.stringify(data),
            success: (resp) => {
                //console.log("sucess", resp);

                if(resp.movie_results.length > 0){
                    //console.log("inside movie");
                    let first = _.first(resp.movie_results);
                    //console.log("first", first.id);
                    this.movie_recommendations(first.id);

                } else {
                    //console.log("inside tv show");
                    let first = _.first(resp.tv_results);
                    //console.log("first", first.id);
                    this.tv_recommendations(first.id);
                }


                //alert("added succesfully");
                // store.dispatch({
                //     type: 'REVIEW_LIST',
                //     data: resp
                // });
            },
            error: (resp) => {
                //console.log("error", resp);
                // store.dispatch({
                //     type: 'CLEAR_REGISTER_FORM',
                // })
            },
        });
    }

    movie_recommendations(data){
        let URL = "https://api.themoviedb.org/3/movie/"+data+"/recommendations?api_key=9e5f2732bb363ded081f6928efdd5f04&language=en-US&page=1";
        $.ajax(URL , {
            method: "get",
            dataType: "json",
            contentType: "application/json; charset=UTF-8",
            //data: JSON.stringify(data),
            success: (resp) => {
                //console.log("sucess", resp);

                //alert("added succesfully");
                store.dispatch({
                    type: 'RECOMMENDATIONS',
                    data: resp.results
                });
            },
            error: (resp) => {
               //console.log("error", resp);
                // store.dispatch({
                //     type: 'CLEAR_REGISTER_FORM',
                // })
            },
        });
    }

    tv_recommendations(data){
        let URL = "https://api.themoviedb.org/3/tv/"+data+"/recommendations?api_key=9e5f2732bb363ded081f6928efdd5f04&language=en-US&page=1";
        $.ajax(URL , {
            method: "get",
            dataType: "json",
            contentType: "application/json; charset=UTF-8",
            //data: JSON.stringify(data),
            success: (resp) => {
                //console.log("sucess", resp);

                //alert("added succesfully");
                // store.dispatch({
                //     type: 'MOVIE_REC',
                //     data: resp
                // });
                store.dispatch({
                    type: 'RECOMMENDATIONS',
                    data: resp.results
                });
            },
            error: (resp) => {
                //console.log("error", resp);
                // store.dispatch({
                //     type: 'CLEAR_REGISTER_FORM',
                // })
            },
        });
    }

    get_movie_imdbid(data){
        let URL = "https://api.themoviedb.org/3/movie/"+data+"/external_ids?api_key=9e5f2732bb363ded081f6928efdd5f04";
        $.ajax(URL , {
            method: "get",
            dataType: "json",
            contentType: "application/json; charset=UTF-8",
            //data: JSON.stringify(data),
            success: (resp) => {
                //console.log("sucess", resp);
                //console.log("imdb", resp.imdb_id);
                this.get_details(resp.imdb_id);

                //alert("added succesfully");
                // store.dispatch({
                //     type: 'MOVIE_REC',
                //     data: resp
                // });
            },
            error: (resp) => {
                //console.log("error", resp);
                // store.dispatch({
                //     type: 'CLEAR_REGISTER_FORM',
                // })
            },
        });
    }

    get_tv_imdbid(data){
        let URL = "https://api.themoviedb.org/3/tv/"+data+"/external_ids?api_key=9e5f2732bb363ded081f6928efdd5f04&language=en-US";
        $.ajax(URL , {
            method: "get",
            dataType: "json",
            contentType: "application/json; charset=UTF-8",
            //data: JSON.stringify(data),
            success: (resp) => {
                //console.log("sucess", resp);
                //console.log("imdb", resp.imdb_id);
                this.get_details(resp.imdb_id);

                //alert("added succesfully");
                // store.dispatch({
                //     type: 'MOVIE_REC',
                //     data: resp
                // });
            },
            error: (resp) => {
                //console.log("error", resp);
                // store.dispatch({
                //     type: 'CLEAR_REGISTER_FORM',
                // })
            },
        });
    }

    follow(id,cid,t){
        let URL = "http://cs5200-recommendation-system-project.us-east-2.elasticbeanstalk.com/api/person/"+id+"/critic/"+cid;
        $.ajax(URL, {
            method: "post",
            contentType: "application/json; charset=UTF-8",
            success: (resp) => {
                //console.log("sucess", resp);
                this.get_user_follows_critic(id);
                //const cookies = new Cookies();
                //let token = cookies.get('token');
                //console.log("got this token from cookie", token);
                if(t === "Critic"){
                    //console.log("inside token cheqk");
                    this.get_followers_critic(id);
                }
            },
            error: (resp) => {
                //console.log("error", resp);
                // store.dispatch({
                //     type: 'CLEAR_REGISTER_FORM',
                // })
            },
        });
    }

    get_user_follows_critic(id){
        let URL = "http://cs5200-recommendation-system-project.us-east-2.elasticbeanstalk.com/api/person/"+id+"/critic";
        $.ajax(URL , {
            method: "get",
            dataType: "json",
            contentType: "application/json; charset=UTF-8",
            //data: JSON.stringify(data),
            success: (resp) => {
                //console.log("sucess", resp);

                //alert("added succesfully");
                store.dispatch({
                    type: 'FOLLOWS',
                    data: resp
                });
            },
            error: (resp) => {
                //console.log("error", resp);
                // store.dispatch({
                //     type: 'CLEAR_REGISTER_FORM',
                // })
            },
        });
    }

    get_followers_critic(id){
        let URL = "http://cs5200-recommendation-system-project.us-east-2.elasticbeanstalk.com/api/critic/"+id+"/person";
        $.ajax(URL , {
            method: "get",
            dataType: "json",
            contentType: "application/json; charset=UTF-8",
            //data: JSON.stringify(data),
            success: (resp) => {
                //console.log("sucess", resp);

                //alert("added succesfully");
                store.dispatch({
                    type: 'FOLLOWERS',
                    data: resp
                });
            },
            error: (resp) => {
                //console.log("error", resp);
                // store.dispatch({
                //     type: 'CLEAR_REGISTER_FORM',
                // })
            },
        });
    }

    unfollow(id,cid, t){
        let URL = "http://cs5200-recommendation-system-project.us-east-2.elasticbeanstalk.com/api/person/"+id+"/critic/"+cid;
        $.ajax(URL , {
            method: "delete",
            success: (resp) => {
                //console.log("sucess", resp);
                this.get_user_follows_critic(id);
                this.get_watchlist(id);
                //const cookies = new Cookies();
                //let token = cookies.get('token');
                if(t === "Critic"){
                    this.get_followers_critic(id);
                }
            },
            error: (resp) => {
                //console.log("error", resp);
                // store.dispatch({
                //     type: 'CLEAR_REGISTER_FORM',
                // })
            },
        });
    }

    find_user(id){
        let URL = "http://cs5200-recommendation-system-project.us-east-2.elasticbeanstalk.com/api/person/"+id;
        $.ajax(URL , {
            method: "get",
            dataType: "json",
            contentType: "application/json; charset=UTF-8",
            //data: JSON.stringify(data),
            success: (resp) => {
                //console.log("sucess", resp);

                //alert("added succesfully");
                store.dispatch({
                    type: 'UPDATE_REGISTER_FORM',
                    data: resp
                });
            },
            error: (resp) => {
                //console.log("error", resp);
                // store.dispatch({
                //     type: 'CLEAR_REGISTER_FORM',
                // })
            },
        });
    }

    edit_profile(id, data){
        let URL = "http://cs5200-recommendation-system-project.us-east-2.elasticbeanstalk.com/api/person/"+id;
        // let data1= {
        //     "email": data.email,
        //     "password": data.password,
        // };
        //this.logout();
        //console.log("data", data);
        $.ajax(URL , {
            method: "put",
            dataType: "json",
            contentType: "application/json; charset=UTF-8",
            data: JSON.stringify(data),
            success: (resp) => {
                //console.log("sucess", resp);
                //console.log("login calling");
                swal({
                    title: "Edit Successful!",
                    text: "Please Login again!",
                    icon: "success",
                    button: "Okay",
                    dangerMode: false,
                })
                this.logout();
                // store.dispatch({
                //     type: 'ERROR',
                //     msg: 'Edit successful, please login again'});

                // alert("Edit successful! please log in again");
                // store.dispatch({
                //     type: 'CLEAR_REGISTER_FORM'
                // });

            },
            error: (resp) => {
                //console.log("error", resp);
                // store.dispatch({
                //     type: 'CLEAR_REGISTER_FORM',
                // })
            },
        });
    }


    edit_user_by_admin(id, data){
        //console.log("id", id);
        //console.log("data", data);
        let URL = "http://cs5200-recommendation-system-project.us-east-2.elasticbeanstalk.com/api/person/"+id;
        $.ajax(URL , {
            method: "put",
            dataType: "json",
            contentType: "application/json; charset=UTF-8",
            data: JSON.stringify(data),
            success: (resp) => {
                //console.log("sucess", resp);
                this.get_person_list();
                this.get_movie_list();
                this.get_review_list();
                this.get_link_list();
                store.dispatch({
                    type: 'CLEAR_BUY_FORM',
                })
                store.dispatch({
                    type: 'CLEAR_REGISTER_FORM',
                })
                //console.log("login calling");
                // this.logout();
                // store.dispatch({
                //     type: 'ERROR',
                //     msg: 'Edit successful, please login again'});
                //
                // alert("Edit successful! please log in again");
                // store.dispatch({
                //     type: 'CLEAR_REGISTER_FORM'
                // });

            },
            error: (resp) => {
                //console.log("error", resp);
                // store.dispatch({
                //     type: 'CLEAR_REGISTER_FORM',
                // })
            },
        });
    }

    delete_user(id){
        let URL = "http://cs5200-recommendation-system-project.us-east-2.elasticbeanstalk.com/api/person/"+id;
        $.ajax(URL , {
            method: "delete",
            success: (resp) => {
                //console.log("sucess", resp);
                this.get_person_list();
                this.get_movie_list();
                this.get_review_list();
                this.get_link_list();
            },
            error: (resp) => {
                //console.log("error", resp);
                // store.dispatch({
                //     type: 'CLEAR_REGISTER_FORM',
                // })
            },
        });
    }

    delete_movie(id){
        let URL = "http://cs5200-recommendation-system-project.us-east-2.elasticbeanstalk.com/api/movie/"+id;
        $.ajax(URL , {
            method: "delete",
            success: (resp) => {
                //console.log("sucess", resp);
                this.get_person_list();
                this.get_movie_list();
                this.get_review_list();
                this.get_link_list();
            },
            error: (resp) => {
                //console.log("error", resp);
                // store.dispatch({
                //     type: 'CLEAR_REGISTER_FORM',
                // })
            },
        });
    }

    submit_registration_by_admin(data) {
        //console.log(data.dtype);
        if (data.dtype === "Viewer") {
           // console.log("inside if");
            let data1 = {
                "firstName": data.firstName,
                "lastName": data.lastName,
                "email": data.email,
                "password": data.password,
                "obj": "Viewer"
            }
            $.ajax("http://cs5200-recommendation-system-project.us-east-2.elasticbeanstalk.com/api/user/register", {
                method: "post",
                dataType: "json",
                contentType: "application/json; charset=UTF-8",
                data: JSON.stringify(data1),
                success: (resp) => {
                    //console.log("success", resp);
                    //this.login(login_data);
                    this.get_person_list();
                    this.get_movie_list();
                    this.get_review_list();
                    this.get_link_list();
                    store.dispatch({
                        type: 'CLEAR_REGISTER_FORM',
                    })
                },
                error: (resp) => {
                    //console.log("error", resp);
                    // store.dispatch({
                    //     type: 'CLEAR_REGISTER_FORM',
                    // })
                },
            });
        } else if (data.dtype === "Critic") {
            let data1 = {
                "firstName": data.firstName,
                "lastName": data.lastName,
                "email": data.email,
                "password": data.password,
                "obj": "Critic"
            }
            $.ajax("http://cs5200-recommendation-system-project.us-east-2.elasticbeanstalk.com/api/critic/register", {
                method: "post",
                dataType: "json",
                contentType: "application/json; charset=UTF-8",
                data: JSON.stringify(data1),
                success: (resp) => {
                    //console.log("sucess", resp);
                    //this.login(login_data);
                    this.get_person_list();
                    this.get_movie_list();
                    this.get_review_list();
                    this.get_link_list();
                    store.dispatch({
                        type: 'CLEAR_REGISTER_FORM',
                    })
                },
                error: (resp) => {
                    //console.log("error", resp);
                    // store.dispatch({
                    //     type: 'CLEAR_REGISTER_FORM',
                    // })
                },
            });
        } else if (data.dtype === "Seller") {
            let data1 = {
                "firstName": data.firstName,
                "lastName": data.lastName,
                "email": data.email,
                "password": data.password,
                "obj": "Seller"
            }
            $.ajax("http://cs5200-recommendation-system-project.us-east-2.elasticbeanstalk.com/api/seller/register", {
                method: "post",
                dataType: "json",
                contentType: "application/json; charset=UTF-8",
                data: JSON.stringify(data1),
                success: (resp) => {
                    //console.log("sucess", resp);
                    //this.login(login_data);
                    this.get_person_list();
                    this.get_movie_list();
                    this.get_review_list();
                    this.get_link_list();
                    store.dispatch({
                        type: 'CLEAR_REGISTER_FORM',
                    })
                },
                error: (resp) => {
                    //console.log("error", resp);
                    // store.dispatch({
                    //     type: 'CLEAR_REGISTER_FORM',
                    // })
                },
            });
        }
    }

    delete_link(id){
        let URL = "http://cs5200-recommendation-system-project.us-east-2.elasticbeanstalk.com/api/link/"+id;
        $.ajax(URL , {
            method: "delete",
            success: (resp) => {
                //console.log("sucess", resp);
                this.get_person_list();
                this.get_movie_list();
                this.get_review_list();
                this.get_link_list();
            },
            error: (resp) => {
                //console.log("error", resp);
                // store.dispatch({
                //     type: 'CLEAR_REGISTER_FORM',
                // })
            },
        });
    }

    edit_link_by_admin(linkid, data){
        //console.log("saving link",data);
        let URL = "http://cs5200-recommendation-system-project.us-east-2.elasticbeanstalk.com/api/link/"+linkid;
        let data1 = {
            link: data
        };
        //console.log("url", URL);
        $.ajax(URL, {
            method: "put",
            contentType: "application/json; charset=UTF-8",
            data: JSON.stringify(data1),
            success: (resp) => {
               // console.log("sucess", resp);
                this.get_person_list();
                this.get_movie_list();
                this.get_review_list();
                this.get_link_list();
                store.dispatch({type:'CLEAR_BUY_FORM'});
            },
            error: (resp) => {
                //console.log("error", resp);
                // store.dispatch({
                //     type: 'CLEAR_REGISTER_FORM',
                // })
            },
        });
    }

    delete_review_by_admin(id){
        let URL = "http://cs5200-recommendation-system-project.us-east-2.elasticbeanstalk.com/api/review/"+id;
        $.ajax(URL , {
            method: "delete",
            success: (resp) => {
                //console.log("sucess", resp);
                this.get_person_list();
                this.get_movie_list();
                this.get_review_list();
                this.get_link_list();
            },
            error: (resp) => {
                //console.log("error", resp);
                // store.dispatch({
                //     type: 'CLEAR_REGISTER_FORM',
                // })
            },
        });
    }

    edit_review_by_admin( rid, title, desc){
        //console.log("rid", rid);
        let URL = "http://cs5200-recommendation-system-project.us-east-2.elasticbeanstalk.com/api/review/"+rid;
        let data1 = {
            "title": title,
            "description": desc
        };
        //console.log("url", URL);
        $.ajax(URL, {
            method: "put",
            contentType: "application/json; charset=UTF-8",
            data: JSON.stringify(data1),
            success: (resp) => {
                //console.log("sucess", resp);
                this.get_person_list();
                this.get_movie_list();
                this.get_review_list();
                this.get_link_list();
                store.dispatch({
                    type: 'CLEAR_REVIEW_FORM',
                })
            },
            error: (resp) => {
                //console.log("error", resp);
                // store.dispatch({
                //     type: 'CLEAR_REGISTER_FORM',
                // })
            },
        });
    }

    get_critics(){
        let URL = "http://cs5200-recommendation-system-project.us-east-2.elasticbeanstalk.com/api/critic";
        $.ajax(URL , {
            method: "get",
            dataType: "json",
            contentType: "application/json; charset=UTF-8",
            //data: JSON.stringify(data),
            success: (resp) => {
                //console.log("sucess", resp);

                //alert("added succesfully");
                store.dispatch({
                    type: 'CRITICS',
                    data: resp
                });
            },
            error: (resp) => {
                //console.log("error", resp);
                // store.dispatch({
                //     type: 'CLEAR_REGISTER_FORM',
                // })
            },
        });
    }

    get_critic_object(id){
        let URL = "http://cs5200-recommendation-system-project.us-east-2.elasticbeanstalk.com/api/critic/"+id;
        $.ajax(URL , {
            method: "get",
            dataType: "json",
            contentType: "application/json; charset=UTF-8",
            //data: JSON.stringify(data),
            success: (resp) => {
                //console.log("sucess", resp);

                //alert("added succesfully");
                store.dispatch({
                    type: 'CRITIC_OBJECT',
                    data: resp
                });
            },
            error: (resp) => {
                //console.log("error", resp);
                // store.dispatch({
                //     type: 'CLEAR_REGISTER_FORM',
                // })
            },
        });
    }





}

export default new TheServer();