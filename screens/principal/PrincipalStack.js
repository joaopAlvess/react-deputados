import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Partidos from './Principal';

const Stack = createNativeStackNavigator();

const PartidosStack = () => {
  return (
    <>
    <Stack.Navigator
    screenOptions={{
      headerTitleAlign: 'center',
      headerStyle: {
        backgroundColor: '#3c8f51'
      }
    }}>
        <Stack.Screen name="partidos" component={Partidos} options={{ title: 'Partidos' }} /> 
    </Stack.Navigator>
</>
  )
}

export default PartidosStack