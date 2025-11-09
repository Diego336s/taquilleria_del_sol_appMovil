import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Alert, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../../Src/Navegation/Service/Conexion";


export default function PerfilCliente({ navigation }) {
    const [usuario, setUsuario] = useState(null);

    useEffect(() => {
        const cargarPerfil = async () => {
            try {
                const response = await api.get("me/cliente");
                if (!response.data.success) {
                    Alert.alert("Error", "No se pudo cargar el perfil. Inicia sesión nuevamente.");
                    await AsyncStorage.removeItem("userToken");
                    navigation.navigate("Login");
                    return;
                }
                setUsuario(response.data.user);
            } catch (error) {
                Alert.alert("Error", "Error al cargar el usuario.");
                await AsyncStorage.removeItem("userToken");
                navigation.navigate("Login");
            }
        };
        cargarPerfil();
    }, []);



    if (!usuario) {
        return (
            <ScrollView contentContainerStyle={styles.scroll}>
                <View style={styles.container}>
                     <ActivityIndicator size="large" color="#f2f2f2ff" />
                    <Text style={{textAlign: "center", paddingTop: 35 , color: "white", fontFamily:30}}>
                        Cargando informacion....
                    </Text>
                </View>
            </ScrollView>
        );
    }

    return (
        <ScrollView contentContainerStyle={styles.scroll}>
            <View style={styles.container}>
                <View style={styles.perfilCard}>
                    <Image
                        source={usuario.sexo === "F" ? require("../../IMG/avatar_femenino_512.png") : require("../../IMG/avatar_masculino_512.png")}
                        style={styles.avatar}
                    />

                    <Text style={styles.nombre}>{usuario.nombre} {usuario.apellido}</Text>
                    <Text style={styles.rol}>Cliente Activo</Text>
                </View>

                <View style={styles.infoCard}>
                    <Text style={styles.label}>📧 Correo:</Text>
                    <Text style={styles.valor}>{usuario.correo}</Text>

                    <Text style={styles.label}>📞 Teléfono:</Text>
                    <Text style={styles.valor}>{usuario.telefono || "No registrado"}</Text>

                    <Text style={styles.label}>🪪 Documento:</Text>
                    <Text style={styles.valor}>{usuario.documento}</Text>

                    <Text style={styles.label}>🎂 Fecha de Nacimiento:</Text>
                    <Text style={styles.valor}>{usuario.fecha_nacimiento}</Text>

                     <Text style={styles.label}>♐ Sexo:</Text>
                    <Text style={styles.valor}>{usuario.sexo === "M" ? "Masculino" : "Femenino"}</Text>                   
                </View>

                <TouchableOpacity onPress={()=>{navigation.navigate("EditarPerfil")}} style={styles.botonEditar}>
                    <Text style={styles.textoBoton}>Editar Perfil</Text>
                </TouchableOpacity>


            </View>
        </ScrollView>
    );
}


const styles = StyleSheet.create({
    scroll: {
        backgroundColor: "#2B1B1B",
        flexGrow: 1,
        paddingVertical: 30,
        alignItems: "center",
    },
    
    container: {
        width: "90%",
        alignItems: "center",
    },
    perfilCard: {
        backgroundColor: "#A0522D",
        borderRadius: 16,
        padding: 20,
        alignItems: "center",
        marginBottom: 20,
        shadowColor: "#000",
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10,
    },
    nombre: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#F9FAFB",
    },
    rol: {
        color: "#D1D5DB",
        fontSize: 14,
    },
    infoCard: {
        backgroundColor: "#A0522D",
        borderRadius: 12,
        padding: 20,
        width: "100%",
        marginBottom: 25,
    },
    label: {
        color: "#F59E0B",
        fontSize: 14,
        fontWeight: "bold",
        marginTop: 8,
    },
    valor: {
        color: "#F9FAFB",
        fontSize: 16,
        marginBottom: 4,
    },
    botonEditar: {
        backgroundColor: "#74562bff",
        paddingVertical: 12,
        paddingHorizontal: 40,
        borderRadius: 10,
        marginBottom: 12,
    },
    botonCerrar: {
        backgroundColor: "#F59E0B",
        paddingVertical: 12,
        paddingHorizontal: 40,
        borderRadius: 10,
    },
    textoBoton: {
        color: "#F9FAFB",
        fontWeight: "bold",
        fontSize: 16,
        textAlign: "center",
    },
    textoSecundario: {
        color: "#D1D5DB",
        fontSize: 16,
        paddingTop: 20,
    },
});
