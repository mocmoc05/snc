import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import axios from 'axios';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Checkbox from 'material-ui/Checkbox';
import { grey500, white } from 'material-ui/styles/colors';
import PersonAdd from 'material-ui/svg-icons/social/person-add';
import Help from 'material-ui/svg-icons/action/help';
import TextField from 'material-ui/TextField';
import { Link, browserHistory } from 'react-router';
import ThemeDefault from '../theme-default';
import { connect } from "react-redux";
import Data from "../data";
const styles = {
  loginContainer: {
    minWidth: 320,
    maxWidth: 400,
    height: 'auto',
    position: 'absolute',
    top: '20%',
    left: 0,
    right: 0,
    margin: 'auto'
  },
  paper: {
    padding: 20,
    overflow: 'auto'
  },
  buttonsDiv: {
    textAlign: 'center',
    padding: 10
  },
  flatButton: {
    color: grey500
  },
  checkRemember: {
    style: {
      float: 'left',
      maxWidth: 180,
      paddingTop: 5
    },
    labelStyle: {
      color: grey500
    },
    iconStyle: {
      color: grey500,
      borderColor: grey500,
      fill: grey500
    }
  },
  loginBtn: {
    float: 'right'
  },
  btn: {
    background: '#4f81e9',
    color: white,
    padding: 7,
    borderRadius: 2,
    margin: 2,
    fontSize: 13
  },
  btnFacebook: {
    background: '#4f81e9'
  },
  btnGoogle: {
    background: '#e14441'
  },
  btnSpan: {
    marginLeft: 5
  },
};
class LoginPage extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount(){
    this.setState({
      isloged: false,
      username: "",
      password: ""
    });
  }
  LoginHandle=()=>{
    var postData={
      userName: this.state.username,
      password: this.state.password,
      grant_type: "password"
    }
    axios.post(`${Data.appUri}/login`, {username:postData.userName, password: postData.password}, {
      headers: {
        "Content-Type":"Application/json"
      }
    })
    .then(res=>{
      var data=res.data;
      if(data.status=="OK"){
        
        console.log(data)
        var access_token=data.data.token;
        localStorage.setItem("access_token", access_token);
        browserHistory.push("/")
      }
    })
  }
  render() {
    return (
    <MuiThemeProvider muiTheme={ThemeDefault}>
      <div>
        <div style={styles.loginContainer}>
          <Paper style={styles.paper}>
            <form>
              <TextField
                hintText="E-mail"
                floatingLabelText="E-mail"
                fullWidth={true}
                onChange={(event)=>{
                  this.setState({
                    username: event.target.value
                  });
                }}
              />
              <TextField
                hintText="Password"
                floatingLabelText="Password"
                fullWidth={true}
                type="password"
                onChange={(event)=>{
                  this.setState({
                    password: event.target.value
                  });
                }}
              />

              <div>
                <Checkbox
                  label="Remember me"
                  style={styles.checkRemember.style}
                  labelStyle={styles.checkRemember.labelStyle}
                  iconStyle={styles.checkRemember.iconStyle}
                />

                  <RaisedButton label="Login"
                    onClick={this.LoginHandle}
                    primary={true}
                    style={styles.loginBtn} />
              </div>
            </form>
          </Paper>

          <div style={styles.buttonsDiv}>
            <FlatButton
              label="Register"
              href="/"
              style={styles.flatButton}
              icon={<PersonAdd />}
            />

            <FlatButton
              label="Forgot Password?"
              href="/"
              style={styles.flatButton}
              icon={<Help />}
            />
          </div>

          <div style={styles.buttonsDiv}>
            <Link to="/" style={{ ...styles.btn, ...styles.btnFacebook }}>
              <i className="fa fa-facebook fa-lg" />
              <span style={styles.btnSpan}>Log in with Facebook</span>
            </Link>
            <Link to="/" style={{ ...styles.btn, ...styles.btnGoogle }}>
              <i className="fa fa-google-plus fa-lg" />
              <span style={styles.btnSpan}>Log in with Google</span>
            </Link>
          </div>
        </div>
      </div>
    </MuiThemeProvider>
    )
  }
}

export default LoginPage;