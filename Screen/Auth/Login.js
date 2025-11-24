import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Platform,
  ScrollView,
  KeyboardAvoidingView,
  Image,
  ImageBackground,
  ActivityIndicator
} from "react-native";
import { login } from "../../Src/Navegation/Service/AuthService";

export default function LoginUsuario({ navigation }) {
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [cargando, setCargando] = useState(false);
  const handleLogin = async () => {
    setCargando(true);
    if (!correo || !password) {
      Alert.alert("Error", "Debes completar todos los campos");
      setCargando(false);
      return;
    }
    const validarCorreo = (correoParaValidar) => {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return regex.test(correoParaValidar.trim());
    };

    if (!validarCorreo(correo)) {
      Alert.alert("Correo inválido", "Ingresa un correo electrónico válido.");
      return;
    }
    const response = await login(correo, password);
    if (!response.success) {
      Alert.alert("Error al iniciar sesion", response.message);
      setCargando(false);
      return;
    }   
    setCargando(false);

  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ImageBackground
        source={require("../../IMG/fondo.jpg")} // aquí pones tu fondo
        style={styles.background}
      >
        <ScrollView contentContainerStyle={styles.scroll}>
          <View style={styles.container}>
            <View style={styles.card}>
              {/* 👇 Logo */}
              <Image
                source={require("../../IMG/logo teatro.png")}
                style={styles.logo}
              />

              <Text style={styles.title}>Taquillería del Sol</Text>
              <Text style={styles.subtitle}>Inicia sesión</Text>

              <TextInput
                style={styles.input}
                placeholder="Correo"
                placeholderTextColor="#040404ff"
                keyboardType="email-address"
                value={correo}
                onChangeText={setCorreo}
              />

              <TextInput
                style={styles.input}
                placeholder="Contraseña"
                placeholderTextColor="#000000ff"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />

              <TouchableOpacity style={styles.button} disabled={cargando} onPress={() => handleLogin()}>
                {!cargando ? (
                
                  <Text style={styles.buttonText}>Iniciar Sesión</Text>
                ) : (
                  <ActivityIndicator size="small" color="#f5f5f5ff" />
                )}

              </TouchableOpacity>

              <TouchableOpacity onPress={() => navigation.navigate("OlvideMiClaveStack")}>
                <Text style={styles.linkOlvidePassword}>¿Olvidaste tu contraseña?</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => navigation.navigate("RegistrarCliente")}>
                <Text style={styles.link}>Regístrate aquí</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover", // para que la imagen cubra todo
  },
  scroll: {
    flexGrow: 1,
    justifyContent: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    backgroundColor: "rgba(255, 255, 255, 0.2)", // 👈 blanco con transparencia
    padding: 25,
    borderRadius: 12,
    width: "85%",
    alignItems: "center",
  },
  logo: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginBottom: 15,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
    color: "white", // 👈 para que se vea bien sobre fondo oscuro
  },
  subtitle: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 20,
    color: "#ddd",
  },
  input: {
    width: "100%",
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    backgroundColor: "rgba(255,255,255,0.4)", // 👈 inputs semitransparentes
    color: "#090909ff",
  },
  link: {
    color: "#FFD700", // amarillo para resaltar
    fontSize: 13,
    textAlign: "left",
    marginBottom: 8,
    alignSelf: "flex-start",
  },
  linkOlvidePassword: {
    color: "#FFD700",
    fontSize: 13,
    textAlign: "left",
    marginBottom: 8,
    marginTop: 9,
    alignSelf: "flex-start",
  },
  button: {
    backgroundColor: "#1E5EFF",
    padding: 14,
    borderRadius: 8,
    marginTop: 10,
    width: "100%",
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 15,
  },
});
