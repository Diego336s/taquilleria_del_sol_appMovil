import react, { useEffect, useRef, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppState } from "react-native";
import AuthNavegacion from "./AuthNavegacion";
import UsuarioNavegacion from "./UsuarioNavegacion";




export default function AppNavegacion() {

    const [userToken, setUserToken] = useState(null);

    const appState = useRef(AppState.currentState);

    const loadToken = async () => {
        try {
            const token = await AsyncStorage.getItem("userToken");
            setUserToken(token);
        } catch (error) {
            console.error("Error al cargar el token desde AsyncStorage:", error);
        }
    }

    useEffect(() => {
        loadToken();
    }, []);

    useEffect(() => {
        const handleAppStateChange = (nexAppState) => {
            if (appState.current.match(/inactive|background/) && nexAppState === "active") {
                console.log("La aplicacion ha vuelto al primer plano, verificando el token...")
                loadToken();
            }
            appState.current = nexAppState;
        }
        const subscription = AppState.addEventListener("change", handleAppStateChange);
        return () => {
            subscription.remove(); // cleanup
        };
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {

            loadToken();
        }, 2000); // 2 segundos

        return () => clearInterval(interval);
    }, []);





    return (
        <NavigationContainer>
            {!userToken ? (
                <AuthNavegacion />
            ) : (
                <UsuarioNavegacion />
            )}
        </NavigationContainer>
    );

}
