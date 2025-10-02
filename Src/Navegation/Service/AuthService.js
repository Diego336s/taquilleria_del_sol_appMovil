import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "./Conexion";
import dayjs from "dayjs";

export const login = async (correo, clave) => {
    try {
        const response = await api.post("/login/cliente", { correo, clave });
        console.log("Respuesta del servidor", response.data);
        if (!response.data.success) {
            return {
                success: false,
                message: response.data.message
            }
        }
        const token = response.data.token;
        if (token) {
            await AsyncStorage.setItem("userToken", token);
        } else {
            console.error("No se recibio el token en la respuesta");
            return {
                success: false,
                message: "No se recibio el token en la respuesta"
            }
        }
        return {
            success: true,
            message: response.data.message
        }

    } catch (error) {
        if (error.response) {
            console.log("Error al iniciar sesión:", error.response.data);
            return {
                success: false,
                message: error.response.data.message || "Error en las credenciales",
            };
        } else {
            console.log("Error al iniciar sesión:", error.message);
            return {
                success: false,
                message: "Error de conexión con el servidor",
            };
        }
    }

}

export const registrar = async(nombre, apellido, documento, fecha_nacimiento, telefono, correo, clave)=>{
    try {
        const response = await api.post("/registrar/cliente",{nombre, apellido, documento, fecha_nacimiento, telefono, });
    } catch (error) {
        
    }
}