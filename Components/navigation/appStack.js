
import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import GetStarted from "../Screens/GetStarted";
import Dashboard from "../Screens/Dashboard";
import Question from "../Screens/Question";
import GoodJob from "../Screens/GoodJob";
import Settings  from '../Screens/Settings';
import Notifications from '../Screens/notifications';
import Marked from '../Screens/marked'
import Progress from '../Screens/progress'

const {Navigator, Screen} = createStackNavigator();

const App = (props) => (
    <Navigator screenOptions={{headerShown: false}}>
        <Screen name="getstarted" component={GetStarted} />
        <Screen name="dashboard" component={Dashboard} />
        <Screen name="question" component={Question} />
        <Screen name="goodjob" component={GoodJob} />
        <Screen name="settings" component={Settings} />
        <Screen name="notification" component={Notifications} />
        <Screen name="marked" component={Marked} />
        <Screen name="progress" component={Progress} />
    </Navigator>
)

export default App;