import React, { Component } from "react";
import axios from "axios";
import {Table, Space, Button, Popconfirm, Menu} from 'antd';
import {SettingOutlined } from '@ant-design/icons';

const { SubMenu } = Menu;
const TableContext = React.createContext(false);

export default class Home extends Component {

    constructor(props) {
        super(props)
        this.state = {users: []}

        this. columns = [
            {
                title: 'Nombre',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: 'Apellidos',
                dataIndex: 'surname',
                key: 'surname',
            },
            {
                title: 'DNI',
                dataIndex: 'dni',
                key: 'dni',
            },
            {
                title: 'Acciones',
                dataIndex: 'operation',
                render: (_, record) =>
                    this.state.users.length >= 1 ? (
                        <Space size="middle">
                            <Button type="primary"
                                    onClick={this.handleClickEdit(record.id)} style={{background: "#d4b106" , borderColor: "#d4b106" }}>
                                Editar
                            </Button>

                            <Button type="primary"
                                    onClick={this.handleClickShow(record.id)}>
                                Mostrar
                            </Button>

                            <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record.id)}>
                                <a>Eliminar</a>
                            </Popconfirm>
                        </Space>
                    ) : null,
            },
        ];
    }

    componentDidMount() {
        const token=localStorage.getItem("accessToken");
        axios.get("http://pregnancy.test/api/auth/index",{
            headers: {
                Authorization: "Bearer " + token
            }
        })
            .then(response => {
            this.setState({
                users: response.data
            })
        })
            .catch(error=>{
                console.log(error)
            });
    }

    handleClickEdit = value => () => {
        console.log(value);
        localStorage.setItem("data", JSON.stringify(value));
        this.props.history.push("/editUser");
    };

    handleClickShow = value => () => {
        console.log(value);
        localStorage.setItem("data", JSON.stringify(value));
        this.props.history.push("/showUser");
    };

    handleClickCreate = value => () => {
        this.props.history.push("/Signup");
    };

    handleClickIndexPlace=()=>{
        this.props.history.push("/indexPlaces");
    }

    handleClickDelete=value=>(e) =>{
        e.preventDefault();
        const token=localStorage.getItem("accessToken");
        //console.log(this.state.user)
        console.log(value.id)
        axios.delete("http://pregnancy.test/api/auth/delete/"+value.id,{
            headers: {
                Authorization: "Bearer " + token
            }
        })
            // .then(response => {
            //        msg: response.data.msg
            //         //redirect:"/home",
            //     debugger
            //     console.log(this.state.user)
            // })
           /* .catch(error=>{
                console.log(error)
            });*/
    }

    state = {
        current: 'mail',
    };

    handleClick = e => {
        console.log('click ', e);
        this.setState({ current: e.key });
    };

    render() {
        const { current } = this.state;
        return (
            <div>

                {/*<Button
                    onClick={this.handleClickIndexPlace}
                    type="primary"
                    style={{
                        marginBottom: 16,
                    }}
                >
                    Consultas
                </Button>*/}
                <Menu onClick={this.handleClick} selectedKeys={[current]} mode="horizontal">
                    <SubMenu key="SubMenu" icon={<SettingOutlined />} title="Índice">
                    {/*<Menu.ItemGroup title="Item 1">
                        <Menu.Item key="setting:1">Option 1</Menu.Item>
                        <Menu.Item key="setting:2">Option 2</Menu.Item>
                    </Menu.ItemGroup>*/}
                    <Menu.Item onClick={this.handleClickIndexPlace}
                    >Consultas</Menu.Item>

                </SubMenu>
                </Menu>

                <Table columns={this.columns} dataSource={this.state.users}/>
            </div>
        );

    }
    /*renderList(){

        return this.state.user.map((data)=>{
           //console.log(data);

            return(
                <tr>
                    <td>{data.surname}</td>
                    <td>{data.name}</td>
                    <td>{data.dni}</td>
                    <td>
                        <Button type="primary"
                                onClick={this.handleClickEdit(data)} style={{background: "#d4b106" , borderColor: "#d4b106" }}>
                            Editar
                        </Button>

                        <Button type="primary"
                        onClick={this.handleClickShow(data)}>
                        Mostrar
                        </Button>

                        <Button type="danger"
                                onClick={this.handleClickDelete(data)}>
                            Eliminar
                        </Button>

                    </td>
                </tr>
            )

        })

    }*/

}

