import 'react-native-gesture-handler';
import { Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { StackNavigator } from './presentation/navigation/StackNavigator';

export const App = () => {
return (

  <NavigationContainer>
  
    <StackNavigator/>	
  </NavigationContainer>
)
}

