import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, TextInput, ScrollView, KeyboardAvoidingView, Platform, TouchableOpacity, Alert, ActivityIndicator } from "react-native";




import { enviarCodigoDeVerificacion } from "../../Src/Navegation/Service/AuthService";

export default function EnvioCodigoDeVerificacion({ navigation }) {

    const [correo, setCorreo] = useState("");
    const [cargando, setCargando] = useState(false);

    const enviarForm = async () => {
        setCargando(true);
        if (correo === "") {
            Alert.alert("Campos incompletos ☹️", "Debes rellenar todos los campos")
            setCargando(false);
            return;
        }



        try {

            const response = await enviarCodigoDeVerificacion(correo);
            if (!response.success) {
                Alert.alert("Error al enviar codigo ❌", response.message)
                setCargando(false);
                return;
            }
            Alert.alert("Codigo enviado ✅", response.message)

            navigation.navigate("VerificacionDelCodigo", { correo: correo });
            setCargando(true);
        } catch (error) {
            Alert.alert("Error inesperado ❌", error.message)
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
                        <Text style={styles.title}>Enviar codigo de verficacion 📧</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Correo"
                            placeholderTextColor="#94a3b8"
                            keyboardType="email-address"
                            value={correo}
                            onChangeText={setCorreo}
                        />

                    </View>
                    <TouchableOpacity style={styles.registerBtn} disabled={cargando} onPress={enviarForm}>
                        {!cargando ? (
                            <Text style={styles.registerText}>Enviar codigo</Text>
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
        backgroundColor: "#2B1B1B"
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
        marginBottom: 30
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
