import React, {Component} from "react";
import {View,Text,FlatList,TouchableOpacity,StyleSheet,Image,SectionList,AsyncStorage, TextInput} from "react-native";
import {StackNavigator,TabNavigator} from "react-navigation";
import SocketIOClient from 'socket.io-client';

import {MaterialIcons} from "react-native-vector-icons/MaterialIcons"

export default class ContactList extends Component{
    constructor(props) {
        super(props);
        this.allUsers=[];
        console.ignoredYellowBox = ['Remote debugger'];
        console.disableYellowBox = true;
    
        this.socket=this.props.screenProps[1];

        AsyncStorage.getItem("profile")
            .then((value) => {
                let lv = JSON.parse(value);
                console.log("lv la:",lv.user.username)
                let pr = {
                    username : lv.user.username,
                    fullname : lv.user.fullname
                }
                this.props.screenProps[1].emit("send-username",pr);
        })
        this.state = {
            refresh : false,
            users: [],
            userOnline:[],
            text:""
        }
        this._goChat=this._goChat.bind(this);
        this.filterSearch=this.filterSearch.bind(this);
        this._goRoom=this._goRoom.bind(this);
    };

    _goChat=(username,fullname,classUser,email,phone)=>{
        this.props.screenProps[0]("Chat", {username:username,fullname:fullname,classUser:classUser,email:email,phone:phone,socket:this.socket});
        console.log("goChat",fullname,classUser,email,phone)
    };
    filterSearch(text){
        this.setState({
            text: text
        })
            console.log("text",text)
            var x=[];
            this.allUsers.forEach(element => {
                if(element.fullname.toLowerCase().indexOf(text.toLowerCase())>-1){
                    x.push(element)
                }
            });
            console.log("allUser",x)
            this.setState({
                users: x,
            })
    }
    _goRoom=(screen)=>{
        this.props.screenProps[0]("Room",{users:this.state.users,socket:this.socket});
        console.log("gui sang GoGroup",this.state.users)
    }

    render(){
        return(
            <View style={{flex:1}}>
                <View style={{height:60,flexDirection:"row",backgroundColor:"#c3c6cc",justifyContent:"space-between",alignItems:"center",borderBottomWidth:1,borderBottomColor:"gray"}}>
                    <Text style={{fontSize:20,color:"black",paddingLeft:140,fontFamily:"Cochin"}}>Thành Viên</Text>
                    <TouchableOpacity
                    style={{marginRight:10}}
                    onPress={()=>this._goRoom()}
                    >
                    <Text>Room</Text>
                    </TouchableOpacity>
                </View>
                <TextInput
                    style={{height:30,borderWidth:1,borderColor:"#cecece",margin:5}}
                    placeholder="Tim Kiem"
                    onChangeText={(text)=>{this.filterSearch(text)}}
                    value={this.state.text}
                />
                <SectionList
                    refreshing={this.state.refresh}
                    onRefresh={()=>{this.refresh()}}

                    enableEmptySections={true}
                    sections={[{title:"Online",data:this.state.userOnline},{title:"Thành Viên",data:this.state.users}]}
                    renderItem={({item}) =>
                    <View style={{flexDirection:"row",alignItems:"center",marginLeft:10,borderBottomWidth:0.3,borderBottomColor:"gray"}}>
                            <Image source={require("../../public/img/ct.png")} style={{width:30,height:30}}/>
                            <TouchableOpacity
                                onPress={()=>this._goChat(item.username,item.fullname,item.class,item.email,item.phone)}
                                style={{height:50,justifyContent:"center"}}
                            >
                                <Text style={{fontSize:25,marginLeft:30,color:item.username==="Online"?"blue":"black"}}>{item.fullname}</Text>
                            </TouchableOpacity>
                    </View>
                    }
                    renderSectionHeader={({section}) => 
                    <View style={{borderBottomWidth:0.3,borderBottomColor:"gray"}}>
                        <Text style={{marginLeft:10,padding:10,color:section.title=="Online"?"#4636f7":"black"}}>{section.title}</Text>
                    </View>
                    }
                    keyExtractor={(item, index) => index}
                />
            </View>
        );
    }
    refresh(){
        this.setState({refresh:true})
        fetch("http://localhost:3002/users")
            .then((response)=>response.json())
            .then((resJson)=>{
                this.setState({users:resJson.data,refresh:false});
            })
    };
    componentDidMount(){  
        var s = this
        this.socket.on("get-user-online",function(data){
            s.setState({userOnline:data});
            console.log("username online:",data)
        })
        fetch("http://localhost:3002/users")
            .then((response)=>response.json())
            .then((resJson)=>{
                this.setState({users:resJson.data});
                this.allUsers=resJson.data;
                console.log("danh sach user:",resJson.data)
            })
            // .catch(console.log(this.state.users));
    }
}
