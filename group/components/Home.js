import React, {Component} from "react";
import {StyleSheet,Image} from "react-native";
import {TabNavigator} from "react-navigation";

import CourseList from "../components/app/CourseList"
import ContactList from "../components/app/ContactList"
import Profile from "../components/app/Profile"

var Tab = TabNavigator({
    Tab1: {screen: ContactList,navigationOptions:{
        tabBarLabel: "Liên Hệ",
        tabBarIcon: ({ tintColor }) => (
            <Image
                source={require('../public/img/contac-icon.png')}
                style={[styles.icon, {tintColor: tintColor}]}
            />
        )}},
    Tab2: {screen: CourseList,navigationOptions:{
        tabBarLabel: " Khoá Học",
        tabBarIcon: ({ tintColor }) => (
            <Image
                source={require('../public/img/courses-icon.png')}
                style={[styles.icon, {tintColor: tintColor}]}
            />
        )}},
    Tab3: {screen: Profile,navigationOptions:{
        tabBarLabel: "Tài Khoản",
        tabBarIcon: ({ tintColor }) => (
            <Image
                source={require('../public/img/profile-icon.png')}
                style={[styles.icon, {tintColor: tintColor}]}
            />
        )}},
},
    {
        swipeEnabled: true,
        tabBarPosition:"bottom",
        tabBarOptions:{
            activeTintColor: "blue",
            activeBackgroundColor:"white",
            color:"white",
            style:{
                backgroundColor:"#c3c6cc",
            },
            labelStyle:{
                fontSize:14,
            }}
    });

export default class Home extends Component{
    constructor(props){
        super(props);
        this._onPress=this._onPress.bind(this)
    }
    _onPress=(screen, data)=>{
        // console.log(screen)
        this.props.navigation.navigate(screen, data)
    }
    render(){
        const {state} = this.props.navigation;
        console.log(state.params.socket);
        return(
           <Tab screenProps={[this._onPress, state.params.socket]} />
        )}
}
const styles = StyleSheet.create({
    icon:{
        width: 23,
        height: 23,
    }
})