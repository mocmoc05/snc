import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    TouchableOpacity,
    Dimensions,
    AlertIOS,
    AsyncStorage

} from 'react-native';
import { hot } from 'react-hot-loader'

import SocketIOClient from 'socket.io-client';
import { GiftedChat } from 'react-native-gifted-chat';


var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;
export default class chat extends Component {
    constructor(props) {
        super(props);
        const {state} = this.props.navigation;
        this.email=state.params.email;
        this.fullname=state.params.fullname;
        this.class=state.params.classUser;
        this.phone=state.params.phone;
        this.receiver= state.params.username;
        this.socket=state.params.socket
        console.log("chat da nhan:",state.params)
        this.state = {
            chat: [{
                emitter:this.props.emitter,
                receiver:this.props.receiver,
                message:"Hola",
                sta:"typing",
                date: new Date(Date.UTC(2016, 7, 30, 17, 20, 0))
            }],
            message:"",
            messages: []
        };
        this.onSend = this.onSend.bind(this);
        this._renderChat=this._renderChat.bind(this);
        this.getProfile=this.getProfile.bind(this);
        this._goBack=this._goBack.bind(this)
    }
    componentDidMount(){
        AsyncStorage.getItem("profile")
        .then((value) => {
            let lv = JSON.parse(value);
            this.socket.emit("get-history", {
                emitter:lv.user.username,
                receiver:this.receiver
                });  
        })
        this.socket.on('msg', (message) => {
            var data = [{ 
                            text: message.message[0].text,
                            user: { _id: 2,
                                avatar: 'https://thehub.dk/files/587022fc3ed795a85653e7fa/logo_upload-8a6678970f01aba5e02a061a01fa39ad.png' 
                             },
                            createdAt:message.message[0].createdAt,
                            _id: message.message[0]._id,
                            
                        }]
            this.setState((previousState) => {
                return {
                    messages: GiftedChat.append(previousState.messages, data),
                };
            });
        })
        this.socket.on('send-history', (data) => {
            this.getProfile()
            .then((res)=>{
                var profile=JSON.parse(res);
                var emitter = profile.user.username;
                data.forEach(element => {
                    this.setState((previousState) => {
                        return {
                            messages: GiftedChat.append(previousState.messages, 
                                { 
                                    text: element.text,
                                    user: { _id: element.emitter==emitter?1:2,
                                            avatar: 'https://thehub.dk/files/587022fc3ed795a85653e7fa/logo_upload-8a6678970f01aba5e02a061a01fa39ad.png'  
                                        },
                                    createdAt: element.createdTime,
                                    _id: element._id }),
                                };
                    });
                });
            })
        });
        
    }
    getProfile(){
        return AsyncStorage.getItem("profile");
    }

    onSend(messages = []) {
        console.log(messages);
        this.setState((previousState) => {
            return {
                messages: GiftedChat.append(previousState.messages, messages),
            };
        });
        var objMessage = {
            emitter:this.props.emitter,
            receiver:this.props.receiver,
            status:this.props.sta,
            message:messages,
        }
        AsyncStorage.getItem("profile")
        .then((res)=>{
            var profile = JSON.parse(res);
            this.socket.emit('send', {message:objMessage, receiver: this.receiver, emitter: profile.user.username});
        })
    }

    _renderChat(chat){
        return chat.map(function(data, i){
            return(
                <View key={i} style={styles.msj}>
                    <Text style={styles.user}>{data.message}</Text>
                </View>
            );
        });
    }
    _goBack(){
        this.props.navigator.pop()
    }

    render() {
        return (
            <View style={styles.chatWrap}>
                <View style={{height:60,flexDirection:"row",alignItems:"center",borderBottomWidth:1,borderBottomColor:"gray",justifyContent:"space-between"}}>
                <TouchableOpacity
                        onPress={()=>{this.props.navigation.goBack()}}
                        style={{marginLeft:10}}
                    >
                        <Text>Trở Lại</Text>
                </TouchableOpacity>
                    <Text style={{fontSize:20,color:"black",fontFamily:"Cochin"}}>{this.fullname}</Text>
                <TouchableOpacity
                    onPress={()=>{this.props.navigation.navigate("About",{class:this.class,phone:this.phone,email:this.email,fullname:this.fullname})}}
                >
                    <Text>Info</Text>
                </TouchableOpacity>    
                </View>
                <GiftedChat
                    style={{borderWidth:1}}
                    messages={this.state.messages}
                    onSend={this.onSend}
                    user={{
                        _id: 1,
                    }}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',

    },
    form:{
        borderWidth:1,
        flexDirection:'row'
    },
    input: {
        flex: 1,
        paddingHorizontal: 10,
        color:'#444',
        backgroundColor:'#FFF',
        borderRadius:15,
        borderWidth:1,
        borderColor:'#dfdfdf'
    },
    inputWrap: {
        padding:5,
        flexDirection: "row",
        borderWidth:1,
        borderBottomColor:'#f2f2f2',
        borderLeftColor:'#f2f2f2',
        borderRightColor:'#f2f2f2',
        borderTopColor:'#c3c3c3',
        height: 40,
        borderBottomWidth: 1,
        borderBottomColor: "#CCC",
        backgroundColor:'#fdfdfd'
    },
    iconWrap: {
        paddingHorizontal: 7,
        alignItems: "center",
        justifyContent: "center",
    },
    icon: {
        height: 20,
        width: 20,
    },
    chatWrap:{
        width:width,
        height:height
    },
    topBar:{
        marginTop:20,
        borderWidth:1
    },
    msj:{
        borderWidth:1,
        alignItems:'flex-end'
    }
});
