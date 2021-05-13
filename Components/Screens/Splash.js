import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

export default class Splash extends React.Component{
    render(){
        return(
            <View style={styles.Container}>
                <View style={styles.Header}>
                    <Text style={{fontStyle: "italic", textAlign: "center", fontSize:20, color: "#4C8CF5"}}>iKeep</Text>
                </View>
                <View style={styles.Body}>
                    <Image
                        style={{width: "70%", height:"55%",borderRadius:50,alignSelf: "center"}}
                        source={require('../../Assets/man.png')}
                    />
                </View>
                <Text style={{fontStyle: "italic", textAlign: "center", fontSize:20}}>iKeep</Text>

                <View style={{width: "100%", height: "10%", justifyContent: "center"}}>
                    <Text style={{ textAlign: "center", color: "gray"}}>Let's keep your informatic skills sharp</Text>
                </View>

                <View style={{width: "100%", height: "30%", justifyContent: "center"}}>
                    <TouchableOpacity style={styles.Login} onPress={()=>this.props.navigation.navigate("signup")}>
                        <Text style={{textAlign:"center", color: "white"}}>Sign Up</Text>
                    </TouchableOpacity>

                    <View style={{flexDirection:"row",alignSelf: "center", marginTop: "5%"}}>
                        <Text style={{color:"gray"}}>ALREADY HAVE AN ACCOUNT? </Text>
                        <Text style={{color:"#85C9E8"}} onPress={()=>this.props.navigation.navigate("login")}>SIGN IN</Text>
                    </View>
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
