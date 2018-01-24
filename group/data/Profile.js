import {AsyncStorage} from "react-native";

function profile(){
    return AsyncStorage.getItem("profile");
}
export default profile;