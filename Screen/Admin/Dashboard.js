import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";

import api from "../../Src/Navegation/Service/Conexion";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityIndicator } from "react-native";

export default function DashboardAdmin({ navigation }) {
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(false);
  useEffect(() => {
    const cargarPerfil = async () => {
      try {
        const response = await api.get("me/administrador");

        if (!response.data.success) {
          Alert.alert("Error al cargar usuario", "Inicia sesión nuevamente");
          await AsyncStorage.removeItem("userToken");
          await AsyncStorage.removeItem("rolUser");
          return;
        }

        setUsuario(response?.data?.user);
      } catch (error) {
        Alert.alert("Error", error.message || "No se pudo cargar el usuario");
        await AsyncStorage.removeItem("userToken");
        await AsyncStorage.removeItem("rolUser");
      }
    };

    cargarPerfil();
  }, []);


  const cerrarSesion = () => {
    Alert.alert(
      "Cerrar sesión",
      "¿Estás seguro de que quieres cerrar sesión?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Sí, cerrar",
          style: "destructive",
          onPress: async () => {
            try {
              setCargando(true); // 🔥 El loader inicia AQUÍ, no antes del Alert

              const response = await api.post("logout/admin");

              if (!response.data.success) {
                Alert.alert(
                  "Error al cerrar sesión",
                  response.data.message || "Intenta nuevamente"
                );
                setCargando(false);
                return;
              }

              await AsyncStorage.removeItem("userToken");
              await AsyncStorage.removeItem("rolUser");

              Alert.alert("Sesión cerrada ✅", response.data.message);
              setCargando(false);

            } catch (error) {
              setCargando(false);
              Alert.alert(
                "Error",
                error.message ||
                "No se ha podido cerrar la sesión, intenta nuevamente"
              );
            }
          },
        },
      ]
    );
  };



  return (
    <ScrollView contentContainerStyle={styles.scroll}>
      <View style={styles.background}>

        {/* Saludo */}
        <View style={styles.header}>
          <Text style={styles.saludo}>
            ¡Bienvenido, {usuario?.nombres}! 👋
          </Text>
          <TouchableOpacity
            style={[styles.btnCerrarSesion, cargando && { opacity: 0.7 }]}
            onPress={cerrarSesion}
            disabled={cargando}
          >
            {!cargando ? (
              <Text style={styles.btnCerrarSesionText}>Cerrar Sesión</Text>
            ) : (
              <ActivityIndicator size="small" color="#FFF" />
            )}
          </TouchableOpacity>


        </View>

        {/* TARJETA DE LECTOR QR */}
        <TouchableOpacity
          style={styles.cardScanner}
          onPress={() => navigation.navigate("LectorQr")}
        >
          <Text style={styles.cardScannerIcon}>📷</Text>
          <Text style={styles.cardScannerTitle}>Lector de Tickets (QR)</Text>
          <Text style={styles.cardScannerDesc}>
            Escanea tickets y verifica su validez
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "#2B1B1B",
  },
  scroll: {
    padding: 20,
    backgroundColor: "#2B1B1B",
    flexGrow: 1,
  },

  header: {
    marginBottom: 25,
  },
  saludo: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFF",
  },

  // 🔥 Tarjeta del Lector QR
  cardScanner: {
    backgroundColor: "#3C2F2F",
    padding: 25,
    borderRadius: 14,
    marginBottom: 25,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  cardScannerIcon: {
    fontSize: 50,
    marginBottom: 10,
  },
  cardScannerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFD700",
    marginBottom: 5,
  },
  cardScannerDesc: {
    color: "#CCC",
    textAlign: "center",
    fontSize: 14,
  },
  btnCerrarSesion: {
    backgroundColor: "#8B0000", // rojo oscuro elegante
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 15,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
  },

  btnCerrarSesionText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 16,
    letterSpacing: 0.5,
  },

});
