import React, {Component} from "react"
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Button,ImageBackground,AsyncStorage
} from "react-native"
export default class Register extends Component{
    constructor(props){
        console.ignoredYellowBox = ['Remote debugger'];
        super(props);
        this.state={
            username:"",
            password:"",
            class:"",
            phone:"",
            email:"",
            fullname:""
        };
        this._onPress=this._onPress.bind(this)
    }
    _onPress=(username,password)=>{
        fetch("http://localhost:3002/register",{
            method: "POST",
            headers :{
                "Accept":"application/json",
                "Content-Type":"application/json",
            },
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password,
                fullname: this.state.fullname,
                email: this.state.email,
                class: this.state.class,
                phone: this.state.phone,
                roleId: "STUDENT"
            })
        })
        .then((respone)=>respone.json())
        .then((res)=>{
            if(this.state.username==="" || this.state.password===""){
                alert(res.message)
            }else if(res.exist==="OK"){
                alert(res.message)
            }else if(res.status==="OK"){
                alert(res.message)
                this.props.navigation.navigate("First")
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
                    <TextInput placeholder="Fullname"
                               placeholderTextColor="white"
                               style={styles.txtinput}
                               onChangeText={(text)=>this.setState({fullname:text})}
                               value={this.state.fullname}
                    />
                    <TextInput placeholder="Class"
                               placeholderTextColor="white"
                               style={styles.txtinput}
                               onChangeText={(text)=>this.setState({class:text})}
                               value={this.state.class}
                    />
                    <TextInput placeholder="Phone"
                               placeholderTextColor="white"
                               style={styles.txtinput}
                               onChangeText={(text)=>this.setState({phone:text})}
                               value={this.state.phone}
                    />
                    <TextInput placeholder="Email"
                               placeholderTextColor="white"
                               style={styles.txtinput}
                               onChangeText={(text)=>this.setState({email:text})}
                               value={this.state.email}
                    />

                    <View style={styles.btn}>
                        <Button onPress={
                            ()=>this._onPress(this.state.username,this.state.password)
                        }
                                title="Đăng Ký"
                                color="white"/>
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
        margin: 80,
        padding:5,
        marginBottom: 10,
        borderRadius:16,
        shadowRadius:20,
    }
});
