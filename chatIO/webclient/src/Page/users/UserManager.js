import TablePage from '../../containers/TablePage';
import React from 'react';
import Data from '../../data';
import { get, post } from '../../components/fetch';

export default class UserManager extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [{
                _id: "",
                username: ""
            }]
        };
    }

    componentWillMount() {
        let self = this;
        get("/users")
            .then(res => {
                console.log(res);
                if (res.status == "OK") {
                    self.setState({
                        data: res.data
                    });
                }
            })
    }

    refreshData() {
        let self = this;
        get("/users").then(res => {
            console.log(res);
            if (res.status == "OK") {
                self.setState({
                    data: res.data
                });
            }
        })
    }

    deleteUser(id){
        post(Data.user.action.delete.apiUri,{ id: id }).then(res => {
            alert(res.message);
            this.refreshData();
        })
    }

    render() {
        return (
            <div>
                <TablePage pageName="Quản lý thành viên" onDelete={this.deleteUser.bind(this)} refreshData={this.refreshData.bind(this)} columns={Data.user.columns} action={Data.user.action} data={this.state.data} />
            </div>
        )
    }
}