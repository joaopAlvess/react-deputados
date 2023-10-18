import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react'
import Deputados from './Deputados';
import Detalhes from './Detalhes';

const Stack = createNativeStackNavigator();

const DeputadosStack = () => {
  return (
    <>
    <Stack.Navigator>
        <Stack.Screen name="deputados" component={Deputados} options={{ title: 'Deputados' }} />
        <Stack.Screen name="detalhes" component={Detalhes} options={{ title: 'Detalhes do Deputado' }} />        
    </Stack.Navigator>
</>
  )
}

export default DeputadosStack