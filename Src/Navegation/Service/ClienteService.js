
import api from "./Conexion"



export const actualizarPerfil = async (id, nombre, apellido, telefono, sexo) => {
    try {
        const response = await api.put("actualizarCliente/" + id, {
            nombre,
            apellido,
            telefono,
            sexo
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



