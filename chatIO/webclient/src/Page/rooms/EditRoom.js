import FormPage from '../../containers/FormPage';
import React from 'react';
import Data from '../../data';
import {get} from '../../components/fetch';

export default class EditRoom extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            data: [],
            ...props,
            formData:{}
        };
    }

    updateRoom(data){
        console.log(data);
    }

    componentDidMount(){
        let self=this;
        var dt= this.state.data;
        get("/room/"+this.props.params.id).then(res=>{
            self.setState({
                formData:res.data
            })
        })
        get("/users").then(res=>{
            dt.users=res.data;
            self.setState({
                data:dt
            })
        });
    }

    render() {
        return (
            <div>
                <FormPage pageName="Sửa khóa học" onPost={this.updateRoom.bind(this)} columns={Data.room.columns.filter(x=>x.hidden==false)} formData={this.state.formData} data={this.state.data} />
            </div>
        )
    }
}