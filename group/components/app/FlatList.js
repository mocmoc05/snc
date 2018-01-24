import React , {Component} from "react"
import {
    View, Text,FlatList,StyleSheet,Image,Alert,TouchableHighlight,TouchableOpacity
} from "react-native"

import listdata from "../../data/listdata"
import Swipeout from "react-native-swipeout"

class FlatListItem extends Component{
    constructor(props){
        super(props);
        this.state={
            activeRowKey: null
        }
    };

    render(){
        const swipesetting={
            autoClose: true,
            onClose:(secId, rowId,direction)=>{
                if (this.state.activeRowKey !==null) {
                    this.setState({activeRowKey:null});
                }
            },
            onOpen:(secId, rowId,direction)=>{
                this.setState({activeRowKey: this.props.item.key})
            },
            right:[
                {
                    onPress: ()=>{
                        const deletingRow= this.state.activeRowKey
                        Alert.alert("Thong Bao","Ban chac chan muon xoa?",
                            [
                                {text:"Khong", onPress:()=>{}},
                                {text:"Co", onPress:()=>{
                                    listdata.splice(this.props.index,1);
                                    this.props.parentFlatList.refreshFlatList(deletingRow);
                                }}
                            ],
                            {cancelable: true})
                    },
                    text: "Xoa", type:"delete"
                }
            ]
        }
        return(
            <Swipeout {...swipesetting}>
                <View style={{flex:1, backgroundColor: "white",flexDirection: "row",borderBottomWidth:1,
                    borderColor: 'gray',}}>
                    <Image style={{width:100,height:100}}
                           source={this.props.item.imgUrl}/>
                    <View style={{flex:1, flexDirection:"column",borderBottomColor:"black"}}>
                        <Text style={style.flatlistitem}>{this.props.item.name}</Text>
                        <Text style={style.flatlistitem}>{this.props.item.content}</Text>
                    </View>
                </View>
            </Swipeout>
        )
    }
};
export default class FlatListData extends Component{

    constructor(props){
        super(props);
        this.state=({
            deleteRowKey: null
        });
    };

    refreshFlatList=(deletedKey)=>{
        this.setState((prevState)=>{
            return {
                deleteRowKey: deletedKey
            }

        })
    };
    _onPress=()=>{
        // this.props.navigation.navigate("AddModal")
        alert("1")
    }

    render(){
        // var {navigate} =this.props.navigation;
        return(
            <View style={{flex:1}}>
                <View style={{backgroundColor:"green",height:60,flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}>
                    <Text style={{fontSize:20,color:"white",paddingLeft:160}}>Nhom</Text>
                    <TouchableOpacity
                        style={{paddingTop:10,paddingRight:10}}
                        onPress={
                            ()=>this._onPress()
                        }
                    >
                        <Image
                            style={{width:25,height:25}}
                            source={require("../../public/img/add.png")}
                        />
                    </TouchableOpacity>
                </View>
                <FlatList
                    data={listdata}
                    renderItem={({item,index})=>{
                        return(
                            <FlatListItem item={item} index={index} parentFlatList={this}/>
                        );
                    }}
                >
                </FlatList>
            </View>
        )
    }
};

const style = StyleSheet.create({
    flatlistitem:{
        color: "black",
        padding: 10,
        fontSize: 16
    }
});