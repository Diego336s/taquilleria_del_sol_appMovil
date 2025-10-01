import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PerfilUsuario from "../../../Screen/Perfil/Perfil";

const Stack = createNativeStackNavigator();

export default function PerfilStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="PerfilUsuario"
                component={PerfilUsuario}
                options={{ title: "Perfil" }}
            />
        </Stack.Navigator>
    );

}