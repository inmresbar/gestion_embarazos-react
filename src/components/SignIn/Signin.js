import React, {Component} from "react";
import axios from "axios"
import {Button, Input, Space, Col, Row} from "antd";
import { Redirect } from "react-router-dom";

export default class Signin extends Component {
    userData;

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            email: "",
            password: "",
        };
    }

    onChangehandler = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        let data = {};
        data[name] = value;
        this.setState(data);
    };

    onSubmitHandler = () => {
        this.setState({isLoading: true});

        axios.post("http://pregnancy.test/api/auth/login", {
            email: this.state.email,
            password: this.state.password,
        })
            .then((response) => {
                console.log(response)
                localStorage.setItem("accessToken", response.data.access_token);
                this.setState({
                    msg: response.data.message,
                    redirect:"/home",
                });
            })
            .catch(error=>{
                console.log(error)
            });
    };

    state= {redirect:null};

    render() {
        if(this.state.redirect){
            return<Redirect to={this.state.redirect}/>
        }

        const isLoading = this.state.isLoading;

            return (
                <div className="containers">
                    <Row justify="center">
                    <br/>
                    <br/>
                    <Col span={8}>
                    <Input name="email" placeholder="Email" onChange={this.onChangehandler}/>
                    <br/>
                    <br/>
                    <Space direction="vertical">
                        <Input.Password name="password" placeholder="input password"
                                        onChange={this.onChangehandler}/>
                    </Space>
                        <br/>
                        <br/>
                    <Button type="primary"
                            onClick = {this.onSubmitHandler} >
                        Iniciar sesión
                    </Button>
                    </Col>
                    </Row>
                </div>
            );
    }
}
