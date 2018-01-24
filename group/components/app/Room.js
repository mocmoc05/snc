import React, {Component} from "react";
import {View,Text,FlatList,TouchableOpacity,Image,AsyncStorage,TextInput} from "react-native";


export default class CourseList extends Component{
    constructor(props){
        super(props);
        const {state} = this.props.navigation;
        this.users=state.params.users;
        this.socket=state.params.socket;
        console.log("room nhan",this.users)
        console.ignoredYellowBox = ['Remote debugger'];
        this.allRoom=[];
        this.state={
            text:"",
            refresh : false,
            room:[],
            userOnlineRoom:[],
        };
        AsyncStorage.getItem("profile")
        .then((value) => {
            let lv = JSON.parse(value);
            this.props.screenProps[1].emit("send-username-group",lv.user.username);
    }) 
    }
    render(){
        return(
            <View style={{flex:1}}>
                <View style={{height:60,flexDirection:"row",backgroundColor:"#c3c6cc",justifyContent:"space-between",alignItems:"center",borderBottomWidth:1,borderBottomColor:"gray"}}>
                <TouchableOpacity
                    style={{marginLeft:10}}
                    onPress={()=>this.props.navigation.goBack()}
                     >
                    <Text>Trở lại</Text>
                    </TouchableOpacity>
                    <Text style={{fontSize:20,color:"black",paddingLeft:20,fontFamily:"Cochin"}}>Room</Text>
                    <TouchableOpacity
                    style={{marginRight:10}}
                    onPress={()=>this.props.navigation.navigate("Group",{users:this.users})}
                     >
                    <Text>Tao Room</Text>
                    </TouchableOpacity>
                </View>
                <TextInput
                    style={{height:30,borderWidth:1,borderColor:"#cecece",margin:5}}
                    placeholder="Tim Kiem"
                    onChangeText={(text)=>{this.filterSearch(text)}}
                    value={this.state.text}
                />
                <FlatList
                    refreshing={this.state.refresh}
                    onRefresh={()=>{this.refresh()}}

                    data={this.state.room}
                    renderItem={({item}) =>
                        <View style={{flexDirection:"row",alignItems:"center",marginLeft:10,borderBottomWidth:0.3,borderBottomColor:"gray"}}>
                            <Image source={require("../../public/img/course.png")} style={{width:30,height:30}}/>
                            <TouchableOpacity
                                onPress={()=>this._goGroup(item.title,item._id,item.users)}
                                style={{height:50,justifyContent:"center"}}
                            >
                                <Text style={{fontSize:20,marginLeft:30}}>{item.title}</Text>
                            </TouchableOpacity>
                        </View>
                    }
                    keyExtractor={(item, index) => index}
                />
            </View>
        )}
    refresh(){
        AsyncStorage.getItem("profile")
            .then((value) => {
                let lv = JSON.parse(value);
                fetch("http://localhost:3002/user-rooms?username="+lv.user.username)
                .then((respone)=>respone.json())
                .then((res)=>{
                    this.setState({
                        room:res.data.filter(x=>x.roomtype==="CHAT")
                    })
                    this.allRoom=res.data.filter(x=>x.roomtype==="CHAT");
                    console.log("room",res.data)
                })
        });
    };
    filterSearch(text){
        this.setState({
            text: text
        })
            console.log("text",text)
            var x=[];
            this.allRoom.forEach(element => {
                if(element.title.toLowerCase().indexOf(text.toLowerCase())>-1){
                    x.push(element)
                }
            });
            console.log("allUser",x)
            this.setState({
                room: x,
            })
    }
    _goGroup=(title,roomId,users)=>{
        console.log("usernmaeeeeeeee",users);
        this.props.navigation.navigate("ChatGroup",{title:title,roomId:roomId,listUser:users,socket:this.socket})
       
    }
    componentDidMount(){
        var s = this
        this.socket.on("get-user-online-group",function(dataUser){
            console.log("dataUser:",dataUser)
            s.setState({userOnlineRoom:dataUser});
        });
            console.log("CourseList nhan list userON");
        AsyncStorage.getItem("profile")
            .then((value) => {
                let lv = JSON.parse(value);
                fetch("http://localhost:3002/user-rooms?username="+lv.user.username)
                .then((respone)=>respone.json())
                .then((res)=>{
                    this.setState({
                        room:res.data.filter(x=>x.roomtype==="CHAT")
                    })
                    this.allRoom=res.data.filter(x=>x.roomtype==="CHAT");
                    console.log("room",res.data)
                })
        });
    }
}