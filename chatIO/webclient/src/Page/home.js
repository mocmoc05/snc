import DashboardPage from '../containers/DashboardPage';
import React from 'react';
import { get } from '../components/fetch';

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rooms: [],
            users: []
        };
    }

    componentWillMount() {
        let self = this;
        get("/users")
            .then(res => {
                console.log(res);
                if (res.status == "OK") {
                    self.setState({
                        users: res.data
                    });
                }
            })

        get("/rooms")
            .then(res => {
                console.log(res);
                if (res.status == "OK") {
                    self.setState({
                        rooms: res.data
                    });
                }
            })
    }

    render() {
        return (
            <div>
                <DashboardPage pageName="Trang chủ" rooms={this.state.rooms} users={this.state.users} />
            </div>
        )
    }
}