import React, {Component} from "react";
import axios from "axios";
import {Redirect} from "react-router-dom";
import {Button, Col, Form, Input, Row} from "antd";

const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 8,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 16,
    },
};

export default class IndexPlaces extends Component {
    placeData;

    constructor(props){
        super(props);
        this.state={
            placeData:{
                hospital:"",
                city:"",
                address:"",
                examinationRoom:"",
            }
        }
    }

    onChangehandler = (e, key) => {
        const {placeData} = this.state;
        placeData[e.target.name] = e.target.value;
        this.setState({placeData});
    };

    onSubmitHandler = (e) => {

        const token=localStorage.getItem("accessToken");
        this.setState({isLoading: true});
        axios.post("http://pregnancy.test/api/auth/storePlace", e, {
            headers: {
                Authorization: "Bearer " + token
            }
        })

            .then((response) => {
                console.log(response)
                this.setState({isLoading: false});
                this.setState({
                    msg: response.data.message,
                    redirect:"/indexPlaces",
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

            <Form
                {...layout}
                name="basic"
                initialValues={{
                    remember: true,
                }}
                //onFinish={onFinish}
                //onFinishFailed={onFinishFailed}
                onFinish={this.onSubmitHandler}
            >
                <Form.Item
                    label="Hospital"
                    name="hospital"
                    rules={[
                        {
                            required: true,
                            message: 'Introduzca el nombre del hospital',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Localidad"
                    name="city"
                    rules={[
                        {
                            required: true,
                            message: 'Introduzca la localidad',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Dirección"
                    name="address"
                    rules={[
                        {
                            required: true,
                            message: 'Introduzca la dirección',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Consulta"
                    name="examinationRoom"
                    rules={[
                        {
                            required: true,
                            message: 'Introduzca la consulta',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        );

    }

}