import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Partidos from './Frentes';
import Frentes from './Frentes';

const Stack = createNativeStackNavigator();

const FrentesStack = () => {
  return (
    <>
    <Stack.Navigator
    screenOptions={{
      headerTitleAlign: 'center',
      headerStyle: {
        backgroundColor: '#3c8f51'
      }
    }}>
        <Stack.Screen name="frentes" component={Frentes} options={{ title: 'Frentes' }} /> 
    </Stack.Navigator>
</>
  )
}

export default FrentesStack