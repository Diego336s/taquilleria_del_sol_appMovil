import React, { useRef, useState } from "react";
import { View, ActivityIndicator, Alert } from "react-native";
import { WebView } from "react-native-webview";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function PagosStripe() {
  const route = useRoute();
  const navigation = useNavigation();
  const { url } = route.params; // viene desde el botón “realizarPago”
  const { total } = route.params;
  const { asientos } = route.params;
  const webviewRef = useRef(null);
  const [loading, setLoading] = useState(true);


  const handleNavigationChange = (navState) => {
    const { url } = navState;
    if (!url) return;
    console.log("URL detectada:", url);




    // 🔹 Pago exitoso
    if (url.includes("/pago-exitoso")) {

      navigation.replace("Confirmacion", {
        estado: "exito",
        url: url,
        total: total,
        asientos: asientos

      });
    }


    // 🔹 Pago cancelado
    if (url.includes("/pago-cancelado")) {
      navigation.replace("Confirmacion", {
        estado: "cancelado",
        url: url,
        total: total,
        asientos: asientos
      });
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {loading && (
        <ActivityIndicator
          size="large"
          color="#2563eb"
          style={{ position: "absolute", top: "50%", left: "50%" }}
        />
      )}
      <WebView
        ref={webviewRef}
        source={{ uri: url }}
        onLoadEnd={() => setLoading(false)}
        onNavigationStateChange={handleNavigationChange}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
      />
    </View>
  );
}
