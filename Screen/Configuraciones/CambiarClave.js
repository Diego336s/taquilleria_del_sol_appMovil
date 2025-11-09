import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, TextInput, ScrollView, KeyboardAvoidingView, Platform, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import  {cambiarClave} from "../../Src/Navegation/Service/AuthService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../../Src/Navegation/Service/Conexion";


export default function Cambiar_clave() {
    const [clave, setClave] = useState("");
    const [confirmarClave, setConfirmarClave] = useState("");
    const [usuario, setUsuario] = useState(null);
    const [cargando, setCargando] = useState(false);


    useEffect(() => {

        const CargarPerfil = async () => {
            try {
                const token = await AsyncStorage.getItem("userToken");
                if (!token) {
                    await AsyncStorage.multiRemove(["userToken"]);
                    Alert.alert("No se encontró el token, redirigiendo al login");
                    return;
                }
                const response = await api.get("me/cliente");
                setUsuario(response.data);
            } catch (error) {
                console.error("Error al cargar el perfil:", error);
            }
        };

        CargarPerfil();
    }, []);

    const enviarForm = async () => {
        setCargando(true);
        if (clave === "" || confirmarClave === "") {
            Alert.alert("Campos incompletos ☹️", "Debes rellenar todos los campos")
            setCargando(false);
            return;
        }

        if (clave !== confirmarClave) {
            Alert.alert("Error no coinciden 😣", "Las contraseñas no coinciden")
            setCargando(false);
            return;
        }

        if (clave.length < 6 || confirmarClave.length < 6) {
            Alert.alert("Error minimo no alcanzado 😰", "La contraseña debe tener minimo 6 caracteres")
            setCargando(false);
            return;
        }

        if (!usuario?.user?.id) {
            Alert.alert("Error ID 😰", "No pudimos encontrar el ID del usuario")
            setCargando(false);
            return;
        }


        try {
            const id = usuario?.user?.id;
            const response = await cambiarClave(id, clave);
            if (!response.success) {
                Alert.alert("Error cambio de clave ☹️", response.message)
                setCargando(false);
                return;
            }
            Alert.alert("Cambio de clave exitoso 🫡", response.message)
             await AsyncStorage.multiRemove(["userToken"]);
            setCargando(false);

        } catch (error) {
            Alert.alert("Error al cambiar la contraseña", error.message)
            setCargando(false);
        }
    }

    if (!usuario) {
        return (
            <ScrollView contentContainerStyle={styles.scroll}>
                <View style={styles.container}>
                    <ActivityIndicator size="large" color="#f2f2f2ff" />
                    <Text style={{ textAlign: "center", paddingTop: 35, color: "white", fontFamily: 30 }}>
                        Cargando....
                    </Text>
                </View>
            </ScrollView>
        );
    }

    return (

        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
        >
            < ScrollView contentContainerStyle={styles.scroll}>
                <View style={styles.container}>
                    
                    <View style={styles.form}>
                        <Text style={styles.title}>Cambiar clave 🔐</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Nueva Contraseña"
                            placeholderTextColor="#fcfeffff"
                            secureTextEntry
                            value={clave}
                            onChangeText={setClave}
                        />

                        <TextInput
                            style={styles.input}
                            placeholder="Confirmar nueva contraseña"
                            placeholderTextColor="#ffffffff"
                            secureTextEntry
                            value={confirmarClave}
                            onChangeText={setConfirmarClave}
                        />
                    </View>
                    <TouchableOpacity disabled={cargando} style={styles.registerBtn} onPress={enviarForm}>
                        <Text style={styles.registerText}>Cambiar clave</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#2B1B1B",
        padding: 20,
        justifyContent: "center",
    },
    scroll: {
        flexGrow: 1,
        justifyContent: "center",
        backgroundColor: "#2B1B1B-"
    },
    title: {
        color: "white",
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 20,
        textAlign: "center",
    },
    form: {
        backgroundColor: "#A0522D",
        padding: 20,
        borderRadius: 10,
    },
    select: {
        backgroundColor: "#334155",
        color: "white",
        borderRadius: 8,
        marginBottom: 12,
    },
    input: {
        backgroundColor: "#523408ff",
        color: "white",
        padding: 10,
        borderRadius: 8,
        marginBottom: 12,
    },
    registerBtn: {
        backgroundColor: "#74562bff",
        padding: 15,
        borderRadius: 8,
        alignItems: "center",
        marginTop: 10,
    },
    registerText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 16,
    },
    iniciarSesionBtn: {
        marginTop: 10,
        borderRadius: 10,
        overflow: "hidden",
    },
});
