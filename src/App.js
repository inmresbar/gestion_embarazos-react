import React, { Component } from "react";
import "./App.css";
import Signup from "./components/SignUp/Signup";
import Signin from "./components/Signin";
import Home from "./components/Home"
import { BrowserRouter as Router, Route, NavLink, Switch } from "react-router-dom";
import { Anchor } from 'antd';

const { Link } = Anchor;

export default class App extends Component {
    /*render() {
        let navLink = (
            <div className="Tab">
                <NavLink exact to="/" activeClassName="activeLink" className="signUp">
                    Sign Up
                </NavLink>

                <NavLink to="/sign-in" activeClassName="activeLink" className="Signin">
                    Sign In
                </NavLink>
            </div>
        );*/
    render () {
        return(
        <Router>
            <div className="App">
                <ul>
                    <li>
                        <NavLink to="/" activeClassName="activeLink" className="signUp">Registro</NavLink>
                    </li>
                    <li>
                        <NavLink to="/sign-in" activaClassName="activeLink" className="signIn">Iniciar sesión</NavLink>
                    </li>
                </ul>
                <Switch>
                    <Route exact path="/" component={Signup}/>
                </Switch>
                <Switch>
                    <Route exact path="/sign-in" component={Signin}/>
                </Switch>
                <Switch>
                    <Route path="/home" component={Home}/>
                </Switch>
            </div>
        </Router>
        );
    }
}