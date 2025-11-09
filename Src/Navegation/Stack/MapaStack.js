import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Mapa from "../../../Screen/Teatro/Mapa";

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
                name="Mapa"
                component={Mapa}
                options={{ title: "Teatro"}}
            />
        </Stack.Navigator>
    );

}