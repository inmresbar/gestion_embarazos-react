import React, {Component} from "react";
import axios from "axios";
import {Redirect} from "react-router-dom";
import {Button, Form, Checkbox, Col, Input, Row} from "antd";

const place=JSON.parse(localStorage.getItem("place"));

//console.log(place);

const handleEditPlaceFormData = (values) =>new Promise((resolve, reject) => {
    const {
        hospital,
        city,
        address,
        examinationRoom,
        id,
    } = values;

    const editPlaceFormData = new FormData();
    if(hospital){
        editPlaceFormData.append('hospital', hospital.trim());
    }

    if(city){
        editPlaceFormData.append('city', city.trim());
    }

    if(address){
        editPlaceFormData.append('address', address.trim());
    }

    if(examinationRoom){
        editPlaceFormData.append('exainationRoom', examinationRoom.trim());
    }

    editPlaceFormData.append('_method', 'PUT')

    const accessToken = localStorage.getItem('access_token');

    axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

    axios.post(`http://pregnancy.test/api/auth/updatePlace/${id}`, editPlaceFormData)

        .then(response => {

            resolve(response);

        })

        .catch(error => {

            reject(error);

        });

});

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

    constructor(props) {
        super(props);
        this.state = {
            placeData: {
                hospital: "",
                city: "",
                address: "",
                examinationRoom: "",
            }
        }
    }


    onSubmitHandler = (e) => {
        //const nombre = place
        //debugger
        const token = localStorage.getItem("accessToken");
        this.setState({isLoading: true});
        axios.put("http://pregnancy.test/api/auth/updatePlace/"+place.id, e,{
            headers: {
                Authorization: "Bearer " + token
            }
        })

            .then((response) => {
                this.setState({isLoading: false});
                this.setState({
                    msg: response.data.message,
                    redirect: "/indexPlaces",
                });
                setTimeout(() => {
                    this.setState({msg: ""});
                }, 2000);


            })
            .catch(error => {
                console.log(error)
            })
    };

    state = {redirect: null};

    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect}/>
        }

        const isLoading = this.state.isLoading;
        console.log(place)
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
                    initialValue={place.hospital}
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
                    initialValue={place.city}
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
                   initialValue={place.address}
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
                   initialValue={place.examinationRoom}
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
                        Editar
                    </Button>
                </Form.Item>
            </Form>
        );

    };
}