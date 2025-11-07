import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Image,
 
  Alert
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import api from "../../Src/Navegation/Service/Conexion";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Dashboard({navigation}) {
  const [usuario, setUsuario] = useState(null);
  useEffect(() => {
    const cargarPerfil = async () => {
      try {
        const response = await api.get("me/cliente");
        if (!response.data.success) {
            Alert.alert("Error al cargar usuario","Error al cargar el usuario, inicia sesion nuevamente");
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
   
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.background}>
        {/* Header */}
        <View style={styles.header}>
        
            {usuario?.sexo === "F" &&(
                <Text style={styles.saludo}>¡Bienvenida, {usuario?.nombre}! 👋</Text>
            )||(
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
        </View>
      </ScrollView>
      
  
  );
}
const styles = StyleSheet.create({
background: {
flex: 1,
},
scroll: {
padding: 20,
backgroundColor: "#2B1B1B", // Fondo general cálido oscuro
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
width: 250,
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
