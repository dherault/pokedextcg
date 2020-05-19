
import { StyleService, useStyleSheet } from '@ui-kitten/components'

const commonStyles = StyleService.create({
  flex: {
    flex: 1,
  },
  sceneRoot: {
    flex: 1,
    padding: 12,
  },
})

export default () => useStyleSheet(commonStyles)
