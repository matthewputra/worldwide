import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity, StatusBar} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { connect } from 'react-redux';

class GetStarted extends React.Component{
    render(){
        return(
            <View style={styles.Container}>
                <StatusBar backgroundColor="#AAB1F7" />
                <View style={styles.Header}>
                    <Text style={{fontStyle: "italic", textAlign: "center", fontSize:15, color: "white"}}>iKeep</Text>
                </View>
                <View style={styles.Body}>
                    <Text style={{fontStyle: "italic", textAlign: "center", fontSize:30, color: "white"}}>Welcome {this.props.currentUser?.user}</Text>
                    <Text style={{fontStyle: "italic", textAlign: "center", fontSize:15, color: "white"}}>Let's get learning</Text>
                </View>

                <View style={styles.BodyNext}>
                    <Image
                        style={{width: "90%", height:"55%",borderRadius:50,alignSelf: "center"}}
                        source={require('../../Assets/second.png')}
                    />
                </View>

                <View style={styles.Footer}>
                    <TouchableOpacity style={styles.Login} onPress={()=>this.props.navigation.navigate("dashboard")}>
                        <Text style={{textAlign:"center", color: "black", letterSpacing: 1}}>GET STARTED</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}


const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({});
const connectComponent = connect(mapStateToProps, mapDispatchToProps);
export default connectComponent(GetStarted);


const styles = StyleSheet.create({
    Container: {
        width: "100%",
        height: "100%",
        backgroundColor: "#AAB1F7"
    },
    Header: {
        width: "100%",
        height: "10%",
        justifyContent: "center",
    },
    Body: {
        width: "100%",
        height: "30%",
        justifyContent: "center"
    },
    Footer: {
        width: "100%",
        height: "20%",
        justifyContent: "center"
    },
    Login: {
        width: "90%",
        height: "35%",
        backgroundColor: "#F6EAE9",
        borderRadius: 40,
        alignSelf: "center",
        justifyContent: "center",
    },
    BodyNext: {
        width: "100%",
        height: "40%",
        justifyContent: "center"
    },
});
