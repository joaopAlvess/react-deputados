import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react'
import Despesas from './Despesas';

const Stack = createNativeStackNavigator();

const DespesasStack = () => {
  return (
    <>
    <Stack.Navigator
    screenOptions={{
      headerTitleAlign: 'center',
      headerStyle: {
        backgroundColor: '#3c8f51'
      }
    }}>
        <Stack.Screen name="despesas" component={Despesas} options={{ title: 'Despesas' }} />              
    </Stack.Navigator>
</>
  )
}

export default DespesasStack