import React, { useState, useEffect } from "react";
import { View, Text, Button } from "react-native";
import { Camera, CameraView } from "expo-camera";

export default function LectorQR({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    const pedirPermiso = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    };

    pedirPermiso();
  }, []);

  if (hasPermission === null) return <Text>Solicitando permiso...</Text>;
  if (hasPermission === false) return <Text>No tienes acceso a la cámara</Text>;

  const handleScan = ({ data }) => {
    setScanned(true);

    try {
      const json = JSON.parse(data);
      navigation.navigate("DetalleQr", { info: json });
    } catch (e) {
      alert("❌ QR inválido o no es JSON");
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <CameraView
        style={{ flex: 1 }}
        facing="back"
        onBarcodeScanned={scanned ? undefined : handleScan}
        barcodeScannerSettings={{
          barcodeTypes: ["qr"],
        }}
      />

      {scanned && (
        <Button title="Escanear otro QR" onPress={() => setScanned(false)} />
      )}
    </View>
  );
}
