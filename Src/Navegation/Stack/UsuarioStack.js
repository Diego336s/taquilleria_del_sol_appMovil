import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Dashboard from "../../../Screen/Usuario/Dashboard";
import MapaStack from "../Stack/MapaStack";
const Stack = createNativeStackNavigator();

export default function UsuarioStack() {
    return (
        <Stack.Navigator
         screenOptions={{
                headerStyle: { backgroundColor: "#97533aff" }, // Color de fondo
                headerTintColor: "#fff", // Color del texto y los íconos (flecha atrás, etc.)
                headerTitleStyle: { fontWeight: "bold" }, // Opcional: estilo del título
            }}>
            <Stack.Screen
                name="Dashboard"
                component={Dashboard}
                options={{ title: "Dashboard"}}
            />

                <Stack.Screen
                name="MapaStack"
                component={MapaStack}
                options={{ headerShown: false }}
            />

        </Stack.Navigator>
    );

}