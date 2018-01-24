import React, {Component} from "react";
import {View,Text,Platform,Dimensions,TextInput} from "react-native";

import listdata from "./listdata"

export default class AddModal extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            newName: "",
            newContent: "",
        }
    }
        render()
        {
            return (
                <View>
                    <Text>Hello</Text>
                </View>
            )
        }
    }
