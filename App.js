import { NavigationContainer } from "@react-navigation/native";
import { PaperProvider } from "react-native-paper";
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DeputadosStack from "./screens/deputados/DeputadosStack";
import PartidosStack from "./screens/partidos/PartidosStack";
import OrgasoStack from "./screens/orgaos/OrgaosStack";
import EventosStack from "./screens/eventos/EventosStack";
import FrentesStack from "./screens/frentes/FrentesStack";


const Tab = createMaterialBottomTabNavigator();

export default function App() {
  return (
    <>
      <PaperProvider>
        <NavigationContainer>
          <Tab.Navigator
          barStyle={{backgroundColor: "#3c8f51"}}
          >
            <Tab.Screen
              name="Deputados"
              component={DeputadosStack}
              options={{
                tabBarIcon: () => (
                  <MaterialCommunityIcons name="account-tie" size={26} />
                ),
              }}
            />
            <Tab.Screen
              name="Eventos"
              component={EventosStack}
              options={{
                tabBarIcon: () => (
                  <MaterialCommunityIcons name="cash" size={26} />
                ),
              }}
            />
            <Tab.Screen
              name="Partidos"
              component={PartidosStack}
              options={{
                tabBarIcon: () => (
                  <MaterialCommunityIcons name="cash" size={26} />
                ),
              }}
            />
            <Tab.Screen
              name="Orgãos"
              component={OrgasoStack}
              options={{
                tabBarIcon: () => (
                  <MaterialCommunityIcons name="cash" size={26} />
                ),
              }}
            />
            <Tab.Screen
              name="Frentes"
              component={FrentesStack}
              options={{
                tabBarIcon: () => (
                  <MaterialCommunityIcons name="cash" size={26} />
                ),
              }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </>
  );
}
