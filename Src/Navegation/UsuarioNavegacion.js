import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import UsuarioStack from "./Stack/UsuarioStack";
import Perfil_Stack from "./Stack/PerfilStack";
import Configuraciones_Stack from "./Stack/ConfiguracionesStack";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';
import Entypo from '@expo/vector-icons/Entypo';
import MisTicketsStack from "./Stack/MisTicketsStack";

const Tab = createBottomTabNavigator();

export default function  UsuarioNavegacion(){
    return(
        <Tab.Navigator
        screenOptions={{
            tabBarStyle:{
                backgroundColor: "#a34022ff",
                borderTopWidth: 1,
                borderTopColor: "#f4f4f4ff",
                height: 60,
               
               
            },
            tabBarActiveTintColor: "white",
            tabBarInactiveTintColor: "#e9bdbdff",
            tabBarLabelStyle:{
                fontSize: 12,
                fontWeight: "600",
                alignItems: "center"
               
            },             
        }}
        >
           
            <Tab.Screen 
            name="Inicio"
            component={UsuarioStack}
            options={{
                headerShown: false,
                tabBarIcon:({color, size}) =>(
                   <FontAwesome6 name="house-chimney" size={size}
                    color={color} />
                )
            }}
            
            />

                 <Tab.Screen 
            name="Tickets"
            component={MisTicketsStack}
            options={{
                headerShown: false,
                tabBarIcon:({color, size}) =>(
                 <Entypo name="ticket" size={size} color={color} />
                )
            }}
            />

                <Tab.Screen 
            name="Perfil"
            component={Perfil_Stack}
            options={{
                headerShown: false,
                tabBarIcon:({color, size}) =>(
                    <Ionicons name="people-circle" size={size} color={color}/>
                )
            }}
            />
            

          <Tab.Screen 
            name="Configuracion"
            component={Configuraciones_Stack}
            options={{
                headerShown: false,
                tabBarIcon:({color, size}) =>(
                  <Feather name="settings" size={size} color={color} />
                )
            }}
            />

         
            
           
   
        </Tab.Navigator>
    )
}