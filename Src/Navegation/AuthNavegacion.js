import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../../Screen/Auth/Login";

const Stack = createNativeStackNavigator();

export default function AuthNavegacion() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Login"
                component={Login}
                options={{ title: "Iniciar Sesion" }}
            />
        </Stack.Navigator>
    );

}