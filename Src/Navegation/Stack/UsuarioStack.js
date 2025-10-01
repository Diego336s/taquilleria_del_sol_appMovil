import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Dashboard from "../../../Screen/Usuario/Dashboard";

const Stack = createNativeStackNavigator();

export default function UsuarioStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Dashboard"
                component={Dashboard}
                options={{ title: "Dashboard" }}
            />
        </Stack.Navigator>
    );

}