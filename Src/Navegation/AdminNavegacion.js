import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AdminStack from "./Stack/AdminStack";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';


const Tab = createBottomTabNavigator();

export default function  AdminNavegacion(){
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
            component={AdminStack}
            options={{
                headerShown: false,
                tabBarIcon:({color, size}) =>(
                   <FontAwesome6 name="house-chimney" size={size}
                    color={color} />
                )
            }}            
            />            
       
        </Tab.Navigator>
    )
}