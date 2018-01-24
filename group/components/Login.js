import React, {Component} from "react"
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Button,ImageBackground,AsyncStorage
} from "react-native"
import SocketIOClient from 'socket.io-client';
export default class Login extends Component{
    constructor(props){
        console.ignoredYellowBox = ['Remote debugger'];
        super(props);
        this.state={
            username:"",
            password:""
        };
        this._onPress=this._onPress.bind(this)
    }
    _onPress=(username,password)=>{
        fetch("http://localhost:3002/login",{
            method: "POST",
            headers :{
                "Accept":"application/json",
                "Content-Type":"application/json",
            },
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password,
            })
        })
            .then((response)=>response.json())
            .then((res)=>{
                if(this.state.username==="" || this.state.password===""){
                    alert("Hay nhap tai khoan");
                }
                else if (res.status=== "OK"){
                    this.socket = SocketIOClient('http://localhost:3002');
                    AsyncStorage.setItem("profile",JSON.stringify(res.data));
                    // console.log("profile la:",typeof(JSON.stringify(res.data)),JSON.stringify(res.data))
                    this.props.navigation.navigate("Second", {socket: this.socket});
                    
                }else{
                    alert(res.message);
                }
            })
    }

    render(){

        return(
                <View style={styles.container}>
                    <ImageBackground source={require("../public/img/bg.jpg")} style={styles.img}>
                    <Text style={styles.login}>GROUP SNC</Text>

                    <TextInput placeholder="Username"
                               placeholderTextColor="white"
                               style={styles.txtinput}
                               keyboardType='email-address'
                               autoFocus={true}
                               onChangeText={(text)=>this.setState({username:text})}
                               value={this.state.username}
                    />
                    <TextInput placeholder="Password"
                               placeholderTextColor="white"
                               secureTextEntry={true}
                               style={styles.txtinput}
                               onChangeText={(text)=>this.setState({password:text})}
                               value={this.state.password}
                    />

                    <View style={styles.btn}>
                        <Button onPress={
                            ()=>this._onPress(this.state.username,this.state.password)
                        }
                                title="Đăng Nhập"
                                color="white"/>
                    </View>
                    <View style={styles.btn}>
                        <Button onPress={
                            ()=>{this.props.navigation.navigate("Register")}
                        }
                                title="Đăng Ky"
                                color="white"/>
                    </View>
                    </ImageBackground>
                </View>

        )
    }
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
        flex: 1
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
        color: '#fff',
        marginBottom: 10,
        marginTop: 10,
        marginLeft:40,
        marginRight:40,
        borderBottomWidth: 1,
        borderBottomColor: "black",
        fontSize: 20,
    },
    btn:{
        backgroundColor:"red",
        margin: 20,
        padding:5,
        marginBottom: 10,
        borderRadius:16,
        shadowRadius:20,
    }
});
