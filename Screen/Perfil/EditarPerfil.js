
import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Platform,
    KeyboardAvoidingView,
    ScrollView,

    Alert,
    ActivityIndicator
} from "react-native";

import { actualizarPerfil } from "../../Src/Navegation/Service/ClienteService";
import api from "../../Src/Navegation/Service/Conexion";
import { Picker } from "@react-native-picker/picker";


export default function EditarPerfil({ navigation }) {
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [telefono, setTelefono] = useState("");
    const [email, setEmail] = useState("");
    const [sexo, setSexo] = useState("");

    const [cargando, setCargando] = useState(false);
    const [usuario, setUsuario] = useState(null);

    useEffect(() => {
        const traerDatos = async () => {
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
        traerDatos();


    }, []);

    useEffect(() => {
        if (!usuario || usuario === null || usuario === "") return;

        setNombre(usuario.nombre);
        setApellido(usuario.apellido);
        setEmail(usuario.correo);
        setTelefono(usuario.telefono);
        setSexo(usuario.sexo);
    }, [usuario])

    const handleActualizar = async () => {
        setCargando(true);
        if (!usuario.id) {
            Alert.alert("Error interno ☹️", "No sea podido obtener el ID");
            setCargando(false);
            return;
        }
        if (!nombre || !telefono || !apellido || !sexo) {
            Alert.alert("Error de campos ☹️", "Debes rellenar todos los campos requerido");
            setCargando(false);
            return;
        }
        if (telefono.length !== 10) {
            Alert.alert("Error de telefono 📞", "El telefono debe tener 10 digitos");
            setCargando(false);
            return;
        }

        const response = await actualizarPerfil(usuario.id, nombre, apellido, telefono, sexo);
        if (!response?.success) {
            Alert.alert("Error al actualizar 📝", response?.message);
            setCargando(false);
            return;
        }
        Alert.alert("Actualizar perfil ✅", response?.message);
        navigation.navigate("PerfilUsuario");
        setCargando(false);

    };


    if (!usuario) {
        return (
            <ScrollView contentContainerStyle={styles.scroll}>
                <View style={styles.container}>
                    <ActivityIndicator size="large" color="#f2f2f2ff" />
                    <Text style={{ textAlign: "center", paddingTop: 35, color: "white", fontFamily: 30 }}>
                        Cargando informacion....
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

            <ScrollView contentContainerStyle={styles.scroll}>
                <View style={styles.container}>
                    <View style={styles.card}>
                        <Text style={styles.titulo}>Modificar perfil</Text>

                        <Text style={styles.label}>Nombre</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Ingresa tu nombre"
                            placeholderTextColor="#181717ff"
                            value={nombre}
                            onChangeText={setNombre}
                        />

                        <Text style={styles.label}>Apellido</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Ingresa tu apellido"
                            placeholderTextColor="#121111ff"
                            value={apellido}
                            onChangeText={setApellido}
                        />

                        <Text style={styles.label}>Teléfono</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Número de teléfono"
                            placeholderTextColor="#181818ff"
                            keyboardType="phone-pad"
                            value={telefono}
                            onChangeText={setTelefono}
                        />

                        <Text style={styles.label}>Sexo:</Text>
                        <Picker
                            selectedValue={sexo}
                            onValueChange={(itemValue) => setSexo(itemValue)}
                            style={styles.select}
                        >
                            <Picker.Item label="Seleccione..." value="" />
                            <Picker.Item label="Masculino" value="M" />
                            <Picker.Item label="Femenino" value="F" />
                        </Picker>

                        <Text style={styles.label}>E-mail</Text>
                        <TextInput
                            style={styles.inputNoEditable}
                            placeholder="ejemplo@email.com"
                            placeholderTextColor="#ffffffff"
                            keyboardType="email-address"
                            editable={false}
                            value={email}
                            onChangeText={setEmail}
                        />




                        <TouchableOpacity style={styles.boton} disabled={cargando} onPress={handleActualizar}>
                            <Text style={styles.botonTexto}>Guardar cambios</Text>
                        </TouchableOpacity>                      
                    </View>
                </View>
            </ScrollView>

        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: "cover"

    },
    scroll: {
        flexGrow: 1,
        justifyContent: "center",
        backgroundColor: "#2B1B1B"
    },
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    card: {
        width: "85%",
        backgroundColor: "#A0522D", // 👈 transparente
        padding: 20,
        marginBottom: 30,
        borderRadius: 12,
        alignItems: "center",
    },
    titulo: {
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 20,
        color: "#ffffffff", // 👈 para contraste
        textShadowColor: "#000", // 👈 color del borde (sombra)
        textShadowOffset: { width: 2, height: 2 }, // 👈 desplazamiento de la sombra
        textShadowRadius: 1, // 👈 difuminado, si lo quieres más sólido ponlo en 0
    },
    label: {
        marginTop: 10,
        marginBottom: 5,
        fontWeight: "600",
        color: "#ffffffff", // 👈 Blanco para resaltar
        alignSelf: "flex-start",
        textShadowColor: "#000", // 👈 color del borde (sombra)
        textShadowOffset: { width: 2, height: 2 }, // 👈 desplazamiento de la sombra
        textShadowRadius: 1, // 👈 difuminado, si lo quieres más sólido ponlo en 0
    },

    input: {
        width: "100%",
        borderRadius: 8,
        padding: 12,
        marginBottom: 10,
        backgroundColor: "rgba(255,255,255,0.4)", // 👈 inputs semitransparentes
        color: "#090909ff",
    },
    inputNoEditable: {
        width: "100%",
        borderRadius: 8,
        padding: 12,
        marginBottom: 10,
        backgroundColor: "rgba(65, 32, 32, 0.4)", // 👈 inputs semitransparentes
        color: "#ffffffff",
    },
    select: {
        width: "100%",
        height: "50",
        borderRadius: 8,
        padding: 2,
        marginBottom: 10,
        backgroundColor: "rgba(255,255,255,0.4)", // 👈 inputs semitransparentes
        color: "#090909ff",
    },
    boton: {
        backgroundColor: "#ed9417ff",
        padding: 15,
        borderRadius: 8,
        alignItems: "center",
        marginTop: 10,
        width: "100%",
    },
    botonCancelar: {
        backgroundColor: "#f1807cff",
        padding: 15,
        borderRadius: 8,
        alignItems: "center",
        marginTop: 10,
        width: "100%",
    },
    botonTexto: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    textoCuenta: {
        textAlign: "center",
        marginTop: 15,
        color: "white",
    },
    link: {
        color: "#FFD700",
        fontWeight: "bold",
    },
});
