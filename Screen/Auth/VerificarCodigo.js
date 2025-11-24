import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, TextInput, ScrollView, KeyboardAvoidingView, Platform, TouchableOpacity, Alert, ActivityIndicator } from "react-native";



import { useRoute } from "@react-navigation/native";

import { verificarCodigo } from "../../Src/Navegation/Service/AuthService";

export default function VerificacionDelCodigo({ navigation }) {
    const route = useRoute();
    const correo = route.params.correo;
    const [cargando, setCargando] = useState(false);

    const [codigo, setCodigo] = useState("");


    const enviarForm = async () => {
        setCargando(true);
        console.log(correo)

        if (!correo || correo === "") {
            Alert.alert("Error correo ❌", "Correo no obtenido");

            navigation.navigate("EnvioDeCodigo");
            setCargando(false);
            return;
        }

        if (codigo === "") {
             Alert.alert("Error codigo ❌", "Debes llenar el campo");
            setCargando(false);
            return;
        }

        if(codigo.length !== 6){
             Alert.alert("Error codigo ❌", "El codigo es de 6 digitos");
            setCargando(false);
            return;
        }



        try {

            const response = await verificarCodigo(correo, codigo);
            if (!response.success) {
                Alert.alert("Error al verificar el codigo ❌", response.message);

                navigation.navigate("EnvioDeCodigo");
                setCargando(false);
                return;
            }
            Alert.alert("Codigo verficado  ✅", response.message)

            navigation.navigate("CambiarClaveOlvida", { correo: correo });
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
                        <Text style={styles.title}>Verificacion del codigo</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Codigo"
                            placeholderTextColor="#94a3b8"
                            keyboardType="phone-pad"
                            value={codigo}
                            onChangeText={setCodigo}
                        />

                    </View>
                    <TouchableOpacity disabled={cargando} style={styles.registerBtn} onPress={enviarForm}>
                      
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
        marginBottom: 30,
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
