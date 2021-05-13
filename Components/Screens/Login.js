import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity, TextInput, StatusBar, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import api from '../api'
import { Loading } from '../components';
import {connect} from 'react-redux'
import {types} from '../action';

class Login extends React.Component{

    state = {
        email: "",
        password: "",
        loading: false
    }


    onPressLogin = async () => {
        const {email, password} = this.state;
        this.setState({loading: true});
        try {
            const res = await api.Login({email, password});
            if(res.code == 200){
                console.log(res);
                this.props.loginUser(res.user);

            } else {
                Alert.alert(`Invalid Username or Password`);
            }
        } catch(error){
            console.log(error);
        }
        this.setState({loading: false});
    }
    

    render(){
        return this.state.loading ? <Loading /> : (
            <View style={styles.Container}>
                <View style={styles.Header}>
                    <Text style={{fontStyle: "italic", textAlign: "center", fontSize:20, color: "#4C8CF5"}}>iKeep</Text>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={{width: "12%", height: "60%", backgroundColor: "white", justifyContent: "center", borderRadius: 60, marginLeft: "5%",shadowColor: "black",
                        shadowOffset: { width: 0, height: 1 },
                        shadowOpacity: 0.8,
                        shadowRadius: 2,
                        elevation: 4}}>
                        <Icon name="arrow-left" size={20} style={{color:"black", alignSelf: "center"}} />
                    </TouchableOpacity>
                </View>

                <View style={styles.Body}>
                    <Text style={{textAlign: "center", fontSize:25, color: "#3B3B3B", fontFamily: "sans-sarif-thick", fontWeight:"bold"}}>Welcome back!</Text>

                    <TouchableOpacity style={styles.Facebook}>
                        <View style={{flexDirection: "row", alignSelf: "center"}}>
                            <Icon name="facebook" size={20} style={{color:"white"}} />
                            <Text style={{textAlign:"center", color: "white", marginLeft: "5%", letterSpacing: 1, fontSize:12}}>CONTINUE WITH FACEBOOK</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.Google}>
                        <View style={{flexDirection: "row", alignSelf: "center"}}>
                            <Icon name="envelope" size={20} style={{color:"red"}} />
                            <Text style={{textAlign:"center", color: "black", marginLeft: "13%", letterSpacing: 1, fontSize:12, fontFamily: "sans-sarif-medium"}}>CONTINUE WITH GMAIL</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <Text style={{ textAlign: "center", color: "gray"}}>OR LOG IN WITH EMAIL</Text>

                <View style={styles.BodyNext}>
                    <TextInput
                        keyboardType='default'
                        onChangeText={text => this.setState({email: text})}
                        placeholder="Email address"
                        placeholderTextColor="gray"
                        style={styles.TextInput}
                    />
                    <TextInput
                        keyboardType='default'
                        placeholder="Password"
                        secureTextEntry
                        onChangeText={text => this.setState({password: text})}
                        placeholderTextColor="gray"
                        style={styles.TextInput}
                    />

                    <TouchableOpacity onPress={this.onPressLogin} style={styles.Login}>
                        <Text style={{textAlign:"center", color: "white"}}>Login</Text>
                    </TouchableOpacity>
                    <Text style={{ textAlign: "center", color: "gray", marginTop: "2%"}}>Forgot Password?</Text>
                </View>

                <View style={{flexDirection:"row",alignSelf: "center", marginTop: "5%"}}>
                    <Text style={{color:"gray"}}>DON'T HAVE AN ACCOUNT YET? </Text>
                    <Text style={{color:"#85C9E8"}} onPress={()=>this.props.navigation.navigate("signup")}> SIGN UP</Text>
                </View>

            </View>
        )
    }
}

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({
    loginUser: user => dispatch({type: types.LOGIN_USER, payload: {user}})
})
const connectComponent = connect(mapStateToProps, mapDispatchToProps);

export default connectComponent(Login);



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
        height: "30%",
        justifyContent: "center",
        // backgroundColor: "red"
    },
    BodyNext: {
        width: "100%",
        height: "40%",
        justifyContent: "center",
        // backgroundColor: "red"
    },
    Facebook: {
        width: "90%",
        height: "23%",
        backgroundColor: "#3B5998",
        borderRadius: 40,
        alignSelf: "center",
        margin: "5%",
        justifyContent: "center",
    },
    Google: {
        width: "90%",
        height: "23%",
        borderRadius: 40,
        alignSelf: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: "gray"
    },
    TextInput: {
        width: "90%",
        borderBottomColor: "gray",
        // borderWidth: 1,
        borderRadius: 10,
        alignSelf: "center",
        backgroundColor: "#F2F2F2",
        paddingHorizontal: 30,
        margin: "2%"
    },
    Login: {
        width: "90%",
        height: "18%",
        backgroundColor: "#85C9E8",
        borderRadius: 40,
        alignSelf: "center",
        justifyContent: "center",
        marginTop: "2%"
    }
});
