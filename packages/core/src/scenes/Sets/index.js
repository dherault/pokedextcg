import React from 'react'
import * as eva from '@eva-design/eva'
import { Layout, Text } from '@ui-kitten/components'

import useCommonStyles from '../../commonStyles'

import sets from '../../../data/sets.json'

function SetsScene({ navigation }) {
  const _ = useCommonStyles()

  function handleSetPress(setId) {
    navigation.navigate('Set', { setId })
  }

  return (
    <Layout style={_.sceneRoot}>
      {sets.map(set => (
        <Text
          key={set.id}
          onPress={() => handleSetPress(set.id)}
        >
          {set.name} ({set.id})
        </Text>
      ))}
    </Layout>
  )
}

export default SetsScene
