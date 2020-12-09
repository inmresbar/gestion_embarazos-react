import React, { Component } from "react";
import { Button, Form, FormGroup, Label } from "reactstrap";
import axios from "axios";
import ReactDOM from 'react-dom';
import { Input} from 'antd';
import 'antd/dist/antd.css';


export default class Signup extends Component {
    userData;

    constructor(props) {
        super(props);
        this.state = {
            signupData: {
                name: "",
                email: "",
                phone: "",
                password: "",
                userType: "",
                isLoading: "",
            },
            msg: "",
        };
    }


    onChangehandler = (e, key) => {
        const {signupData} = this.state;
        signupData[e.target.name] = e.target.value;
        this.setState({signupData});
    };
    onSubmitHandler = (e) => {
        e.preventDefault();
        this.setState({isLoading: true});
        axios.post("http://pregnancy.test/api/register", this.state.signupData)
            .then((response) => {
                debugger;
                this.setState({isLoading: false});
                if (response.data.status === 200) {
                    this.setState({
                        msg: response.data.message,
                        signupData: {
                            name: "",
                            surname: "",
                            dni: "",
                            email: "",
                            password: "",
                            userType: "",
                            nusha: "",
                            dateOfBirth: "",
                            telephone: "",
                            bloodType: "",
                        },
                    });
                    setTimeout(() => {
                        this.setState({msg: ""});
                    }, 2000);
                }

                if (response.data.status === "failed") {
                    this.setState({msg: response.data.message});
                    setTimeout(() => {
                        this.setState({msg: ""});
                    }, 2000);
                }
            });
    };

    render() {
    const isLoading = this.state.isLoading;
    return (
        <div>
            <Form className="containers shadow">
                <FormGroup>
                    <Label for="name">Name</Label>
                    <Input
                        type="name"
                        name="name"
                        placeholder="Enter name"
                        value={this.state.signupData.name}
                        onChange={this.onChangehandler}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="surname">Surname</Label>
                    <Input
                        type="surname"
                        name="surname"
                        placeholder="Enter surname"
                        value={this.state.signupData.surname}
                        onChange={this.onChangehandler}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="dni">DNI</Label>
                    <Input
                        type="dni"
                        name="dni"
                        placeholder="Enter dni"
                        value={this.state.signupData.dni}
                        onChange={this.onChangehandler}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="email">Email id</Label>
                    <Input
                        type="email"
                        name="email"
                        placeholder="Enter email"
                        value={this.state.signupData.email}
                        onChange={this.onChangehandler}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="password">Password</Label>
                    <Input
                        type="password"
                        name="password"
                        placeholder="Enter password"
                        value={this.state.signupData.password}
                        onChange={this.onChangehandler}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="userType"></Label>
                    <Input
                        type="userType"
                        name="userType"
                        placeholder="Enter userType"
                        value={this.state.signupData.password}
                        onChange={this.onChangehandler}
                    />
                </FormGroup>
                <p className="text-white">{this.state.msg}</p>
                <Button
                    className="text-center mb-4"
                    color="success"
                    onClick={this.onSubmitHandler}
                >
                    Sign Up
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
                <Link to="/sign-in" className="text-white ml-5">I'm already member</Link>
            </Form>
        </div>
    );
}
}