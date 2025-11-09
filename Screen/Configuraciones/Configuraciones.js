import React, { useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity,  ScrollView, Alert } from "react-native";
import { useState } from "react";
import { logout } from "../../Src/Navegation/Service/AuthService";


export default function ConfiguracionesScreen({ navigation }) {  

  const [cargando, setCargando] = useState(false);
  const cerrarSesion = async()=>{
    setCargando(true);
    const response = await logout();
    if(!response.success){
     Alert.alert("Cierre de sesion ❌",response.message);
     setCargando(false);
     return;
    }
    Alert.alert("Cierre de sesion ✅", response.message);
    setCargando(false);
  }

  return (
    <ScrollView style={styles.container}>


      {/* Sección: Cuenta */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Cuenta</Text>
        <TouchableOpacity onPress={() => navigation.navigate("CambiarClave")} style={styles.option}>
          <Text style={styles.optionText}>🔑 Cambiar Contraseña</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("CambiarCorreo")} style={styles.option}>
          <Text style={styles.optionText}>📧 Cambiar Correo</Text>
        </TouchableOpacity>
      </View>



      {/* Sección: Otros */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Otros</Text>

        <TouchableOpacity disabled={cargando} onPress={()=>{cerrarSesion()}} style={styles.option}>
          <Text style={[styles.optionText, { color: "white" }]}>🚪 Cerrar Sesión</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#2B1B1B", padding: 16 },
  title: { fontSize: 20, fontWeight: "bold", color: "#fff", marginBottom: 20 },
  card: {
    backgroundColor: "#A0522D",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  sectionTitle: { fontSize: 14, fontWeight: "bold", color: "#f4f4f4ff", marginBottom: 10 },
  option: {
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: "#333",
  },
  optionText: { fontSize: 14, color: "#fff" },
  switchOption: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: "#333",
  },
});
