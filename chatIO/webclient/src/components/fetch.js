import axios from 'axios';
import Data from '../data';
const API=Data.apiUri;


  export function get(url) {
    var access_token = localStorage.getItem("access_token");
    var headers = {}
    if (access_token) {
      headers = {
        "Content-type": "application/json",
        "Authorization": "Bear " + access_token
      }
    }
    return axios.get(`${API}${url}`, {
      headers: headers
    })
    .then(res => {
      return res.data;
    });
  }
  export function post(url, data) {
    var access_token = localStorage.getItem("access_token");
    var headers = {};
    if (access_token) {
      headers = {
        "Content-type": "application/json",
        "Authorization": "Bear " + access_token
      }
    }
  
    return axios.post(`${API}${url}`, data, {
      headers: headers
    }).then(res => {
      return res.data;
    });
  }