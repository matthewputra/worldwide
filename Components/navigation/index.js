import React, { useEffect } from 'react'
import {NavigationContainer} from '@react-navigation/native'
import { useState } from 'react'
import { connect } from 'react-redux'
import AppStack from './appStack'
import AuthStack from './authStack'
import {Loading} from '../components'
import { types } from '../action'

const App = (props) => {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const user = props.currentUser;
        setLoading(false);        
        return user;
    })

    return (
        <NavigationContainer>
            {loading ? <Loading /> : props.currentUser ? <AppStack / > : <AuthStack />}
        </NavigationContainer>
    )


}


const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({
    loginUser: user => dispatch({type: types.LOGIN_USER, payload: {user}})
});
const connectComponent = connect(mapStateToProps, mapDispatchToProps);
export default connectComponent(App);