import React, { Component } from 'react';
import {View,StatusBar} from 'react-native';
import {StackNavigator,DrawerNavigator} from "react-navigation"
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register"
import Chat from "./components/app/Chat";
import ContactList from "./components/app/ContactList";
import ChatGroup from "./components/app/ChatGroup";
import CourseDetails from "./components/app/CourseDetails";
import About from "./components/app/About";
import Room from "./components/app/Room";
import Group from "./components/app/Group"


const Application = StackNavigator({
        First: {screen: Login,navigationOptions:{header:true}},
        Second: {screen: Home,
                navigationOptions:{
                    header: true,
                    gesturesEnabled: false
                }},
        Register: {screen: Register,navigationOptions:{header:true}},
        Chat: {screen: Chat,navigationOptions:{header:true}},
        CourseDetails:{screen: CourseDetails,navigationOptions:{header:true}},
        ChatGroup:{screen: ChatGroup,navigationOptions:{header:true}},
        About:{screen: About,navigationOptions:{header:true}},
        Room:{screen: Room,navigationOptions:{header:true}},
        Group:{screen: Group,navigationOptions:{header:true}}
    })

export default class App extends Component<{}> {
    componentDidMount(){
        global.___DEV___ = false
        StatusBar.setHidden(true)
    };

    render() {
        return (
            <Application/>
        );
    }
};



