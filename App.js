/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import AppContainer from "./Components/navigation";
import {Provider} from 'react-redux'
import store from './Components/store'

export default class App extends React.Component{
  render(){
    return(
        <Provider store={store}>
          <AppContainer/>
        </Provider>
    )
  }
}
