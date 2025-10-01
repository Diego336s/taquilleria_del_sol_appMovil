import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Platform, ScrollView } from "react-native";
import { KeyboardAvoidingView } from "react-native";

export default function LoginUsuario({ navigation }) {
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (!correo || !password) {
      Alert.alert("Error", "Debes completar todos los campos");
      return;
    }

    // Aquí iría la lógica de autenticación con backend
    console.log("Usuario:", correo, "Password:", password);

    Alert.alert("Éxito", "Bienvenido a Taquillería del Sol 🎭");
    navigation.navigate("Dashboard"); // ejemplo de navegación
  };

  return (
    <KeyboardAvoidingView
    behavior={Platform.OS === "ios" ? "padding" : "height"}
    style={{flex: 1}}
    >
      <ScrollView contentContainerStyle={styles.scroll}>
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Taquillería del Sol</Text>
        <Text style={styles.subtitle}>Inicia sesión</Text>

        <TextInput
          style={styles.input}
          placeholder="Correo"
          placeholderTextColor="#999"
          keyboardType="email-address"
          value={correo}
          onChangeText={setCorreo}
        />

        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          placeholderTextColor="#999"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity onPress={() => Alert.alert("Recuperar", "Función de recuperar contraseña")}>
          <Text style={styles.link}>¿Olvidaste tu contraseña?</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => Alert.alert("Registro", "Función de registro")}>
          <Text style={styles.link}>Regístrate aquí</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Iniciar Sision</Text>
        </TouchableOpacity>
      </View>
    </View>
    </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
   scroll: {
    flexGrow: 1,
    justifyContent: "center",
    backgroundColor: "#848484ff"
  },
  container: {
    flex: 1,
    backgroundColor: "#F4F6F9",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    backgroundColor: "white",
    padding: 25,
    borderRadius: 12,
    width: "85%",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
  },
  
  subtitle: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 20,
    color: "#666",
  },
  input: {
    backgroundColor: "#F2F2F2",
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
    fontSize: 14,
    color: "#333",
  },
  link: {
    color: "#1E5EFF",
    fontSize: 13,
    textAlign: "left",
    marginBottom: 8,
  },
  button: {
    backgroundColor: "#1E5EFF",
    padding: 14,
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 15,
  },
});
