import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator } from "react-native";
import api from "../../Src/Navegation/Service/Conexion";

export default function MapaTeatroSogamoso() {
  const [asientos, setAsientos] = useState([]);
  const [seleccionados, setSeleccionados] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cargarAsientos = async () => {
      try {
        const response = await api.get("/listarAsientos");
        console.log("Asientos recibidos:", response.data); // 👈 solo por verificación
        setAsientos(response.data || []); // ✅ aquí el arreglo completo
      } catch (error) {
        console.error("Error al cargar asientos:", error);
        setAsientos([]); // para evitar undefined
      } finally {
        setCargando(false);
      }
    };

    cargarAsientos();
  }, []);


  const toggleAsiento = (ubicacion, fila, numero) => {
    const id = `${ubicacion}-${fila}-${numero}`;
    setSeleccionados((prev) =>
      prev.includes(id)
        ? prev.filter((x) => x !== id)
        : [...prev, id]
    );
  };



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

  if (!Array.isArray(asientos) || asientos.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>No hay asientos disponibles.</Text>
      </View>
    );
  }

  // ✅ Agrupar los asientos por zona y fila
  const zonas = (asientos || []).reduce((acc, asiento) => {
    if (!acc[asiento.ubicacion]) acc[asiento.ubicacion] = {};
    if (!acc[asiento.ubicacion][asiento.fila]) acc[asiento.ubicacion][asiento.fila] = [];
    acc[asiento.ubicacion][asiento.fila].push(asiento);
    return acc;
  }, {});


  return (
    <ScrollView contentContainerStyle={{ backgroundColor: "#2B1B1B", padding: 16 }}>
      <Text
        style={{
          fontSize: 22,
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: 16,
          color: "#fff"
        }}
      >
        🎭 Mapa de Asientos - Teatro Sogamoso
      </Text>

      {Object.entries(zonas).map(([zonaNombre, filas], zIndex) => (
        <View
          key={zIndex}
          style={{
            backgroundColor: "#A0522D",
            borderRadius: 10,
            padding: 12,
            marginBottom: 16,
            elevation: 3,
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: "600",
              textAlign: "center",
              marginBottom: 10,
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
                  const seleccionado = seleccionados.includes(`${asiento.ubicacion}-${asiento.fila}-${asiento.numero}`);

                  return (
                    <TouchableOpacity
                      key={asiento.id}
                      onPress={() => toggleAsiento(asiento.ubicacion, asiento.fila, asiento.numero)}
                      disabled={!asiento.disponible}
                      style={{
                        width: 22,
                        height: 22,
                        margin: 3,
                        borderRadius: 4,
                        backgroundColor: !asiento.disponible
                          ? "#9ca3af"
                          : seleccionado
                            ? "#623b0eff"
                            : "#ffd344ff",
                      }}
                    />
                  );
                })}
              </View>
            </View>
          ))}
        </View>
      ))}

      <View
        style={{
          backgroundColor: "#fff",
          borderRadius: 10,
          padding: 12,
          elevation: 3,
        }}
      >
        <Text style={{ fontSize: 16, fontWeight: "bold", marginBottom: 6 }}>
          Asientos seleccionados:
        </Text>
        {seleccionados.length > 0 ? (
          <Text>{seleccionados.join(", ")}</Text>
        ) : (
          <Text style={{ color: "#6b7280" }}>Ninguno</Text>
        )}
      </View>
    </ScrollView>
  );
}
