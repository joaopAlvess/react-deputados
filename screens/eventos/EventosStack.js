import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react'
import Eventos from './Eventos';


const Stack = createNativeStackNavigator();

const EventosStack = () => {
  return (
    <>
    <Stack.Navigator
    screenOptions={{
      headerTitleAlign: 'center',
      headerStyle: {
        backgroundColor: '#3c8f51'
      }
    }}>
        <Stack.Screen name="eventos" component={Eventos} options={{ title: 'Eventos' }} />              
    </Stack.Navigator>
</>
  )
}

export default EventosStack