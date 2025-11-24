import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from "react-native";
import api from "../../Src/Navegation/Service/Conexion";


export default function DetalleQR({ route, navigation }) {
  const { info } = route.params;
  const [cargando, setCargando] = useState(false);

  const verificarTicket = async () => {
    setCargando(true);

    try {
      const response = await api.post("/verificador-ticket", {
        ticket_id: info.ticket_id,
      });

      if (response.data.success === true) {
        Alert.alert("🎉 Ticket válido", response.data.message);
      } else {
        Alert.alert("⚠ Ticket inválido", response.data.message);
      }
    } catch (error) {
      Alert.alert("❌ Error", error.message || "No se pudo verificar el ticket.");
    }

    setCargando(false);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>🎫 Ticket #{info.ticket_id}</Text>

      <View style={styles.box}>
        <Text style={styles.label}>🎭 Evento</Text>
        <Text style={styles.value}>{info.evento}</Text>

        <Text style={styles.label}>👤 Cliente</Text>
        <Text style={styles.value}>{info.cliente}</Text>

        <Text style={styles.label}>🪪 Documento</Text>
        <Text style={styles.value}>{info.documento}</Text>

        <Text style={styles.label}>💰 Total Pagado</Text>
        <Text style={styles.value}>
          ${parseInt(info.total_pagado).toLocaleString("es-CO")}
        </Text>

        <Text style={styles.label}>🕒 Fecha de Compra</Text>
        <Text style={styles.value}>{info.fecha_compra}</Text>
      </View>

      <Text style={styles.subTitle}>🎟 Asientos Reservados</Text>

      {info.asientos.map((a, index) => (
        <View key={index} style={styles.asientoItem}>
          <Text style={styles.asientoText}>
            🪑 {a.ubicacion} — Fila {a.fila} — Asiento {a.numero} — 💵 $
            {parseInt(a.precio).toLocaleString("es-CO")}
          </Text>
        </View>
      ))}

      {/* BOTON DE VERIFICAR */}
      <TouchableOpacity
        style={[styles.btnVerificar, cargando && { opacity: 0.7 }]}
        onPress={verificarTicket}
        disabled={cargando}
      >
        {!cargando ? (
          <Text style={styles.btnVerificarText}>✔ Verificar Ticket</Text>
        ) : (
          <ActivityIndicator size="small" color="#FFF" />
        )}
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 15, backgroundColor: "#3C2F2F" },
  title: {
    color:"white",
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  box: {
    
    padding: 12,
    backgroundColor: "#A0522D",
    borderRadius: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#e2e2e2",
  },
  label: { color:"white", fontWeight: "bold", fontSize: 16, marginTop: 10 },
  value: {color:"white", fontSize: 16, marginBottom: 5 },
  subTitle: { color:"white", fontSize: 20, fontWeight: "bold", marginBottom: 10 },
  asientoItem: {
    
    padding: 10,
    backgroundColor: "#fafafa",
    borderRadius: 10,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#A0522D",
     backgroundColor: "#A0522D",
  },
  asientoText: { color:"white", fontSize: 16 },

  // ⭐ BOTÓN DE VERIFICACIÓN – DISEÑO PREMIUM
  btnVerificar: {
    backgroundColor: "#0A8754",
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 25,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 5,
    marginBottom: 50,
  },
  btnVerificarText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
    letterSpacing: 0.7,
  },
});
