import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

export default class GoodJob extends React.Component{
    render(){
        return(
            <View style={styles.Container}>
                <View style={styles.Header}>
                    <Text style={{fontStyle: "italic", textAlign: "center", fontSize:20, color: "#4C8CF5"}}>iKeep</Text>
                    <View style={{flexDirection: "row", justifyContent: "space-between", paddingHorizontal: "5%"}}>
                        <TouchableOpacity onPress={() => this.props.navigation.goBack()}><Icon name="times" size={22} style={{color:"gray"}} /></TouchableOpacity>
                        <Text style={{fontSize: 15, fontWeight: "bold"}}>Question 1</Text>
                        <Icon name="star" size={22} style={{color:"gray"}} />
                    </View>
                </View>

                <View style={{width: "100%", height: "10%", justifyContent: "center"}}>
                    <View style={{flexDirection: "row", alignSelf: "center"}}>
                        <View style={{width:10, height:10, backgroundColor: "#85C9E8", alignSelf: "center", borderRadius: 10}}></View>
                        <View style={{width: "30%", height: "15%", backgroundColor: "black", marginTop: "1%"}}></View>
                        <View style={{width:10, height:10, backgroundColor: "black", alignSelf: "center", borderRadius: 10}}></View>
                        <View style={{width: "30%", height: "15%", backgroundColor: "black", marginTop: "1%"}}></View>
                        <View style={{width:10, height:10, backgroundColor: "black", alignSelf: "center", borderRadius: 10}}></View>
                    </View>
                </View>

                <View style={{width: "80%", height: "20%", justifyContent: "center", alignSelf: "center"}}>
                    <Text style={{textAlign: "center"}}>What is the assignment operator for variable in Python?</Text>
                </View>

                <View style={{width: "100%", height: "40%", justifyContent: "center"}}>
                    <View style={{width: "100%", height: "30%", justifyContent: "center"}}>
                        <View style={{flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 10}}>
                            <View style={{width: 150, height: 100, borderRadius: 10, borderWidth:1, borderColor:"gray", justifyContent: "center"}}>
                                <Text style={{textAlign: "center", fontSize: 20}}>{"<="}</Text>
                            </View>

                            <View style={{width: 150, height: 100, borderRadius: 10, borderWidth:1, borderColor:"gray", justifyContent: "center"}}>
                                <Text style={{textAlign: "center", fontSize: 20}}>{"=/"}</Text>
                            </View>
                        </View>

                        <View style={{flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 10, marginTop:"2%"}}>
                            <View style={{width: 150, height: 100, borderRadius: 10, borderWidth:1, borderColor:"gray", justifyContent: "center"}}>
                                <Text style={{textAlign: "center", fontSize: 20}}>{"="}</Text>
                            </View>

                            <View style={{width: 150, height: 100, borderRadius: 10, borderWidth:1, borderColor:"gray", justifyContent: "center"}}>
                                <Text style={{textAlign: "center", fontSize: 20}}>{":="}</Text>
                            </View>
                        </View>
                    </View>
                </View>

                <View style={{width: "100%", height:"20%", backgroundColor: "#CCF4BF"}}>
                    <Text style={{color: "#8de271", fontSize: 15, fontWeight: "bold", marginTop:"5%"}}>Good job!</Text>

                    <TouchableOpacity style={{width: "50%", height: "35%", backgroundColor: "#8de271", alignSelf: "center", borderRadius: 20, justifyContent: "center", marginTop: "7%"}}>
                        <Text style={{textAlign: "center", color: "white"}}>CONTINUE</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    Container: {
        width: "100%",
        height: "100%",
    },
    Header: {
        width: "100%",
        height: "10%",
        justifyContent: "center",
    },
    Body: {
        width: "100%",
        height: "40%",
        justifyContent: "center"
    },
    Login: {
        width: "90%",
        height: "25%",
        backgroundColor: "#85C9E8",
        borderRadius: 40,
        alignSelf: "center",
        justifyContent: "center",
    }
});
