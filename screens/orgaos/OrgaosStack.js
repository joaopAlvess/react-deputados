import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Orgaos from './Orgaos';

const Stack = createNativeStackNavigator();

const OrgasoStack = () => {
  return (
    <>
    <Stack.Navigator
    screenOptions={{
      headerTitleAlign: 'center',
      headerStyle: {
        backgroundColor: '#3c8f51'
      }
    }}>
        <Stack.Screen name="orgaos" component={Orgaos} options={{ title: 'Orgãos' }} /> 
    </Stack.Navigator>
</>
  )
}

export default OrgasoStack