import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Configuraciones from "../../../Screen/Configuraciones/Configuraciones";
import Cambiar_clave from "../../../Screen/Configuraciones/CambiarClave";
import Cambiar_correo from "../../../Screen/Configuraciones/CambiarCorreo";
const Stack = createNativeStackNavigator();

export default function ConfiguracionesStack() {
    return (
        <Stack.Navigator
         screenOptions={{
                headerStyle: { backgroundColor: "#97533aff" }, // Color de fondo
                headerTintColor: "#fff", // Color del texto y los íconos (flecha atrás, etc.)
                headerTitleStyle: { fontWeight: "bold" }, // Opcional: estilo del título
            }}>
            <Stack.Screen
                name="ConfiguracionesScreen"
                component={Configuraciones}
                options={{ title: "Configuraciones" }}
            />
            <Stack.Screen
                name="CambiarClave"
                component={Cambiar_clave}
                options={{ title: "Cambio de contraseña" }}
            />
            <Stack.Screen
                name="CambiarCorreo"
                component={Cambiar_correo}
                options={{ title: "Cambio de correo" }}
            />
        </Stack.Navigator>
    );

}