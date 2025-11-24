import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, Alert, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../../Src/Navegation/Service/Conexion";
  
import { useFocusEffect } from "@react-navigation/native";
import { TextInput } from "react-native";
export default function MisTickets({ navigation }) {
  const [tickets, setTickets] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [usuario, setUsuario] = useState(null);
const [busqueda, setBusqueda] = useState("");
  useEffect(() => {
    const cargarPerfil = async () => {
      try {
        const response = await api.get("me/cliente");
        if (!response.data.success) {
          Alert.alert("Error", "Error al cargar el usuario, inicia sesión nuevamente");
          await AsyncStorage.removeItem("userToken");
          return;
        }

        setUsuario(response.data.user);
      } catch (error) {
        Alert.alert("Error", error.message || "Error al cargar el usuario");
        await AsyncStorage.removeItem("userToken");
      }
    };

    cargarPerfil();
  }, []);


   const ticketsFiltrados = tickets.filter((t) => {
  if (busqueda.trim() === "") return true;

  const texto = busqueda.toLowerCase();

  return (
    t.titulo.toLowerCase().includes(texto) ||
    t.fecha_evento.toLowerCase().includes(texto) ||
    t.hora_inicio.toLowerCase().includes(texto) ||
    t.asientos.length.toString().includes(texto) ||
    t.precio.toString().includes(texto)
  );
});


    const cargarTickets = async () => {
       if (!usuario) return;
      try {
        const response = await api.get("/mis-tickets/cliente/" + usuario.id);

        if (response.data.success) {
          setTickets(response.data.tickets);
        }
      } catch (error) {
        console.log("Error al cargar tickets:", error.message);
      }
      setCargando(false);
    };

   

    useFocusEffect(
      React.useCallback(() => {
      cargarTickets();
      }, [usuario])
    );
  if (cargando) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#FFD700" />
      </View>
    );
  }

  return (
   <ScrollView style={styles.container}>
  <Text style={styles.title}>🎟 Mis Tickets</Text>
<TextInput
  style={styles.input}
  placeholder="🔍 Buscar ticket por obra, fecha, hora, precio…"
  placeholderTextColor="#aaa"
  value={busqueda}
  onChangeText={setBusqueda}
/>

  {tickets.length === 0 ? (
    <Text style={styles.sinTickets}>No tienes tickets aún.</Text>
  ) : (
    
    ticketsFiltrados.map((t) => (
      <TouchableOpacity
        key={t.id}
        style={styles.card}
        onPress={() => navigation.navigate("DetalleTicket", { ticket: t })}
      >
        {/* Imagen del evento */}
        <Image source={{ uri: t.imagen_evento }} style={styles.img} />

        <View style={styles.info}>
          <Text style={styles.evento}>{t.titulo}</Text>

          <Text style={styles.fecha}>
            📅 {t.fecha_evento} — ⏰ {t.hora_inicio}
          </Text>

          <Text style={styles.asientos}>
            🎫 {t.asientos.length} asientos reservados
          </Text>
            <Text style={styles.asientos}>
            💰 {Number(t.precio).toLocaleString("es-CO")} 
          </Text>

          {/* ESTADO DEL TICKET */}
          <Text
            style={{
              marginTop: 5,
              fontWeight: "bold",
              color: t.usado == 1 ? "red" : "green",
              backgroundColor: t.usado == 1 ? "#ffe5e5" : "#f7f3f3ff",
              paddingHorizontal: 10,
              paddingVertical: 4,
              borderRadius: 6,
              alignSelf: "flex-start",
            }}
          >
            {t.usado == 1 ? "USADO" : "ACTIVO"}
          </Text>
        </View>
      </TouchableOpacity>
    ))
  )}
</ScrollView>

  );
}

const styles = StyleSheet.create({
  container: { padding: 15, backgroundColor: "#2B1B1B", flex: 1 },
  title: { color: "#FFF", fontSize: 28, fontWeight: "bold", marginBottom: 15 },
  sinTickets: { color: "#DDD", fontSize: 16, marginTop: 20 },
  card: {
    backgroundColor: "#3C2F2F",
    borderRadius: 12,
    marginBottom: 20,
    flexDirection: "row",
    padding: 10,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  img: { width: 90, height: 120, borderRadius: 8 },
  info: { marginLeft: 10, flex: 1 },
  evento: { color: "#FFD700", fontSize: 18, fontWeight: "bold" },
  fecha: { color: "#EEE", fontSize: 14, marginTop: 4 },
  asientos: { color: "#CCC", marginTop: 6, fontSize: 14 },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2B1B1B",
  },
  input: {
  backgroundColor: "#fff",
  padding: 10,
  borderRadius: 10,
  marginBottom: 15,
  borderWidth: 1,
  borderColor: "#ccc",
  color: "#000",
},

});
