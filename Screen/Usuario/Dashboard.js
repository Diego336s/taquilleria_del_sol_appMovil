import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Image,

  Alert,
  ActivityIndicator
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import api from "../../Src/Navegation/Service/Conexion";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import ChatBot from "../../Components/ChatBot"
export default function Dashboard({ navigation }) {
  const [usuario, setUsuario] = useState(null);
  const [eventos, setEventos] = useState(null);
  const [cargandoEventos, setCargandoEventos] = useState(false);
  const [expandedItems, setExpandedItems] = useState({});

  useEffect(() => {
    const cargarPerfil = async () => {
      try {
        const response = await api.get("me/cliente");
        if (!response.data.success) {
          Alert.alert("Error al cargar usuario", "Error al cargar el usuario, inicia sesion nuevamente");
          await AsyncStorage.removeItem("userToken");
          return;
        }
        console.log("Usuario", response?.data?.user)
        setUsuario(response?.data?.user);


      } catch (error) {
        Alert.alert("Error", error.message || error?.response?.message || "Error al cargar el usuario")
        await AsyncStorage.removeItem("userToken");
      }
    }
    cargarPerfil();
  }, [])

  const cargarEventos = async () => {
    console.log("Cargando eventos");
    setCargandoEventos(true);
    try {
      const response = await api.get("eventos/disponibles");
      if (!response.data.success) {
        setEventos(null);
        setCargandoEventos(false);
        console.log("No hay eventos");
        return;
      }
      setEventos(response?.data?.eventos);
      setCargandoEventos(false);
      console.log("Eventos cargados");
      console.log(response.data.eventos);
    } catch (error) {
      Alert.alert("Error ❌", error.message || error.response.message || "Error inesperado al mostrar los eventos vigentes.")
      setCargandoEventos(false);
    }
  }
  useFocusEffect(
    React.useCallback(() => {
      cargarEventos();
    }, [])
  );


  const toggleExpand = (id) => {
    setExpandedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (

    <ScrollView contentContainerStyle={styles.scroll}>
      
      <View style={styles.background}>
        {/* Header */}
        <View style={styles.header}>

          {usuario?.sexo === "F" ? (
            <Text style={styles.saludo}>¡Bienvenida, {usuario?.nombre}! 👋</Text>
          ) : (
            <Text style={styles.saludo}>¡Bienvenido, {usuario?.nombre}! 👋</Text>
          )}
          <TouchableOpacity onPress={() => { navigation.navigate("MapaStack"); }} style={styles.btnHeader}>
            <Text style={styles.btnText}>Explorar Teatro</Text>
          </TouchableOpacity>
        </View>

        {/* Stats */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Ionicons name="calendar-outline" size={30} color="#ffffffff" />
            <Text style={styles.statNumber}>5</Text>
            <Text style={styles.statLabel}>Obras Vistas</Text>
          </View>
          <View style={styles.statCard}>
            <Ionicons name="time-outline" size={30} color="#ffffffff" />
            <Text style={styles.statNumber}>1</Text>
            <Text style={styles.statLabel}>Próxima Función</Text>
          </View>
        </View>

        {/* Próxima función */}
        <View style={styles.proximaFuncion}>
          <Text style={styles.proximaTitle}>🎭 Su Próxima Función</Text>
          <Text style={styles.proximaObra}>Don Juan Tenorio</Text>
          <Text style={styles.proximaDetalle}>📅 12 Enero ⏰ 8:30 PM 🎟 Palco A12, A13</Text>
          <TouchableOpacity style={styles.btnDetalle}>
            <Text style={styles.btnDetalleText}>Ver Detalles</Text>
          </TouchableOpacity>
        </View>

        {/* Cartelera */}
        <Text style={styles.carteleraTitle}>Cartelera Actual</Text>
        {cargandoEventos === true && !eventos && (
          <View style={{ backgroundColor: "#2B1B1B" }}>
            <ActivityIndicator size="large" color="#f2f2f2ff" />
            <Text style={{ textAlign: "center", paddingTop: 35, color: "white", fontFamily: 30 }}>
              Cargando Eventos....
            </Text>
          </View>
        )}

        {cargandoEventos === false && eventos === null ? (
          <View style={{ backgroundColor: "#2B1B1B" }}>

            <Text style={{ textAlign: "center", paddingTop: 35, color: "white", fontFamily: 30 }}>
              No hay eventos vigentes o registrados
            </Text>
          </View>
        ) : (
          <FlatList
            horizontal
            data={eventos}
            keyExtractor={(item) => item.id}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => {
              const expanded = expandedItems[item.id] || false;

              const descripcionRecortada =
                !expanded && item.descripcion.length > 50
                  ? item.descripcion.substring(0, 50) + "..."
                  : item.descripcion;

              return (
                <View style={styles.obraCard}>
                  <Image source={{ uri: item.imagen }} style={styles.obraImage} />
                  <View style={styles.obraInfo}>
                    <Text style={styles.obraCategoria}>{item.categoria.nombre}</Text>
                    <Text style={styles.obraTitulo}>{item.titulo}</Text>

                    <Text style={styles.obraDesc}>
                      {descripcionRecortada}
                      {item.descripcion.length > 50 && (
                        <Text
                          style={{ color: "#4C9BFF" }}
                          onPress={() => toggleExpand(item.id)}
                        >
                          {expanded ? " Leer menos" : " Leer más"}
                        </Text>
                      )}
                    </Text>

                    <Text style={styles.obraFecha}>
                      📅 {item.fecha} ⏰ {item.hora_inicio} - {item.hora_final}
                    </Text>

                    <TouchableOpacity onPress={()=>{navigation.navigate("MapaEvento",{id: item.id})}} style={styles.btnReservar}>
                      <Text style={styles.btnReservarText}>Reservar</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              );
            }}


          />
        )}
      </View>
      <ChatBot/>
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
    backgroundColor: "#2B1B1B", // Fondo general cálido oscuro
    flexGrow: 1
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  saludo: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFF",
  },
  btnHeader: {
    backgroundColor: "#2563EB", // Azul primario
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  btnText: {
    color: "#FFF",
    fontWeight: "bold",
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  statCard: {
    backgroundColor: "#3C2F2F", // Card oscura con contraste
    padding: 20,
    borderRadius: 12,
    alignItems: "center",
    width: 140,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  statNumber: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 5,
    color: "#F4A261", // Naranja cálido
  },
  statLabel: {
    color: "#D1D5DB",
    marginTop: 3,
  },
  proximaFuncion: {
    backgroundColor: "#A0522D", // Marrón acento principal
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
  },
  proximaTitle: {
    color: "#FFD700",
    fontSize: 14,
    fontWeight: "bold",
  },
  proximaObra: {
    color: "#FFF",
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 5,
  },
  proximaDetalle: {
    color: "#EEE",
    fontSize: 14,
  },
  btnDetalle: {
    backgroundColor: "#3C2F2F",
    padding: 8,
    borderRadius: 8,
    alignSelf: "flex-start",
    marginTop: 10,
  },
  btnDetalleText: {
    color: "#FFF",
    fontWeight: "bold",
  },
  carteleraTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#FFF",
  },
  obraCard: {
    backgroundColor: "#3C2F2F",
    borderRadius: 12,
    marginRight: 15,
    width: "250",
    overflow: "hidden",
  },
  obraImage: {
    width: "100%",
    height: 120,
  },
  obraInfo: {
    padding: 12,
  },
  obraCategoria: {
    fontSize: 12,
    color: "#F4A261",
    fontWeight: "bold",
  },
  obraTitulo: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 5,
    color: "#FFF",
  },
  obraDesc: {
    fontSize: 12,
    color: "#E5E7EB",
    marginBottom: 5,
  },
  obraFecha: {
    fontSize: 12,
    color: "#CCC",
    marginBottom: 5,
  },
  obraPrecio: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#FFD700",
    marginBottom: 5,
  },
  btnReservar: {
    marginTop: 10,
    backgroundColor: "#2563EB",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  btnReservarText: {
    color: "#FFF",
    fontWeight: "bold",
  },
});