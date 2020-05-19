import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Sets from './scenes/Sets'
import Set from './scenes/Set'

const { Navigator, Screen } = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Navigator
        headerMode="none"
        initialRouteName="Sets"
      >
        <Screen name="Sets" component={Sets}/>
        <Screen name="Set" component={Set}/>
      </Navigator>
    </NavigationContainer>
  )
}

export default App
