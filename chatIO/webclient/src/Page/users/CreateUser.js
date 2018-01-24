import FormPage from '../../containers/FormPage';
import React from 'react';
import Data from '../../data';
import {post } from '../../components/fetch';
import { browserHistory } from 'react-router';

export default class CreateUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                users: []
            },
            ...props
        };
    }

    componentDidMount() {
        let self = this;
        self.setState({
            data: {
                roleId: [
                    {_id: "STUDENT", name: "STUDENT"},
                    {_id: "TEACHER", name: "TEACHER"}
                ]
            }
        })
    }

    createUser(data) {
        post(Data.user.action.create.apiUri, data)
            .then(res => {
                console.log(res);
                alert(res.message);
                browserHistory.goBack();
            })
    }

    render() {
        return (
            <div>
                <FormPage pageName="Thêm thành viên" onPost={this.createUser.bind(this)} columns={Data.user.columns.filter(x => x.hidden == false)} formData={{}} data={this.state.data} />
            </div>
        )
    }
}