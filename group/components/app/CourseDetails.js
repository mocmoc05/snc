import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    ListView,
    Text,
    View,
    FlatList,
    TouchableOpacity,
    Dimensions,
    AlertIOS,
    WebView,
    ScrollView

} from 'react-native';

import HTML from 'react-native-render-html';
import io from 'socket.io-client/dist/socket.io';
import { GiftedChat } from 'react-native-gifted-chat';


// var width = Dimensions.get('window').width;
// var height = Dimensions.get('window').height;
export default class CourseDetails extends Component {
    constructor(props){
        super(props);
        const {state} = this.props.navigation;
        this.content= state.params.content;
        console.log("noi dung",this.content, typeof(this.content))
        this.roomId=state.params._id;
        console.log("title:",state.params.title)
        this.userOn= state.params.userOnlineGroup;
        this.socket=state.params.socket
        console.log("CourseDetail da nhan userOn tu CourseList", this.userOn);
        this._goChatGroup=this._goChatGroup.bind(this)
    }
    render(){
        return(
        <View>
            {/*TopBar*/}
            <View style={{height:60,flexDirection:"row",justifyContent:"space-between",alignItems:"center",borderBottomWidth:1,borderBottomColor:"gray"}}>
                <TouchableOpacity
                    style={{marginLeft:10}}
                    onPress={()=>{this.props.navigation.goBack()}}
                >
                    <Text>Trở Lại</Text>
                </TouchableOpacity>

                <Text style={{fontSize:20,color:"black",paddingLeft:20,fontFamily:"Cochin"}}>Nội dung khoá học</Text>

                <TouchableOpacity
                    style={{marginRight:10}}
                    onPress={()=>this._goChatGroup()}
                >
                    <Text>Chat</Text>
                </TouchableOpacity>

            </View>
            <ScrollView style={{padding:10,marginBottom:10}}>
                <HTML html={this.content } imagesMaxWidth={Dimensions.get('window').width}/>
            </ScrollView>
        </View>
        )}
        _goChatGroup=()=>{
            this.props.navigation.navigate("ChatGroup",{roomId:this.roomId,listUser:this.userOn,socket:this.socket})
            console.log("CourseDe da gui list UserOn sang Chat",this.userOn,this.roomId)
        }
};
