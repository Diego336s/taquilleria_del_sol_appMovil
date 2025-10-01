import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";

export default function SeatMap() {
  const [seats, setSeats] = useState([
    ["disponible", "ocupado", "disponible", "vip", "disponible"],
    ["disponible", "ocupado", "ocupado", "vip", "disponible"],
    ["disponible", "disponible", "disponible", "ocupado", "disponible"],
  ]);

  const toggleSeat = (rowIndex, colIndex) => {
    setSeats((prev) =>
      prev.map((row, rIdx) =>
        row.map((seat, cIdx) => {
          if (rIdx === rowIndex && cIdx === colIndex) {
            if (seat === "disponible") return "seleccionado";
            if (seat === "seleccionado") return "disponible";
          }
          return seat;
        })
      )
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Mapa de Asientos 🎭</Text>
      {seats.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((seat, colIndex) => (
            <TouchableOpacity
              key={colIndex}
              style={[styles.seat, styles[seat]]}
              onPress={() => toggleSeat(rowIndex, colIndex)}
              disabled={seat === "ocupado" || seat === "vip"} // No se puede cambiar si está ocupado o VIP
            >
              <Text style={styles.seatText}>
                {seat === "ocupado" ? "X" : seat === "vip" ? "V" : " "}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f8f8f8" },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
  row: { flexDirection: "row", justifyContent: "center", marginBottom: 10 },
  seat: {
    width: 40,
    height: 40,
    margin: 5,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  seatText: { color: "#fff", fontWeight: "bold" },

  // Colores para cada estado
  disponible: { backgroundColor: "blue" },
  seleccionado: { backgroundColor: "green" },
  ocupado: { backgroundColor: "red" },
  vip: { backgroundColor: "orange" },
});
