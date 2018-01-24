import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';
import NotFoundPage from './containers/NotFoundPage.js';
import LoginPage from './containers/LoginPage';
import UserManager from './Page/users/UserManager';
import CreateUser from './Page/users/CreateUser';
import EditUser from './Page/users/EditUser';


import RoomManager from './Page/rooms/RoomManager';
import CreateRoom from './Page/rooms/CreateRoom';
import EditRoom from './Page/rooms/EditRoom';

import Home from './Page/home';


export default (
  <Route>
    <Route path="/login" component={LoginPage}/>
    <Route path="/" component={App}>
      <IndexRoute component={Home}/>
      <Route path="dashboard" component={Home}/>

      <Route path="users" component={UserManager}/>
      <Route path="rooms" component={RoomManager}/>
      <Route path="createuser" component={CreateUser}/>
      <Route path="edituser" component={EditUser}/>
      <Route path="createroom" component={CreateRoom}/>
      <Route path="editroom/:id" component={EditRoom}/>
      <Route path="*" component={NotFoundPage}/>
    </Route>
  </Route>
);
