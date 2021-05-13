import React, { useState } from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity, Dimensions, TextInput, ScrollView, Modal } from 'react-native'
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { types } from '../action';
import api from '../api';
import {Loading} from '../components'


const {width, height} = Dimensions.get('screen')

const InputField = ({placeholder, secureTextEntry, icon, defaultValue, onChangeText, onFocus, onBlur}) => (
    <View style={styles.inputfield}>
        <TextInput style={styles.input} defaultValue={defaultValue} secureTextEntry={secureTextEntry} onFocus={onFocus} onBlur={onBlur} onChangeText={onChangeText} placeholder={placeholder} />
        {icon ? <Icon name={icon} size={20} color="#ccc" /> : null}
    </View>
)

const App = (props) => {
    const [user_name, setUsername] = useState(props.currentUser.user);
    const [email, setEmail] = useState(props.currentUser.email);
    const [password, setPassword] = useState(props.currentUser.password);
    const [loading, setLoading] = useState(false);
    const [deleteAccountModal, setDeleteAccountModal] = useState(false);
    const [privacyModalShown, setPrivacyModalShown] = useState(false);


    const logOut = async () => {
        await AsyncStorage.removeItem("@currentUser");
        props.logOut();
    }

    const updateUserInfo = async () => {
        setLoading(true);
        const res = await api.updateUser({user_name, password, email, token: props.currentUser.token});
        setLoading(false);
        console.log(res);
    }


    const DeleteAccountModal = () => <View style={{width : width / 1.05,padding: 20, backgroundColor: '#fff', position: 'absolute', top: height / 3, shadowColor: "#ccc", shadowOffset: {width: 3, height: 3}, shadowOpacity: 2, zIndex: 1000, alignSelf: 'center', borderRadius: 40, height: height / 3.5}}>
        <View style={{flex: 1.5}}>
            <TouchableOpacity onPress={() => setDeleteAccountModal(false)}>
                <Text style={{fontSize: 18, textTransform: 'uppercase', color: '#B4BBFF'}}>Back</Text>
            </TouchableOpacity>
        </View>
        <View style={{flex: 6, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{fontSize: 24, width: '90%', color: '#888', textAlign: 'center'}}>Are you sure you want to delete your account?</Text>
        </View>
        <View style={{flex: 2}}>
            <TouchableOpacity onPress={logOut} style={{backgroundColor: "#B4BBFF", width: 100, height: 50, alignSelf: 'center', borderRadius: 40, alignItems: 'center', justifyContent :'center'}}>
                <Text style={{fontSize: 18, color: 'white'}}>Yes</Text>
            </TouchableOpacity>
        </View>
    </View>


    return loading ? <Loading /> : (
        <View style={styles.container}>
            {deleteAccountModal ? <DeleteAccountModal /> : null}
            <View style={styles.header}>
                <Text>iKeep</Text>
                <Image source={require('../../Assets/man.png')} style={styles.image} />
            </View>
            <View style={styles.body}>
            <ScrollView>
                <View style={styles.heading}>
                    <Text style={styles.head_text}>Account</Text>
                </View>
                <View style={styles.form}>
                    <InputField placeholder="Username" onChangeText={text => setUsername(text)} defaultValue={user_name} />
                    <InputField placeholder="Password" secureTextEntry icon="lock" onChangeText={text => setPassword(text)} defaultValue={password} />
                    <InputField placeholder="Email" onChangeText={text => setEmail(text)} defaultValue={email} />

                    <View style={styles.center}>
                        <TouchableOpacity onPress={updateUserInfo} style={styles.logOutBtn}>
                            <Text style={styles.btnText}>Update</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.heading}>
                     <Text style={styles.head_text}>Notifications</Text>
                </View>
                <View style={styles.form}>
                <TouchableOpacity onPress={() => props.navigation.navigate("notification")} style={styles.inputfield}>
                         <Text style={{flex: 1, padding: 10}}>App Notifications</Text>
                         <Icon name="bell-o" size={20} color="#ccc" />
                     </TouchableOpacity>
                </View>
                <View style={styles.heading}>
                     <Text style={styles.head_text}>Preferences</Text>
                </View>
                <View class="form">
                <TouchableOpacity onPress={() => setPrivacyModalShown(true)} style={styles.inputfield}>
                         <Text style={{flex: 1, padding: 10}}>Privacy & Data</Text>
                         <Icon name="exclamation-circle" size={20} color="#ccc" />
                     </TouchableOpacity>
                     <TouchableOpacity onPress={() => setDeleteAccountModal(true)} style={styles.inputfield}>
                         <Text style={{flex: 1, padding: 10}}>Delete Account</Text>
                         <Icon name="trash-o" size={20} color="#ccc" />
                     </TouchableOpacity>
                     <View style={styles.center}>
                         <TouchableOpacity onPress={logOut} style={styles.logOutBtn}>
                             <Text style={styles.btnText}>Log Out</Text>
                         </TouchableOpacity>
                     </View>
                </View>
                </ScrollView>
            </View>
            <View style={styles.Footer}>
                    <View style={{flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 15}}>
                        <TouchableOpacity onPress={() => props.navigation.navigate("dashboard")}>
                            <Icon name="home" size={25} style={{color:"gray", alignSelf: "center"}} />
                            <Text style={{fontSize: 12, textAlign: "center"}}>Home</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => props.navigation.navigate("marked")}>
                            <Icon name="star" size={25} style={{color:"gray", alignSelf: "center"}} />
                            <Text style={{fontSize: 12, textAlign: "center"}}>Marked</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => props.navigation.navigate('settings')}>
                            <Icon name="rocket" size={25} style={{color:"gray", alignSelf: "center"}} />
                            <Text style={{fontSize: 12, textAlign: "center"}}>Settings</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => props.navigation.navigate("progress")}>
                            <Icon name="heart" size={25} style={{color:"gray", alignSelf: "center"}} />
                            <Text style={{fontSize: 12, textAlign: "center"}}>Progress</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <Modal visible={privacyModalShown} presentationStyle="fullScreen">
                   <View style={{paddingVertical: 20, flex: 1}}>
                     <View style={styles.header}>
                          <View style={{width: '100%', flexDirection: 'row', justifyContent :'space-between'}}>
                            <View style={{flex: 0.75, paddingLeft: 20}}>
                                 <TouchableOpacity onPress={() => setPrivacyModalShown(false)}>
                                    <Icon name="times" size={20} color="#ccc" />
                                </TouchableOpacity>
                            </View>
                            <Text style={{flex: 1}}>iKeep</Text>
                          </View>
                          <Text style={{fontSize: 20, fontWeight: "700"}}>Privacy Policy</Text>
                    </View>
                   </View>
                </Modal>
        </View>
    )
}

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({
    logOut: () => dispatch({type: types.LOGOUT_USER})
});
const connectComponent = connect(mapStateToProps, mapDispatchToProps);
export default connectComponent(App);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    center: {
        width: '100%',
        alignItems: 'center',
        padding: 10,
    },  
    logOutBtn: {
        width: width / 3,
        alignItems :'center',
        justifyContent: 'center',
        padding: 10,
        borderRadius: 20,
        backgroundColor: "#aaa",
    },
    btnText: {
        fontSize: 16,
        color: 'white'
    },
    header: {
        flex: 1.5,
        alignItems: 'center',
    },
    image: {
        marginTop: 10,
        width: 120,
        height: 80
    },
    body: {
        flex: 7,
    },
    Footer: {
        flex: 1,
        justifyContent: "center"
    },
    heading: {
        marginVertical: "5%",
        width: width / 1.05,
        alignSelf: 'center',
        paddingHorizontal: 20,
        justifyContent: 'center',
        backgroundColor: "#B4BBFF",
        borderRadius: 20,
        height: 40,
    },
    head_text: {
        color: "#5e4fa8",
        fontSize: 16,
        fontWeight: '600'
    },
    inputfield: {
        flexDirection: 'row',
        width: width / 1.15,
        marginVertical: 3,
        alignSelf: 'center',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc'
    },
    input: {
        flex: 0.9
    }
})