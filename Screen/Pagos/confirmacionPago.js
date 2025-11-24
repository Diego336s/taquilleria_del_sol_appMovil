import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { useRoute } from "@react-navigation/native";

export default function Confirmacion({ navigation }) {
  const route = useRoute();


  // Datos recibidos desde Stripe o desde tu reserva
  const { total, asientos } = route.params ?? {};

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Text style={styles.icon}>✅</Text>
        <Text style={styles.title}>¡Pago exitoso!</Text>

        <Text style={styles.text}>
          Tu compra ha sido procesada correctamente.
        </Text>




        <View style={styles.section}>
          <Text style={styles.label}>Asientos reservados:</Text>
          {asientos?.length > 0 ? (
            asientos.map((a, i) => (
              <Text key={i} style={styles.asiento}>
                🎟️ {a.ubicacion} - Fila {a.fila} - Asiento {a.numero}
              </Text>
            ))
          ) : (
            <Text style={{ color: "#777" }}>No se recibieron asientos.</Text>
          )}
        </View>
        
        <View style={styles.section}>
          <Text style={styles.label}>Total pagado:</Text>
          <Text style={styles.value}>${total?.toLocaleString("es-CO")}</Text>
        </View>
        <Text style={styles.text}>
          Tu ticket sera enviado a tu correo muchas grascias por tu compra
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.replace("Dashboard")}
        >
          <Text style={styles.buttonText}>Volver al inicio</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#f8f8f8",
    justifyContent: "center",
    padding: 20,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 20,
    elevation: 4,
  },
  icon: {
    fontSize: 70,
    textAlign: "center",
    marginBottom: 10,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    color: "#222",
  },
  text: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
    color: "#444",
  },
  section: {
    marginBottom: 12,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#222",
  },
  value: {
    fontSize: 16,
    color: "#333",
  },
  asiento: {
    fontSize: 15,
    marginTop: 4,
    color: "#555",
  },
  button: {
    backgroundColor: "#2563eb",
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 17,
    textAlign: "center",
    fontWeight: "bold",
  },
});
