import { AppRegistry } from 'react-native'

import App from 'core/src/App'

AppRegistry.registerComponent('myprojectname', () => App)
AppRegistry.runApplication('myprojectname', {
  rootTag: document.getElementById('root'),
})
