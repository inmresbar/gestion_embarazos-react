import React, {Component} from 'react';
import 'antd/dist/antd.css';
import {Form, Select, Input, Button, Radio, Space, DatePicker, Row, Col} from 'antd';
import axios from "axios";
import {Redirect} from "react-router-dom";

const { Option } = Select;
const birth = new Date();

export default class Signup extends Component {
    userData;

    constructor(props) {
        super(props);
        this.state = {
            signupData: {
                name: "",
                surname:"",
                dni:"",
                email: "",
                password: "",
                userType: "",
                nuhsa: "",
                dateOfBirth: "",
                telephone: "",
                bloodType: "",
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

    onSelectHandler = (value) => {
        const {signupData} = this.state;
        signupData['bloodType'] = value;
        this.setState({signupData});
    }

    dateHandler = (date) => {
        const {signupData} = this.state;
        if (date){
            birth.setTime(Date.parse(date._d));
            signupData['dateOfBirth'] = birth.toISOString().slice(0,10);
        } else {
            signupData['dateOfBirth'] = '';
        }
        this.setState({signupData});

    }

    onSubmitHandler = (e) => {
        const token=localStorage.getItem("accessToken");
        e.preventDefault();
        this.setState({isLoading: true});
        axios.post("http://pregnancy.test/api/auth/register", this.state.signupData, {
            headers: {
                Authorization: "Bearer " + token
            }
        })

            .then((response) => {
                //console.log(response)
                this.setState({isLoading: false});
                    this.setState({
                        msg: response.data.message,
                        signupData: {
                            name: "",
                            surname:"",
                            dni:"",
                            email: "",
                            password: "",
                            userType: "",
                            nuhsa: "",
                            dateOfBirth: "",
                            telephone: "",
                            bloodType: "",
                            isLoading: "",
                        },
                       // redirect:"/home",
                    });
                    setTimeout(() => {
                        this.setState({msg: ""});
                    }, 2000);

                
            })
            .catch(error=>{
                console.log(error)
            })
    };

    state= {redirect:null};

    render() {
        if(this.state.redirect){
            return<Redirect to={this.state.redirect}/>
        }

        const isLoading = this.state.isLoading;

            return (
                <div className="containers shadow">
                    <Row justify="center">
                        <Col span={12}>
                    <br/>
                    <br/>
                    <Input name="name" placeholder="Nombre" onChange={this.onChangehandler}/>
                    <br/>
                    <br/>
                    <Input name="surname" placeholder="Apellido" onChange={this.onChangehandler}/>
                    <br/>
                    <br/>
                    <Input name="dni" placeholder="DNI" onChange={this.onChangehandler}/>
                    <br/>
                    <br/>
                    <Radio.Group name="userType" onChange={this.onChangehandler}>
                        <Radio value={'clinicalStaff'}>Personal clínico</Radio>
                        <Radio value={'pregnant'}>Embarazada</Radio>
                        <Radio value={'admin'}>Administrador</Radio>
                    </Radio.Group>
                    <br/>
                    <br/>
                    <Input name="email" placeholder="Email" onChange={this.onChangehandler}/>
                    <br/>
                    <br/>
                    <Space direction="vertical">
                        <Input.Password name="password" placeholder="input password"
                                        onChange={this.onChangehandler}/>
                        {/*<Input.Password
                            placeholder="input password"
                            iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                        />*/}
                    </Space>
                    <br/>
                    <br/>
                    <Input name="nuhsa" placeholder="Nuhsa" onChange={this.onChangehandler}/>
                    <br/>
                    <br/>
                    <Space direction="vertical">
                        <DatePicker name="dateOfBrith" placeholder="Fecha de nacimiento" onChange={this.dateHandler} />
                    </Space>
                    <br/>
                    <br/>
                    <Input name="telephone" placeholder="Telefono" onChange={this.onChangehandler}/>
                    <br/>
                    <br/>
                    <Select
                        style={{ width: 300 }}
                        name="bloodType"
                        placeholder="Selecciona grupo sanguineo"
                        onChange={this.onSelectHandler}
                        filterOption={(input, option) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                    >
                        <Option name="bloodType" value=" "></Option>
                        <Option name="bloodType" value="A+">A+</Option>
                        <Option name="bloodType" value="A-">A-</Option>
                        <Option name="bloodType" value="B+">B+</Option>
                        <Option name="bloodType" value="B-">B-</Option>
                        <Option name="bloodType" value="AB+">AB+</Option>
                        <Option name="bloodType" value="AB-">AB-</Option>
                        <Option name="bloodType" value="O+">O+</Option>
                        <Option name="bloodType" value="O-">O-</Option>
                    </Select>

                    <p className="text-white">{this.state.msg}</p>

                    <Button type="primary"
                        onClick = {this.onSubmitHandler} >
                        Registrar usuario
                    </Button>
                        </Col>
                    </Row>
                </div>
            );

    }
}