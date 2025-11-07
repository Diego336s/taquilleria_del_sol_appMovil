import { createNativeStackNavigator } from "@react-navigation/native-stack";
import EnvioCodigoDeVerificacion from "../../../Screen/Auth/EnvioDeCodigo";
import VerificacionDelCodigo from "../../../Screen/Auth/VerificarCodigo";
import CambiarClaveOlvidada from "../../../Screen/Auth/CambioDeClaveAlOlvidarClave";

const Stack = createNativeStackNavigator();

export default function OlvideMiClaveStack() {
    return (
        <Stack.Navigator
         screenOptions={{
                headerStyle: { backgroundColor: "#97533aff" }, // Color de fondo
                headerTintColor: "#fff", // Color del texto y los íconos (flecha atrás, etc.)
                headerTitleStyle: { fontWeight: "bold" }, // Opcional: estilo del título
            }}>
            <Stack.Screen
                name="EnvioDeCodigo"
                component={EnvioCodigoDeVerificacion}
                options={{ title: "Envio del codigo"}}
            />
                <Stack.Screen
                name="VerificacionDelCodigo"
                component={VerificacionDelCodigo}
                options={{ title: "Verificacion del codigo"}}
            />
                     <Stack.Screen
                name="CambiarClaveOlvida"
                component={CambiarClaveOlvidada}
                options={{ title: "Cambiar clave"}}
            />
        </Stack.Navigator>
    );

}