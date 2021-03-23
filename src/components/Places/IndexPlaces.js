import axios from "axios";
import { Table, Layout, Space, Button, Popconfirm, Breadcrumb } from 'antd';
import React,{ Component,useState } from "react";

const { Header, Content, Footer } = Layout;

export default class indexPlaces extends Component {

    constructor(props) {
        super(props)
        this.state = {
            places: []
        }
        this. columns = [
            {
                title: 'Hospital',
                dataIndex: 'hospital',
                key: 'hospital',
            },
            {
                title: 'Localidad',
                dataIndex: 'city',
                key: 'city',
            },
            {
                title: 'Dirección',
                dataIndex: 'address',
                key: 'address',
            },
            {
                title: 'Consulta',
                dataIndex: 'examinationRoom',
                key: 'examinationRoom',
            },
            {
                title: 'Acciones',
                dataIndex: 'operation',
                render: (_, record) =>
                    this.state.places.length >= 1 ? (
                        <Space size="middle">
                            <Button type="primary"
                                    //loading={this.state.loading}
                                    onClick={this.handleClickEdit(record)}  style={{background: "#d4b106" , borderColor: "#d4b106" }}>
                                Editar
                            </Button>
                            <Popconfirm type="primary" danger title="¿Quiere eliminar la consulta?" onConfirm={() => this.handleDelete(record.id)}>
                                <Button type="primary" danger>Eliminar</Button>
                            </Popconfirm>
                        </Space>
                    ) : null,
            },
        ];
        //this.handleClickEdit = this.handleClickEdit.bind(this);
    }

    componentDidMount() {
        const token = localStorage.getItem("accessToken");
        axios.get("http://pregnancy.test/api/auth/indexPlace", {
            headers: {
                Authorization: "Bearer " + token
            }
        })
            .then(response => {
                this.setState({
                    places:response.data
                })
                //debugger
            })

            .catch(error => {
                console.log(error)
            });
    }

    handleClickEdit = value =>()=> {

        //console.log(value);
        //console.log("antes de eliminar"+JSON.stringify(localStorage.getItem('place')));
        localStorage.removeItem('place');
        //console.log("despues de eliminar"+JSON.stringify(localStorage.getItem('place')));
        localStorage.setItem("place", JSON.stringify(value));
       // console.log("guardado"+JSON.stringify(localStorage.getItem('place')));
        this.props.history.push("/editPlace");
        window.location.reload();
    };

    handleCreate = () => {
        this.props.history.push("/createPlace");
    };

    handleDelete = (key) => {
        //key.preventDefault();
        const token = localStorage.getItem("accessToken");
        console.log(key)

        axios.delete("http://pregnancy.test/api/auth/deletePlace/"+key, {
            headers: {
                Authorization: "Bearer " + token

            }

        })
            .then((response) => {
               // debugger
                //this.setState({isLoading: false});
                window.location.reload();
                console.log(response)
                this.setState({
                    msg:response,
                    redirect: "/indexPlaces",


                });


            })
            .catch(error => {
                console.log(error)
            })
    };

    state = {redirect: null};

    render(){
        return(
            <Layout className="layout">
                <Content style={{ padding: '0 50px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Button
                            onClick={this.handleCreate}
                            type="primary"
                            style={{
                                marginBottom: 16,
                            }}
                        >
                            Crear consulta
                        </Button>
                    </Breadcrumb>
                    <div className="site-layout-content">
                        <Table columns={this.columns} dataSource={this.state.places}/>
                    </div>
                </Content>
                {/*<Footer style={{ textAlign: 'center' }}>*/}
                               {/* <Button
                    onClick=this.props.history.push("/indexPlaces");
                    type="primary"
                    style={{
                        marginBottom: 16,
                    }}
                >
                    Volver a usuarios
                </Button>*/}
            </Layout>
        )
    }

     /*   return{
            <div class="container">

                <Button type="primary"
                        onClick={this.handleClickCreate()}>
                    Nueva consulta
                </Button>
                <br/>
                <br/>
                <h3>Consultas registradas</h3>
                <hr/>
                <table class="table table-bordered order-table ">
                    <thead>
                    <tr>
                        <th>Hospital</th>
                        <th>Localidad</th>
                        <th>Dirección</th>
                        <th>Consulta</th>
                    </tr>
                    </thead>
                    <tbody id="bodytable">
                    {this.renderList()}
                    </tbody>
                </table>
            </div>
    }*/

    /*renderList(){

        return this.state.place.map((data)=>{
            //console.log(data);
            console.log(data);
            return(
                <tr>
                    <td>{data.hospital}</td>
                    <td>{data.city}</td>
                    <td>{data.address}</td>
                    <td>{data.examinationRoom}</td>
                    <td>

                        <Button type="primary"
                                onClick={this.handleClickEdit(data)} style={{background: "#d4b106" , borderColor: "#d4b106" }}>
                            Editar
                        </Button>

                       {/!* <Button type="danger"
                                onClick={this.handleClickDelete(data)}>
                            Eliminar
                        </Button>*!/}
                    </td>
                </tr>
            )

        })

    }*/

}