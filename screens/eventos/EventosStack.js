import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react'
import Eventos from './Eventos';


const Stack = createNativeStackNavigator();

const EventosStack = () => {
  return (
    <>
    <Stack.Navigator>
        <Stack.Screen name="eventos" component={Eventos} options={{ title: 'Eventos' }} />              
    </Stack.Navigator>
</>
  )
}

export default EventosStack