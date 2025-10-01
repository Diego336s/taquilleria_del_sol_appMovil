import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function Dashboard() {
  const obras = [
    {
      id: "1",
      titulo: "Romeo y Julieta",
      descripcion: "La historia de amor más famosa de todos los tiempos",
      fecha: "15 Enero",
      hora: "8:00 PM",
      precio: "$45.000",
      popularidad: "95%",
      categoria: "Drama Clásico",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      id: "2",
      titulo: "El Fantasma de la Ópera",
      descripcion: "El musical más exitoso de Broadway llega a nuestro teatro",
      fecha: "20 Enero",
      hora: "7:30 PM",
      precio: "$65.000",
      popularidad: "88%",
      categoria: "Musical",
      image: "https://picsum.photos/400/200",
    },
    {
      id: "3",
      titulo: "Comedia de Enredos",
      descripcion: "Una noche llena de risas y diversión garantizada",
      fecha: "25 Enero",
      hora: "9:00 PM",
      precio: "$35.000",
      popularidad: "76%",
      categoria: "Comedia",
      image: "https://picsum.photos/400/201",
    },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.saludo}>¡Bienvenido, María! 👋</Text>
        <View style={styles.headerButtons}>
          <TouchableOpacity style={styles.btnHeader}>
            <Text style={styles.btnText}>Explorar Teatro</Text>
          </TouchableOpacity>
         
        </View>
      </View>

      {/* Stats */}
      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Ionicons name="calendar-outline" size={30} color="#FF6B00" />
          <Text style={styles.statNumber}>5</Text>
          <Text style={styles.statLabel}>Obras Vistas</Text>
        </View>
        <View style={styles.statCard}>
          <Ionicons name="time-outline" size={30} color="#FF6B00" />
          <Text style={styles.statNumber}>1</Text>
          <Text style={styles.statLabel}>Próxima Función</Text>
        </View>
      </View>

      {/* Próxima función */}
      <View style={styles.proximaFuncion}>
        <Text style={styles.proximaTitle}>🎭 Su Próxima Función</Text>
        <Text style={styles.proximaObra}>Don Juan Tenorio</Text>
        <Text style={styles.proximaDetalle}>📅 12 Enero ⏰ 8:30 PM 🎟️ Palco A12, A13</Text>
        <TouchableOpacity style={styles.btnDetalle}>
          <Text style={styles.btnDetalleText}>Ver Detalles</Text>
        </TouchableOpacity>
      </View>

      {/* Cartelera */}
      <Text style={styles.carteleraTitle}>Cartelera Actual</Text>
      <FlatList
        horizontal
        data={obras}
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.obraCard}>
            <Image source={{ uri: item.image }} style={styles.obraImage} />
            <View style={styles.obraInfo}>
              <Text style={styles.obraCategoria}>{item.categoria}</Text>
              <Text style={styles.obraTitulo}>{item.titulo}</Text>
              <Text style={styles.obraDesc}>{item.descripcion}</Text>
              <Text style={styles.obraFecha}>📅 {item.fecha} ⏰ {item.hora}</Text>
              <Text style={styles.obraPrecio}>{item.precio}</Text>
              <TouchableOpacity style={styles.btnReservar}>
                <Text style={styles.btnReservarText}>Reservar</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF8F0", padding: 15 },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 20 },
  saludo: { fontSize: 18, fontWeight: "600" },
  headerButtons: { flexDirection: "row", alignItems: "center" },
  btnHeader: { backgroundColor: "#FF6B00", padding: 10, borderRadius: 8, marginRight: 10 },
  btnText: { color: "white", fontWeight: "bold" },
  btnPerfil: { padding: 5 },
  statsRow: { flexDirection: "row", justifyContent: "space-around", marginBottom: 20 },
  statCard: { backgroundColor: "white", padding: 15, borderRadius: 12, alignItems: "center", width: 140, elevation: 3 },
  statNumber: { fontSize: 20, fontWeight: "bold", marginTop: 5 },
  statLabel: { color: "#666", marginTop: 3 },
  proximaFuncion: { backgroundColor: "#FF6B00", padding: 15, borderRadius: 12, marginBottom: 20 },
  proximaTitle: { color: "white", fontSize: 14, fontWeight: "bold" },
  proximaObra: { color: "white", fontSize: 18, fontWeight: "bold", marginVertical: 5 },
  proximaDetalle: { color: "white", fontSize: 14 },
  btnDetalle: { backgroundColor: "white", padding: 8, borderRadius: 8, alignSelf: "flex-start", marginTop: 10 },
  btnDetalleText: { color: "#FF6B00", fontWeight: "bold" },
  carteleraTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  obraCard: { backgroundColor: "white", borderRadius: 12, marginRight: 15, width: 250, overflow: "hidden", elevation: 3 },
  obraImage: { width: "100%", height: 120 },
  obraInfo: { padding: 10 },
  obraCategoria: { fontSize: 12, color: "#FF6B00", fontWeight: "bold" },
  obraTitulo: { fontSize: 16, fontWeight: "bold", marginVertical: 5 },
  obraDesc: { fontSize: 12, color: "#666", marginBottom: 5 },
  obraFecha: { fontSize: 12, marginBottom: 5 },
  obraPrecio: { fontSize: 14, fontWeight: "bold", marginBottom: 5 },
  btnReservar: { backgroundColor: "#FF6B00", padding: 8, borderRadius: 8, alignItems: "center" },
  btnReservarText: { color: "white", fontWeight: "bold" },
});
