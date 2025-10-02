import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../../Screen/Auth/Login";
import Registro from "../../Screen/Auth/Registrar";
const Stack = createNativeStackNavigator();

export default function AuthNavegacion() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: { backgroundColor: "#97533aff" }, // Color de fondo
                headerTintColor: "#fff", // Color del texto y los íconos (flecha atrás, etc.)
                headerTitleStyle: { fontWeight: "bold" }, // Opcional: estilo del título
            }}>
            <Stack.Screen
                name="Login"
                component={Login}
                options={{ title: "Login" }}
            />

            <Stack.Screen
                name="RegistrarCliente"
                component={Registro}
                options={{ title: "Registrar" }}
            />
        </Stack.Navigator>
    );

}