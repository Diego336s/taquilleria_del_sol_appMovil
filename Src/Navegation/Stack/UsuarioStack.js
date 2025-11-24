import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Dashboard from "../../../Screen/Usuario/Dashboard";
import MapaEvento from "../../../Screen/Teatro/Mapa";
import PagoStripe from "../../../Screen/Pagos/pagosStripe";
import Confirmacion from "../../../Screen/Pagos/confirmacionPago";
import DetalleFuncion from "../../../Screen/Usuario/DetallesFuncion";
import LectorQR from "../../../Screen/QR/lectorQR";
import DetalleQR from "../../../Screen/QR/detalleQR";
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
                options={{ title: "Dashboard" }}
            />

            <Stack.Screen
                name="MapaEvento"
                component={MapaEvento}
                options={{ title: "Asientos del teatro" }}
            />

            <Stack.Screen
                name="PagoStripe"
                component={PagoStripe}
                options={{ title: "Pago de asientos" }}
            />

            <Stack.Screen
                name="Confirmacion"
                component={Confirmacion}
                options={{ title: "Verificacion del pago" }}
            />
            <Stack.Screen
                name="DetalleFuncion"
                component={DetalleFuncion}
                options={{ title: "Detalles del Ticket" }}
            />
       
        </Stack.Navigator>
    );

}