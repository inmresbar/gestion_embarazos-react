import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import {Space, Input,Button} from "antd";

export default class Signin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            msg: "",
            isLoading: false,
            redirect: false,
            errMsgEmail: "",
            errMsgPwd: "",
            errMsg: "",
        };
    }
    onChangehandler = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        let data = {};
        data[name] = value;
        this.setState(data);
    };

    onSignInHandler = () => {
        this.setState({ isLoading: true });
        axios
            .post("http://pregnancy.test/api/login", {
                email: this.state.email,
                password: this.state.password,
            })
            .then((response) => {
                this.setState({ isLoading: false });
                if (response.data.status === 200) {
                    localStorage.setItem("isLoggedIn", true);
                    localStorage.setItem("userData", JSON.stringify(response.data.data));
                    this.setState({
                        msg: response.data.message,
                        redirect: true,
                    });
                }
                if (
                    response.data.status === "failed" &&
                    response.data.success === undefined
                ) {
                    this.setState({
                        errMsgEmail: response.data.validation_error.email,
                        errMsgPwd: response.data.validation_error.password,
                    });
                    setTimeout(() => {
                        this.setState({ errMsgEmail: "", errMsgPwd: "" });
                    }, 2000);
                } else if (
                    response.data.status === "failed" &&
                    response.data.success === false
                ) {
                    this.setState({
                        errMsg: response.data.message,
                    });
                    setTimeout(() => {
                        this.setState({ errMsg: "" });
                    }, 2000);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    render() {
        if (this.state.redirect) {
            return <Redirect to="/home" />;
        }
        const login = localStorage.getItem("isLoggedIn");
        if (login) {
            return <Redirect to="/home" />;
        }
        const isLoading = this.state.isLoading;
        return (
            <div className="containers">
                    <Input name="email" placeholder="Email" onChange={this.onChangehandler}/>
                    <br/>
                    <br/>
                    <Space direction="vertical">
                        <Input.Password name="password" placeholder="input password"
                                        onChange={this.onChangehandler}/>
                    </Space>
                    <p className="text-danger">{this.state.errMsg}</p>
                    <Button
                        className="text-center mb-4"
                        color="success"
                        onClick={this.onSignInHandler}
                    >
                        Sign In
                        {isLoading ? (
                            <span
                                className="spinner-border spinner-border-sm ml-5"
                                role="status"
                                aria-hidden="true"
                            ></span>
                        ) : (
                            <span></span>
                        )}
                    </Button>
            </div>
                        );
    }
}
