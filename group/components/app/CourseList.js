import React, {Component} from "react";
import {View,Text,FlatList,TouchableOpacity,Image,AsyncStorage,TextInput} from "react-native";

export default class CourseList extends Component{
    constructor(props){
        super(props);
        this.allCourses=[];
        console.ignoredYellowBox = ['Remote debugger'];
        this.state={
            text:"",
            refresh : false,
            courses:[],
            userOnlineGroup:[]
        };
        this.socket=this.props.screenProps[1];
        // console.log(this.socket)
        AsyncStorage.getItem("profile")
            .then((value) => {
                let lv = JSON.parse(value);
                this.props.screenProps[1].emit("send-username-group",lv.user.username);
        })
        this.filterSearch=this.filterSearch.bind(this);
        this._goGroup=this._goGroup.bind(this)
    }
    render(){
        return(
            <View style={{flex:1}}>
                <View style={{height:60,flexDirection:"row",backgroundColor:"#c3c6cc",justifyContent:"space-between",alignItems:"center",borderBottomWidth:1,borderBottomColor:"gray"}}>
                    <Text style={{fontSize:20,color:"black",paddingLeft:140,fontFamily:"Cochin"}}>Khoá Học</Text>
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

                    data={this.state.courses}
                    renderItem={({item}) =>
                        <View style={{flexDirection:"row",alignItems:"center",marginLeft:10,borderBottomWidth:0.3,borderBottomColor:"gray"}}>
                            <Image source={require("../../public/img/course.png")} style={{width:30,height:30}}/>
                            <TouchableOpacity
                                onPress={()=>this._goGroup(item.title,item._id,item.content)}
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
                        courses:res.data.filter(x=>x.roomtype==="COURSE")
                    })
                    this.allCourses=res.data;
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
            this.allCourses.forEach(element => {
                if(element.title.toLowerCase().indexOf(text.toLowerCase())>-1){
                    x.push(element)
                }
            });
            console.log("allUser",x)
            this.setState({
                courses: x,
            })
    }
    _goGroup=(title,_id,content)=>{
        // console.log("chat",this.props);
        this.props.screenProps[0]("CourseDetails",{_id:_id,title:title,content:content,userOnlineGroup:this.state.userOnlineGroup,socket:this.socket})
        console.log("Course gui danh sach UsrOG",this.state.userOnlineGroup,title,_id,content)
    }
    componentDidMount(){
        var s = this
        this.socket.on("get-user-online-group",function(dataUser){
            s.setState({userOnlineGroup:dataUser});
            console.log("CourseList nhan list userON",typeof(dataUser),dataUser)
        })
    
        AsyncStorage.getItem("profile")
            .then((value) => {
                let lv = JSON.parse(value);
                fetch("http://localhost:3002/user-rooms?username="+lv.user.username)
                .then((respone)=>respone.json())
                .then((res)=>{
                    this.setState({
                        courses:res.data.filter(x=>x.roomtype==="COURSE")
                    })
                    this.allCourses=res.data;
                    console.log("room",res.data)
                })
        });
    }
}