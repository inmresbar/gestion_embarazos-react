import React, {Component} from 'react';
import 'antd/dist/antd.css';
import {Select, Typography, Space, Col, Row} from 'antd';
import axios from "axios";
import moment from 'moment';
const { Text, Link , Paragraph} = Typography;

const { Option } = Select;
const birth = new Date();

export default class Signup extends Component {
    userData;

    constructor(props) {
        super(props);
        this.state = {
           /* signupData: {
                name: "",
                surname: "",
                dni: "",
                email: "",
                password: "",
                userType: "",
                nuhsa: "",
                dateOfBirth: "",
                telephone: "",
                bloodType: "",
                isLoading: "",
            },*/
            msg: "",
            user: JSON.parse(localStorage.getItem("data")),
        };
    }

    componentDidMount() {
        const token=localStorage.getItem("accessToken");
        console.log(this.state.user)
        axios.get("http://pregnancy.test/api/auth/show/"+this.state.user.id,{
            headers: {
                Authorization: "Bearer " + token
            }
        })
            .then(response => {
                this.setState({
                    user: response.data
                })
                console.log(this.state.user)
            })
            .catch(error=>{
                console.log(error)
            });
    }

    render() {
        return (

            <div className="site-input-group-wrapper">
                <Row justify="center">
                    <Col span={12}>
                        <br/>
                        <br/>
                        <Paragraph> <Text strong>Nombre:</Text>{this.state.user.name}</Paragraph>
                        <Paragraph><Text strong>Apellidos: </Text>{this.state.user.surname}</Paragraph>
                        <Paragraph><Text strong>DNI: </Text>{this.state.user.dni}</Paragraph>
                        <Paragraph><Text strong>Tipo de usuario: </Text>{this.state.user.userType}</Paragraph>
                        <Paragraph><Text strong>Email: </Text>{this.state.user.email}</Paragraph>
                        <Paragraph><Text strong>Nuhsa: </Text>{this.state.user.nuhsa}</Paragraph>
                        <Paragraph><Text strong>Fecha de nacimiento: </Text>{this.state.user.dateOfBirth}</Paragraph>
                        <Paragraph><Text strong>Teléfono: </Text>{this.state.user.telephone}</Paragraph>
                        <Paragraph><Text strong>Grupo sanguíneo: </Text>{this.state.user.bloodType}</Paragraph>
                        {/*<Button type="primary"
                                onClick={this.onSubmitHandler}>
                            Actualizar
                        </Button>*/}
                    </Col>
                </Row>
            </div>
        );

    }
}