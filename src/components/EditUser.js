import React, {Component} from 'react';
import 'antd/dist/antd.css';
import {Select, Input, Button, Radio, Space, DatePicker, Row, Col} from 'antd';
import axios from "axios";
import moment from 'moment';

const { Option } = Select;
const birth = new Date();
const user=JSON.parse(localStorage.getItem("data"));

const handleEditUserFormData = values => new Promise((resolve, reject)=>{
    const {
        name,
        surname,
        dni,
        userType,
        email,
        nuhsa,
        dateOfBirth,
        telephone,
        bloodType,
        id,
    } = values;

    const editTareaFormData = new FormData();

    if(name){
        editTareaFormData.append('name', name.trim());
    }

    if(surname){
        editTareaFormData.append('surname', surname.trim());
    }

    if(dni){
        editTareaFormData.append('dni', dni.trim());
    }

    if(userType){
        editTareaFormData.append('userType', userType.trim());
    }

    if(email){
        editTareaFormData.append('email', email.trim());
    }

    if(nuhsa){
        editTareaFormData.append('nuhsa', nuhsa.trim());
    }

    if(dateOfBirth){
        editTareaFormData.append('dateOfBirth', dateOfBirth.trim());
    }
    else{
        editTareaFormData.append('dateOfBirth', "");
    }

    if(telephone){
        editTareaFormData.append('telephone', telephone.trim());
    }
    else{
        editTareaFormData.append('telephone', "");
    }

    console.log(user.telephone);

    if(bloodType){
        editTareaFormData.append('bloodType', bloodType.trim());
    }
    else{
        editTareaFormData.append('bloodType', "");
    }

    editTareaFormData.append('_method', 'PUT')

    const accessToken = localStorage.getItem('access_token');

    axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

    axios.post(`http://pregnancy.test/api/auth/update/${id}`, editTareaFormData)

        .then(response => {

            resolve(response);

        })

        .catch(error => {

            reject(error);

        });
});

export default class editUser extends Component {

    constructor(props) {
        super(props);
        this.state=user;
}

    render() {
        console.log(user);
        return (


            <div className="site-input-group-wrapper">
                <Row justify="center">
                    <Col span={12}>
                        <br/>
                        <br/>
                        <label>Nombre</label>
                        <Input name="name" defaultValue={user.name} onChange={this.onChangehandler}/>
                        <br/>
                        <br/>
                        <label>Apellidos</label>
                        <Input name="surname" defaultValue={user.surname} onChange={this.onChangehandler}/>
                        <br/>
                        <br/>
                        <label>DNI</label>
                        <Input name="dni" defaultValue={user.dni} onChange={this.onChangehandler}/>
                        <br/>
                        <br/>
                        <label>Usuario</label>
                        <br/>
                        <Radio.Group name="userType" onChange={this.onChangehandler}
                                     defaultValue={user.userType}>
                            <Radio value={'clinicalStaff'}>Personal clínico</Radio>
                            <Radio value={'pregnant'}>Embarazada</Radio>
                            <Radio value={'admin'}>Administrador</Radio>
                        </Radio.Group>
                        <br/>
                        <br/>
                        <label>Email</label>
                        <Input name="email" onChange={this.onChangehandler} defaultValue={user.email}/>
                        <br/>
                        <br/>
                        {/*<label>Contraseña</label>
                        <Space direction="vertical">
                            <Input.Password name="password"
                                            onChange={this.onChangehandler}/>
                            <Input.Password
                            placeholder="input password"
                            iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                        />
                        </Space>
                        <br/>
                        <br/>*/}
                        <label>Nuhsa</label>
                        <Input name="nuhsa" onChange={this.onChangehandler} defaultValue={user.nuhsa}/>
                        <br/>
                        <br/>
                        <label>Fecha de nacimiento</label>
                        <Space direction="vertical">
                            <DatePicker name="dateOfBrith" onChange={this.dateHandler}
                                        value={moment(user.dateOfBirth)}/>
                        </Space>
                        <br/>
                        <br/>
                        <label>Teléfono</label>
                        <Input name="telephone" onChange={handleEditUserFormData} defaultValue={user.telephone}/>
                        <br/>
                        <br/>
                        <label>Grupo sanguíneo</label>
                        <Select
                            style={{width: 300}}
                            name="bloodType"
                            defaultValue={[user.bloodType]}
                            onChange={this.onSelectHandler}
                            filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }>
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
                        <br/>
                        <br/>
                        { /*<Button type="primary"
                                onClick={onsubmit(user)}>
                            Actualizar
                        </Button>*/}
                    </Col>
                </Row>
            </div>
        );
    }
}


