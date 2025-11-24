import React from "react";
import { View, Text, Image, ScrollView, StyleSheet } from "react-native";
import { SvgUri } from "react-native-svg";
export default function DetalleTicket({ route }) {
    const { ticket } = route.params;

    // Total = precio que ya viene del backend
    const total = Number(ticket.precio);

    return (
        <ScrollView style={styles.container}>

            {/* IMAGEN DEL EVENTO */}
            <Image source={{ uri: ticket.imagen_evento }} style={styles.banner} />

            <Text style={styles.title}>{ticket.titulo}</Text>

            {/* ESTADO */}
            <Text
                style={[
                    styles.estado,
                    ticket.usado == 1 ? styles.usado : styles.activo,
                ]}
            >
                {ticket.usado == 1 ? "USADO" : "ACTIVO"}
            </Text>

            {/* DETALLES */}
            <View style={styles.box}>
                <Text style={styles.label}>📅 Fecha del evento</Text>
                <Text style={styles.value}>{ticket.fecha_evento}</Text>

                <Text style={styles.label}>⏰ Hora</Text>
                <Text style={styles.value}>
                    {ticket.hora_inicio} — {ticket.hora_final}
                </Text>

                <Text style={styles.label}>🗓 Fecha de compra</Text>
                <Text style={styles.value}>{ticket.fecha_compra}</Text>
            </View>

            {/* ASIENTOS */}
            <Text style={styles.sectionTitle}>🎫 Asientos</Text>
            <View style={styles.asientosBox}>
                {ticket.asientos.map((a, index) => (
                    <View key={index} style={styles.asientoItem}>
                        <Text style={styles.asientoText}>
                            🪑 {a.ubicacion} — Fila {a.fila} — Asiento {a.numero}
                        </Text>
                    </View>
                ))}
            </View>

            {/* TOTAL */}
            <View style={styles.totalBox}>
                <Text style={styles.totalLabel}>Total Pagado</Text>
                <Text style={styles.totalAmount}>
                    ${total.toLocaleString("es-CO")}
                </Text>
            </View>

            {/* QR */}
            <Text style={styles.sectionTitle}>🔐 Código QR</Text>
            <View
                style={styles.contenedorQr}>
                <SvgUri
                    style={styles.qr}
                    uri={ticket.qr}
                />
            </View>

        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 15,
        backgroundColor: "#2B1B1B",
    },
    banner: {
        width: "100%",
        height: 200,
        borderRadius: 12,
        marginBottom: 15,
    },
    title: {
        color: "#FFD700",
        fontSize: 26,
        fontWeight: "bold",
        textAlign: "center",
    },
    estado: {
        marginTop: 10,
        paddingVertical: 6,
        paddingHorizontal: 14,
        borderRadius: 6,
        alignSelf: "center",
        fontSize: 16,
        fontWeight: "bold",
    },
    usado: {
        color: "red",
        backgroundColor: "#ffe5e5",
    },
    activo: {
        color: "green",
        backgroundColor: "#e6ffe6",
    },
    box: {
        backgroundColor: "#3C2F2F",
        padding: 15,
        borderRadius: 10,
        marginVertical: 15,
    },
    label: {
        color: "#FFD700",
        fontWeight: "bold",
        marginTop: 10,
    },
    value: {
        color: "#FFF",
        fontSize: 16,
        marginLeft: 10,
    },
    sectionTitle: {
        color: "#FFD700",
        fontSize: 20,
        fontWeight: "bold",
        marginTop: 20,
        marginBottom: 10,
    },
    asientosBox: {
        backgroundColor: "#3C2F2F",
        padding: 10,
        borderRadius: 10,
    },
    asientoItem: {
        paddingVertical: 6,
    },
    asientoText: {
        color: "#FFF",
        fontSize: 16,
    },
    totalBox: {
        backgroundColor: "#efece0",
        padding: 15,
        borderRadius: 10,
        marginTop: 20,
    },
    totalLabel: {
        fontSize: 18,
        fontWeight: "bold",
    },
    totalAmount: {
        fontSize: 26,
        fontWeight: "bold",
        marginTop: 5,
        color: "#008000",
    },
    qr: {
        width: "100%",
        height: 250,
        marginVertical: 20,
    },
     contenedorQr: {      
       alignItems: "center",
       marginBottom: 29
    },
});
