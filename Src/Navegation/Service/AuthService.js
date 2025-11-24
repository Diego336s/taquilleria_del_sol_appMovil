import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "./Conexion";
import dayjs from "dayjs";
import { Alert } from "react-native";

export const login = async (correo, clave) => {
    try {
        const response = await api.post("login/admin-cliente", { correo, clave });

        // ❌ Si el backend responde success = false
        if (!response.data.success) {
            return {
                success: false,
                message: response.data.message || "Credenciales incorrectas"
            };
        }

        console.log("Datos de login", response.data);

        const token = response.data.token;
        const rol = response.data.rol;

        // 🔥 Validar token
        if (!token) {
            return {
                success: false,
                message: "No se recibió el token en la respuesta del servidor.",
            };
        }

        // 🔥 Guardar token y rol
        await AsyncStorage.setItem("userToken", token);
        await AsyncStorage.setItem("rolUser", rol);

        console.log("Token y rol guardados correctamente ✅");

        return {
            success: true,
            message: response.data.message || "Inicio de sesión exitoso",
        };

    } catch (error) {

        console.log("Error al iniciar sesión:", error);

        return {
            success: false,
            message:
                error?.response?.data?.message ||
                error?.message ||
                "Error de conexión con el servidor",
        };
    }
};


export const registrar = async (nombre, apellido, documento, fechaString, sexo, telefono, correo, clave) => {
    const fecha_nacimiento = dayjs(fechaString).format("YYYY-MM-DD");
    try {
        const response = await api.post("/registrar/cliente", { nombre, apellido, documento, fecha_nacimiento, sexo, telefono, correo, clave });
        if (!response.data.success) {
            console.log("Error al registrar", response.data)
            return {
                success: false,
                message: response.data.message
            }
        }
        const token = response.data.token_access;
        const rol = response.data.rol;
        if (token) {
            await AsyncStorage.setItem("userToken", token);
            await AsyncStorage.setItem("rolUser", rol);
        } else {
            Alert.alert("Error de token", "No sea podido obtener el token al momento de registro, Inicia sesion");
            return;
        }
        return {
            success: true,
            message: response.data.message
        }
    } catch (error) {
        return {
            success: false,
            message: error?.response?.data?.message || error?.message || "Error al registrar el cliente",
        }
    }
}

export const logout = async () => {
    try {
        const response = await api.post("logout/cliente");
        if (!response.data.success) {
            return {
                success: false,
                message: response.data.message
            }
        }
        await AsyncStorage.removeItem("userToken");
        await AsyncStorage.removeItem("rolUser");
        return {
            success: true,
            message: response.data.message
        }
    } catch (error) {
        return {
            success: false,
            message: error?.response?.data?.message || error?.message || "Error al cerrar sesion el cliente",
        }
    }
}

export const enviarCodigoDeVerificacion = async (email) => {
    try {
        const response = await api.post("envio/codigo/verificacion", { email });
        if (!response.data.success) {
            return {
                success: false,
                message: response.data.message
            }
        }
        return {
            success: true,
            message: response.data.message
        }
    } catch (error) {
        return {
            success: false,
            message: error?.message || response?.error || "Error inesperado en el servidor"
        }
    }
}

export const verificarCodigo = async (correo, codigo) => {
    try {
        const response = await api.post("verificar/codigo", { correo, codigo });
        if (!response.data.success) {
            return {
                success: false,
                message: response.data.message
            }
        }
        return {
            success: true,
            message: response.data.message
        }
    } catch (error) {
        return {
            success: false,
            message: error?.message || response?.error || "Error inesperado en el servidor"
        }
    }
}

export const restablecerClave = async (correo, clave) => {
    try {
        const response = await api.post("olvide/clave/cliente", { correo, clave });
        if (!response.data.success) {
            return {
                success: false,
                message: response.data.message
            }
        }
        return {
            success: true,
            message: response.data.message
        }
    } catch (error) {
        return {
            success: false,
            message: error?.message || response?.error || "Error inesperado en el servidor"
        }
    }
}




export const cambiarClave = async (id, clave) => {
    try {
        const response = await api.put("cambiar/clave/cliente/" + id, {
            clave
        });
        if (!response.data.success) {
            return {
                success: false,
                message: response.data.message
            }
        }
        return {
            success: true,
            message: response.data.message
        }
    } catch (error) {
        return {
            success: false,
            message: error.message || response.error || "Error inesperado en el servidor"
        }

    }
}



export const cambiarCorreo = async (id, correo) => {
    try {
        const response = await api.put("cambiar/correo/cliente/" + id, {
            correo
        });
        if (!response.data.success) {
            return {
                success: false,
                message: response.data.message
            }
        }

        return {
            success: true,
            message: response.data.message
        }
    } catch (error) {
        return {
            success: false,
            message: error.message || response.error || "Error inesperado en el servidor"
        }

    }
}