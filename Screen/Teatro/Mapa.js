import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator, Alert, Linking } from "react-native";
import api from "../../Src/Navegation/Service/Conexion";
import { useFocusEffect, useRoute } from "@react-navigation/native";

export default function MapaTeatroSogamoso({navigation}) {
  const [asientos, setAsientos] = useState([]);
  const [seleccionados, setSeleccionados] = useState([]); // contiene objetos con info y ID
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [total, setTotal] = useState(0);
  const [mostrarPalcos, setMostrarPalcos] = useState(false);

  const route = useRoute();
  const idEvento = route.params.id;


  useFocusEffect(
    React.useCallback(() => {
     const cargarAsientos = async () => {
      try {
        const response = await api.get("asientos/evento/" + idEvento);
        setAsientos(
          (response.data.asientos || []).map((a) => ({
            ...a,
            disponible: a.disponible === 1,
          }))
        );
      } catch (error) {
        console.error("Error al cargar asientos:", error);
        setError("No se pudieron cargar los asientos.");
      } finally {
        setCargando(false);
      }
    };
    cargarAsientos();
    }, [idEvento])
  );
  // 🔹 Alternar selección
  const toggleAsiento = (asiento) => {
    const id = asiento.id_asiento_evento;
    setSeleccionados((prev) => {
      const existe = prev.find((p) => p.id === id);
      if (existe) {
        // quitarlo si ya estaba seleccionado
        return prev.filter((p) => p.id !== id);
      } else {
        // agregarlo
        return [...prev, {
          id: id,
          ubicacion: asiento.ubicacion,
          fila: asiento.fila,
          numero: asiento.numero,
          precio: parseFloat(asiento.precio)
        }];
      }
    });
  };

  // 🔹 Calcular total
  useEffect(() => {
    const nuevoTotal = seleccionados.reduce((sum, a) => sum + a.precio, 0);
    setTotal(nuevoTotal);
  }, [seleccionados]);

  // 🔹 Filtrar zonas (Palcos o Zona General)
  const zonas = asientos.reduce((acc, asiento) => {
    if (!acc[asiento.ubicacion]) acc[asiento.ubicacion] = {};
    if (!acc[asiento.ubicacion][asiento.fila]) acc[asiento.ubicacion][asiento.fila] = [];
    acc[asiento.ubicacion][asiento.fila].push(asiento);
    return acc;
  }, {});

  const zonasFiltradas = Object.entries(zonas).filter(([zonaNombre]) => {
    if (mostrarPalcos) {
      return zonaNombre.toLowerCase().includes("palco");
    } else {
      return zonaNombre.toLowerCase().includes("zona general");
    }
  });

  const realizarPago = async () => {
  if (seleccionados.length === 0) {
    Alert.alert("Sin asientos", "Debes seleccionar al menos un asiento.");
    return;
  }

  try {
    const data = {
       evento_id: idEvento,
      total: total,
      asientos: seleccionados.map((a) => a.id),
    };

    const response = await api.post("/pago/stripe", data);
    const { url } = response.data;
  console.log("Respuesta del pago", url);

    if (url) {
      navigation.navigate("PagoStripe", { url: url });
    }
  } catch (error) {
    console.error(error);
    Alert.alert("Error", "No se pudo iniciar el pago con Stripe.");
  }
};


  // 🔹 Estados de carga
  if (cargando) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#2563eb" />
        <Text>Cargando asientos...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ color: "red" }}>❌ {error}</Text>
      </View>
    );
  }

  // 🔹 Render principal
  return (
    <ScrollView contentContainerStyle={{ backgroundColor: "#2B1B1B", padding: 16 }}>
      <Text
        style={{
          fontSize: 22,
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: 16,
          color: "#fff",
        }}
      >
        🎭 Mapa de Asientos - Teatro Sogamoso
      </Text>

      {/* 🔘 Botón Palcos / Zona General */}
      <TouchableOpacity
        onPress={() => setMostrarPalcos(!mostrarPalcos)}
        style={{
          backgroundColor: mostrarPalcos ? "#6d28d9" : "#facc15",
          padding: 12,
          borderRadius: 10,
          marginBottom: 20,
        }}
      >
        <Text
          style={{
            color: mostrarPalcos ? "#fff" : "#000",
            textAlign: "center",
            fontWeight: "bold",
            fontSize: 16,
          }}
        >
          {mostrarPalcos ? "Mostrar Zona General" : "Mostrar Palcos"}
        </Text>
      </TouchableOpacity>

      {/* 🔹 Zonas filtradas */}
      {zonasFiltradas.map(([zonaNombre, filas], zIndex) => (
        <View
          key={zIndex}
          style={{
            backgroundColor: "#A0522D",
            borderRadius: 10,
            padding: 12,
            marginBottom: 16,
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: "600",
              textAlign: "center",
              marginBottom: 10,
              color: "#fff",
            }}
          >
            {zonaNombre}
          </Text>

          {Object.entries(filas).map(([letra, asientosFila], fIndex) => (
            <View key={fIndex} style={{ marginBottom: 8 }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  flexWrap: "wrap",
                  marginTop: 4,
                }}
              >
                {asientosFila.map((asiento) => {
                  const seleccionado = seleccionados.some((s) => s.id === asiento.id_asiento_evento);
                  const disponible = asiento.disponible;

                  return (
                    <TouchableOpacity
                      key={asiento.id_asiento_evento}
                      onPress={() => toggleAsiento(asiento)}
                      disabled={!disponible}
                      style={{
                        width: 23,
                        height: 27,
                        margin: 2,
                        borderRadius: 6,
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: !disponible
                          ? "#9ca3af"
                          : seleccionado
                          ? "#623b0e"
                          : "#ffd344",
                        borderWidth: 1,
                        borderColor: "#3b3b3b",
                      }}
                    >
                      <Text style={{ fontSize: 12, color: "#000", fontWeight: "600" }}>
                        {asiento.numero}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          ))}
        </View>
      ))}

      {/* 🔹 Panel inferior con total */}
      <View
        style={{
          backgroundColor: "#fff",
          borderRadius: 10,
          padding: 12,
          marginTop: 10,
        }}
      >
        <Text style={{ fontSize: 16, fontWeight: "bold", marginBottom: 6 }}>
          Asientos seleccionados:
        </Text>

        {seleccionados.length > 0 ? (
          <View>
            {seleccionados.map((a) => (
              <Text key={a.id}>
                🎟 {a.ubicacion} - Fila {a.fila} - Asiento {a.numero} - 💰 {a.precio}
              </Text>
            ))}

            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                marginTop: 10,
                color: "#111",
              }}
            >
              💵 Total a pagar: ${total.toLocaleString("es-CO")}
            </Text>

            {/* 🔘 Botón de pago */}
            <TouchableOpacity
              onPress={realizarPago}
              style={{
                marginTop: 15,
                backgroundColor: "#2563eb",
                padding: 12,
                borderRadius: 10,
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  fontWeight: "bold",
                  textAlign: "center",
                  fontSize: 16,
                }}
              >
                💳 Pagar y Reservar
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <Text style={{ color: "#6b7280" }}>Ninguno</Text>
        )}
      </View>
    </ScrollView>
  );
}