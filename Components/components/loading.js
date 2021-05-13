import React from 'react'
import { ActivityIndicator, View } from 'react-native'

const App = () => (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="small" color="black" />
    </View>
)

export default App;