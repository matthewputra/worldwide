import React from 'react'
import Splash from "../Screens/Splash";
import Login from "../Screens/Login";
import SignUp from "../Screens/SignUp";
import {createStackNavigator} from '@react-navigation/stack'

const {Navigator, Screen} = createStackNavigator();

const App = (props) => (
    <Navigator screenOptions={{headerShown: false}}>
        <Screen name="splash" component={Splash} />
        <Screen name="login" component={Login} />
        <Screen name="signup" component={SignUp} />
    </Navigator>
)

export default App;