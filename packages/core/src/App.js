import React from 'react'
import { SafeAreaView, StatusBar } from 'react-native'
import * as eva from '@eva-design/eva'
import { ApplicationProvider } from '@ui-kitten/components'

import useCommonStyles from './commonStyles'

import Router from './Router'

function App() {
  const _ = useCommonStyles()

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <ApplicationProvider {...eva} theme={eva.dark}>
        <SafeAreaView style={_.flex}>
          <Router />
        </SafeAreaView>
      </ApplicationProvider>
    </>
  )
}

export default App
