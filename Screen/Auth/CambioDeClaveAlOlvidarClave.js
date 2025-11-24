import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, TextInput, ScrollView, KeyboardAvoidingView, Platform, TouchableOpacity, Alert, ActivityIndicator } from "react-native";

import { CommonActions, useRoute } from "@react-navigation/native";

import { restablecerClave } from "../../Src/Navegation/Service/AuthService";
export default function EnvioCodigoDeVerificacion({ navigation }) {
    const route = useRoute();
    const correo = route.params.correo;

    const [clave, setClave] = useState("");
    const [confirmarClave, setConfirmarClave] = useState("");
    const [cargando, setCargando] = useState(false);

    const enviarForm = async () => {
        setCargando(true);
        console.log(correo)
        if (correo === "" || clave === "" || confirmarClave === "") {
            Alert.alert("Campos incompletos ☹️", "Debes rellenar todos los campos")
            setCargando(false);
            return;
        }

        if (clave !== confirmarClave) {
            Alert.alert("Error clave ☹️", "Las claves no coinciden")
            setCargando(false);
            return;
        }

        if (clave.length < 6 || confirmarClave.length < 6) {
            Alert.alert("Error clave ☹️", "La clave debe tener minimo 6 caracteres")
            setCargando(false);
            return;
        }



        try {

            const response = await restablecerClave(correo, clave);
            if (!response.success) {
                Alert.alert("Error al cambiar la clave ❌", response.message)
                setCargando(false);
                return;
            }
            Alert.alert("Clave cambiada ✅", response.message)
            navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [{ name: "Login" }], // Esto debe existir dentro de AuthNavegation
                })
            );

            setCargando(false);

        } catch (error) {
            Alert.alert("Error inesperado", error.message)
        }
    }

    return (

        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
        >
            < ScrollView contentContainerStyle={styles.scroll}>
                <View style={styles.container}>

                    <View style={styles.form}>
                        <Text style={styles.title}>Olvide mi clave 🔐</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Correo"
                            placeholderTextColor="#94a3b8"
                            keyboardType="email-address"
                            editable={false}
                            value={correo}

                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Clave"
                            placeholderTextColor="#94a3b8"
                            secureTextEntry
                            value={clave}
                            onChangeText={setClave}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Confirmar Clave"
                            placeholderTextColor="#94a3b8"
                            secureTextEntry
                            value={confirmarClave}
                            onChangeText={setConfirmarClave}
                        />
                    </View>
                    <TouchableOpacity style={styles.registerBtn} disabled={cargando} onPress={enviarForm}>
                        {!cargando ? (
                            <Text style={styles.registerText}>Cambiar clave</Text>
                        ) : (
                            <ActivityIndicator size="small" color="#f5f5f5ff" />
                        )}

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
        backgroundColor: "#0f172a"
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
        backgroundColor: "#2B1B1B",
        color: "white",
        padding: 10,
        borderRadius: 8,
        marginBottom: 12,
    },
    registerBtn: {
        backgroundColor: "#6d4b0cff",
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
