import FormPage from '../../containers/FormPage';
import React from 'react';
import Data from '../../data';
import {get, post} from '../../components/fetch';
import { Link, browserHistory } from 'react-router';


export default class CreateRoom extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            data: {
                users: []
            },
            ...props
        };

    }

    componentDidMount(){
        let self=this;
        get("/users").then(res=>{
            console.log(res.data);
            self.setState({
                data:{
                    users:res.data
                }
            })
        });
    }

    createUser(data){
        data.roomtype="COURSE";
        post(Data.room.action.create.apiUri, data)
        .then(res=>{
            console.log(res);
            alert(res.message);
            browserHistory.goBack();
        })
    }

    render() {
        return (
            <div>
                <FormPage pageName="Thêm khóa học" onPost={this.createUser.bind(this)} columns={Data.room.columns.filter(x=>x.hidden==false)} formData={{}} data={this.state.data} />
            </div>
        )
    }
}