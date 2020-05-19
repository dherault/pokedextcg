import React from 'react'
import * as eva from '@eva-design/eva'
import { Layout, Text } from '@ui-kitten/components'

import useCommonStyles from '../../commonStyles'

import sets from '../../../data/sets.json'

function SetScene(props) {
  const _ = useCommonStyles()

  return (
    <Layout style={_.sceneRoot}>
      <Text>
        {JSON.stringify(props)}
      </Text>
    </Layout>
  )
}

export default SetScene
