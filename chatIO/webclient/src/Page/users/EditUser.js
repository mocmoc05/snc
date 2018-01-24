import FormPage from '../../containers/FormPage';
import React from 'react';
import Data from '../../data';

export default class EditUser extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        
    }

    render() {
        return (
            <div>
                <FormPage pageName="Quản lý thành viên" columns={Data.columns.User} />
            </div>
        )
    }
}