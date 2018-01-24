import React, {Component} from "react";
import {View,Text,StyleSheet,TouchableOpacity,AsyncStorage,Image, TextInput,Alert,alertMessage} from "react-native";
import {NavigationActions} from "react-navigation"
import Login from "../Login";

export default class About extends Component{
    constructor(props){
        super(props);
        console.ignoredYellowBox = ['Remote debugger'];
        const {state} = this.props.navigation;
        this.fullname=state.params.fullname;
        this.class=state.params.class;
        this.email=state.params.email,
        this.phone=state.params.phone
        this._logout=this._logout.bind(this)
    }
    render(){
        return(
            <View style={{flex:1}}>
                <View style={{height:60,flexDirection:"row",backgroundColor:"#c3c6cc",justifyContent:"space-between",alignItems:"center",borderBottomWidth:1,borderBottomColor:"gray"}}>
                <TouchableOpacity
                        onPress={()=>{this.props.navigation.goBack()}}
                        style={{marginLeft:10}}
                    >
                        <Text>Trở Lại</Text>
                </TouchableOpacity>
                    <Text style={{fontSize:20,color:"black",paddingRight:140,fontFamily:"Cochin"}}>Thông tin</Text>
                </View>
                <View style={{flex:0.5,height:200,marginBottom:50,paddingTop:20,backgroundColor:"#f9935c",justifyContent:"center",alignItems:"center"}}>
                    <Image source={require("../../public/img/contac-icon.png")} style={{width:60,height:60}}/>
                                
                    <Text style={{textAlign:"center",fontFamily:"Cochin",fontSize:30}}>{this.fullname}</Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                    <View style={style.profile} ><Text style={{fontSize:18,fontFamily:"Cochin"}}>Họ Tên</Text></View>
                    <View style={style.profile}><Text style={style.txt}>{this.fullname}</Text></View>
                </View>
                <View style={{flexDirection: 'row'}}>
                    <View style={style.profile} ><Text style={{fontSize:18,fontFamily:"Cochin"}}>Lớp</Text></View>
                    <View style={style.profile}><Text style={style.txt}>{this.class}</Text></View>
                </View>
                <View style={{flexDirection: 'row'}}>
                    <View style={style.profile} ><Text style={{fontSize:18,fontFamily:"Cochin"}}>Email</Text></View>
                    <View style={style.profile}><Text style={style.txt}>{this.email}</Text></View>
                </View>
                <View style={{flexDirection: 'row'}}>
                    <View style={style.profile} ><Text style={{fontSize:18,fontFamily:"Cochin"}}>Số điện thoại</Text></View>
                    <View style={style.profile}><Text style={style.txt}>{this.phone}</Text></View>
                </View>
                <View style={{
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    alignItems:"center",
                }}>
                </View>
            </View>
        )}
    _logout=(screen)=>{
        this.props.screenProps[1].emit("log-out")
        this.props.screenProps[0]("First")
    }};
const style = StyleSheet.create({
    btn:{
        marginBottom:20,
        backgroundColor:"red",
        borderRadius:16,
        shadowRadius:20,
        padding: 10,
    },
    profile:{
        marginLeft:10,
        width: 150, 
        height: 50, 
        justifyContent:"center",
        alignItems:"flex-start"
    },
    txt:{
        fontSize: 20,
        color:"red",
        fontFamily:"Cochin"
    }
})