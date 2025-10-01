import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Configuraciones from "../../../Screen/Configuraciones/Configuraciones";

const Stack = createNativeStackNavigator();

export default function ConfiguracionesStack({logout}) {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Configuraciones"                
                children={(props)=><Configuraciones {...props} logout={logout}/>}
                options={{ title: "Configuraciones" }}
            />
        </Stack.Navigator>
    );

}