import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PerfilUsuario from "../../../Screen/Perfil/Perfil";
import EditarPerfil from "../../../Screen/Perfil/EditarPerfil";

const Stack = createNativeStackNavigator();

export default function PerfilStack() {
    return (
        <Stack.Navigator
         screenOptions={{
                headerStyle: { backgroundColor: "#97533aff" }, // Color de fondo
                headerTintColor: "#fff", // Color del texto y los íconos (flecha atrás, etc.)
                headerTitleStyle: { fontWeight: "bold" }, // Opcional: estilo del título
            }}>
            <Stack.Screen
                name="PerfilUsuario"
                component={PerfilUsuario}
                options={{ title: "Perfil" }}
            />
               <Stack.Screen
                name="EditarPerfil"
                component={EditarPerfil}
                options={{ title: "Actualizar perfil" }}
            />
        </Stack.Navigator>
    );

}