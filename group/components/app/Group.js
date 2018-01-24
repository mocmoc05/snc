import React, {Component} from "react"
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Button,ImageBackground,AsyncStorage, FlatList,TouchableOpacity
} from "react-native"
export default class Group extends Component{
    constructor(props){
        console.ignoredYellowBox = ['Remote debugger'];
        super(props);
        const {state} = this.props.navigation;
        this.users=state.params.users;
        this.state={
            title:"",
            userGroup:[]
        };
        this.addUser=this.addUser.bind(this)
    }
    _onPress=()=>{
        fetch("#",{
            method: "POST",
            headers :{
                "Accept":"application/json",
                "Content-Type":"application/json",
            },
            body: JSON.stringify({
                
            })
        })
        .then((respone)=>respone.json())
        .then((res)=>{
           
        })
    }
    addUser=(_id,username,fullname)=>{
        var y=this.state.userGroup;
        y.push({_id,username,fullname});
            this.setState({
                userGroup:y
            })
            console.log("ne:", this.state.userGroup)
    }
    _submit=(userGroup,title)=>{
        this.props.navigation.goBack()
        fetch("http://localhost:3002/create-room",{
            method: "POST",
            headers :{
                "Accept":"application/json",
                "Content-Type":"application/json",
            },
            body: JSON.stringify({
                title:this.state.title,
                userGroup:this.state.userGroup,
                roomtype:"CHAT"
            })
        })
        .then((respone)=>respone.json())
        .then((res)=>{

            this.props.navigation.goBack()
        })
    }

    render(){

        return(
                <View style={styles.container}>
                    <ImageBackground source={require("../../public/img/bg.jpg")} style={styles.img}>
                    <View style={{marginTop:50}}>
                        <TextInput 
                                placeholder="Ten Nhom"
                                placeholderTextColor="white"
                                style={styles.txtinput}
                                onChangeText={(text)=>this.setState({title:text})}
                                value={this.state.title}
                        />
                        <FlatList
                        data={this.users}
                        renderItem={({item}) =>
                            <View style={{flexDirection:"row",alignItems:"center",marginLeft:10,borderBottomWidth:0.3,borderBottomColor:"gray"}}>
                                <TouchableOpacity
                                    onPress={()=>{this.addUser(item._id,item.username,item.fullname)}}
                                    style={{height:50,justifyContent:"center"}}
                                >
                                    <Text style={{fontSize:20,marginLeft:30}}>{item.fullname}</Text>
                                </TouchableOpacity>
                            </View>
                        }
                        keyExtractor={(item, index) => index}
                        />
                        <FlatList
                        data={this.state.userGroup}
                        renderItem={({item}) =>
                            <View style={{flexDirection:"row",alignItems:"center",marginLeft:10,borderBottomWidth:0.3,borderBottomColor:"gray"}}>
                                    <Text style={{fontSize:20,marginLeft:30}}>{item.fullname}</Text>
                            </View>
                        }
                        keyExtractor={(item, index) => index}
                        />
                        <View style={styles.btn}>
                            <Button onPress={
                                ()=>this._submit(this.state.userGroup,this.state.title)
                            }
                                    title="Đăng Ký"
                                    color="white"/>
                        </View>
                        </View>
                    </ImageBackground>
                </View>
        )}
};
const styles = StyleSheet.create({
    img:{
        alignSelf: "stretch",
        width: null,
        flex:1,
        justifyContent: 'center',
        position:"relative",
    },
    container: {
        flex: 1,
    },
    login: {
        fontSize: 80,
        fontWeight:"500",
        textAlign: 'center',
        margin: 10,
        paddingBottom:60,
        backgroundColor: "transparent",
        color: "wheat",
        fontFamily: 'Cochin'

    },
    txtinput: {
        alignSelf: "stretch",
        color: 'white',
        marginBottom: 10,
        marginLeft:40,
        marginRight:40,
        borderRadius:25 ,
        borderBottomWidth: 1,
        borderBottomColor: "black",
        fontSize: 20,
        backgroundColor: "black",
        opacity: 0.6,
        height: 30
    },
    btn:{
        backgroundColor:"red",
        marginBottom: 20,
        margin:30,
        borderRadius:16,
        shadowRadius:20,
    }
});
