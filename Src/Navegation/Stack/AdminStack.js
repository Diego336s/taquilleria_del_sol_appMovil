import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DashboardAdmin from "../../../Screen/Admin/Dashboard";
import LectorQR from "../../../Screen/QR/lectorQR";
import DetalleQR from "../../../Screen/QR/detalleQR";
const Stack = createNativeStackNavigator();

export default function AdminStack() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: { backgroundColor: "#97533aff" }, // Color de fondo
                headerTintColor: "#fff", // Color del texto y los íconos (flecha atrás, etc.)
                headerTitleStyle: { fontWeight: "bold" }, // Opcional: estilo del título
            }}>
            <Stack.Screen
                name="Dashboard"
                component={DashboardAdmin}
                options={{ title: "Dashboard" }}
            />          
          
             <Stack.Screen
                name="LectorQr"
                component={LectorQR}
                options={{ title: "Lector QR" }}
            />
             <Stack.Screen
                name="DetalleQr"
                component={DetalleQR}
                options={{ title: "Detalles del ticket" }}
            />
        </Stack.Navigator>
    );

}