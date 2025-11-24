import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MisTickets from "../../../Screen/Tickets/MisTickets";
import DetalleTicket from "../../../Screen/Tickets/DetalleTicket";

const Stack = createNativeStackNavigator();

export default function MisTicketsStack() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: { backgroundColor: "#97533aff" }, // Color de fondo
                headerTintColor: "#fff", // Color del texto y los íconos (flecha atrás, etc.)
                headerTitleStyle: { fontWeight: "bold" }, // Opcional: estilo del título
            }}>
            <Stack.Screen
                name="Mistickets"
                component={MisTickets}
                options={{ title: "Mis tickets" }}
            />          
          
             <Stack.Screen
                name="DetalleTicket"
                component={DetalleTicket}
                options={{ title: "Detalle ticket" }}
            />
           
        </Stack.Navigator>
    );

}