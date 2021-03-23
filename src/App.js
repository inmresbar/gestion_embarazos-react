import React, { Component } from "react";
import "./App.less";
import Signup from "./components/SignUp/Signup";
import Signin from "./components/SignIn/Signin";
import Home from "./components/Home";
import EditUser from "./components/EditUser";
import ShowUser from "./components/ShowUser";
import CreatePlace from"./components/Places/CreatePlace";
import IndexPlaces from"./components/Places/IndexPlaces";
import EditPlace from"./components/Places/EditPlace";
import {BrowserRouter as Router, Route, NavLink, Switch, BrowserRouter, Redirect} from "react-router-dom";
import {Anchor, Col, PageHeader, Row, Typography, Divider} from 'antd';
import logo from './logo.png';

const { Link } = Anchor;
const{Title}=Typography;

class App  extends Component {
    /*state = {redirect:null}
    render() {
        if(this.state.redirect){
            return <Redirect to={this.state.redirect} />
        }*/
    render(){
        return(
                <div className="App">
                    <BrowserRouter>
                        <Switch>
                    <header className="App-header">
                        <Divider orientation="center" plain>
                            <img src={logo} className="App-logo" alt="logo"/>
                            <br/>
                            <br/>
                            <p>
                                <Title>Gestión de embarazos</Title>
                            </p>
                        </Divider>
                        <NavLink to="/" activeClassName="activeLink" classname="signIn"></NavLink>
                            <Route exact path="/" component={Signin}/>
                            <Route exact path="/home" component={Home} />
                            <Route exact path="/editUser" component={EditUser} />
                            <Route exact path="/signup" component={Signup}/>
                            <Route exact path="/showUser" component={ShowUser}/>
                            <Route exact path="/createPlace" component={CreatePlace}/>
                            <Route exact path="/indexPlaces" component={IndexPlaces}/>
                            <Route exact path="/editPlace" component={EditPlace}/>
                    </header>
                        </Switch>
                    </BrowserRouter>
                        </div>
        );
    }
}

export default App;