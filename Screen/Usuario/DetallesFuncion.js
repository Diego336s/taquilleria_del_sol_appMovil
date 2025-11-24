import React from "react";
import { View, Text, ScrollView, StyleSheet  } from "react-native";

export default function DetalleFuncion({ route }) {
    const { funcion } = route.params;
   const total = funcion.tickets.reduce((sum, a) => sum + Number(a.precio), 0);

  
    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>🎭 {funcion.evento.titulo}</Text>

            <View style={styles.box}>
                <Text style={styles.label}>📅 Fecha:</Text>
                <Text style={styles.value}>{funcion.evento.fecha_evento}</Text>

                <Text style={styles.label}>⏰ Hora:</Text>
                <Text style={styles.value}>{funcion.evento.hora_inicio}</Text>
            </View>

            <Text style={styles.sectionTitle}>🎟 Asientos Reservados</Text>

            <View style={styles.asientosBox}>
                {funcion.asientos.map((a, index) => (
                    <View key={index} style={styles.asientoItem}>
                        <Text style={styles.asientoText}>
                            🪑 {a.ubicacion} - Fila {a.fila} - Asiento {a.numero}
                        </Text>

                        <Text style={styles.price}>
                            💰 ${Number(a.precio_asiento).toLocaleString("es-CO")}
                        </Text>
                    </View>
                ))}
            </View>

            <View style={styles.totalBox}>
                <Text style={styles.totalLabel}>Total pagado:</Text>
                <Text style={styles.totalAmount}>
                    ${Number(total).toLocaleString("es-CO")}
                </Text>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { padding: 20, backgroundColor: "#2B1B1B" },
    title: { color: "white", fontSize: 23, fontWeight: "bold", textAlign: "center", marginBottom: 20 },
    box: { backgroundColor: "#A0522D", padding: 15, borderRadius: 10, marginBottom: 20 },
    label: { color: "white", fontWeight: "bold", marginTop: 5 },
    value: { color: "white", marginLeft: 5 },
    sectionTitle: { color: "white", fontSize: 20, fontWeight: "bold", marginVertical: 10 },
    asientosBox: { backgroundColor: "#A0522D", padding: 10, borderRadius: 10 },
    asientoItem: { flexDirection: "row", justifyContent: "space-between", paddingVertical: 5 },
    asientoText: { color: "white", fontSize: 16 },
    price: { color: "white", fontSize: 16, fontWeight: "bold" },
    totalBox: { marginTop: 30, padding: 15, backgroundColor: "#e0ffe4", borderRadius: 10 },
    totalLabel: { fontSize: 18, fontWeight: "bold" },
    totalAmount: { fontSize: 22, fontWeight: "bold", marginTop: 5, color: "#008000" },
});
