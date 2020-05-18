import React from 'react'
import {
  SafeAreaView,
  View,
  StatusBar,
  Text,
} from 'react-native'

function App() {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <View>
          <Text>
            App
          </Text>
        </View>
      </SafeAreaView>
    </>
  );
};

export default App
