import TablePage from '../../containers/TablePage';
import React from 'react';
import Data from '../../data';
import {get, post} from '../../components/fetch';
import { browserHistory } from 'react-router';

export default class RoomManager extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
    }

    componentWillMount() {
        this.refreshData();
    }

    refreshData() {
        let self = this;
        get("/rooms").then(res => {
            console.log(res);
            if (res.status == "OK") {
                self.setState({
                    data: res.data
                });
            }
        })
    }

    deleteRoom(id){
        post(Data.room.action.delete.apiUri,{ id: id }).then(res => {
            alert(res.message);
            this.refreshData();
        })
    }

    edit(room){
        browserHistory.push("/editroom/"+room._id)
    }

    render() {
        return (
            <div>
                <TablePage pageName="Quản lý khóa học" onEdit={this.edit.bind(this)} onDelete={this.deleteRoom.bind(this)} refreshData={this.refreshData.bind(this)} columns={Data.room.columns} action={Data.room.action}  data={this.state.data} />
            </div>
        )
    }
}