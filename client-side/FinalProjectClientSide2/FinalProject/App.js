import {
  createStackNavigator,
  createAppContainer
} from 'react-navigation';
import MainPage from './MainPage'
import SoundRecord from './SoundRecord'

const RootStack = createStackNavigator({
  MainPage: {
  screen: MainPage
},
SoundRecord: {
  screen: SoundRecord
}
},
{
  initialRouteName: 'MainPage',
});

const App = createAppContainer(RootStack);

export default App;