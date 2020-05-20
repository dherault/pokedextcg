import React from 'react'
import { View, Image } from 'react-native'
import { Layout, Text } from '@ui-kitten/components'

import useCommonStyles from '../../commonStyles'

import sets from '../../../data/sets.json'
import cards from '../../../data/cards.json'

function SetScene({ route }) {
  const _ = useCommonStyles()

  const { setId } = route.params;
  const set = sets.find(set => set.id === setId)

  return (
    <Layout style={_.sceneRoot}>
      <Text>
        {set.name}
      </Text>
      {cards
      .filter(card => card.setId === setId)
      .map(card => (
        <View key={card.number}>
          <Text>
            {card.name}
          </Text>
          <Image source={{ uri: `https://pokedextcg.com/images/${card.imageFileName}` }} />
        </View>
      ))}
    </Layout>
  )
}

export default SetScene
