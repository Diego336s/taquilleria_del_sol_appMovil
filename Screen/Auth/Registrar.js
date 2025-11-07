
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
  ImageBackground,
  Alert
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { registrar } from "../../Src/Navegation/Service/AuthService";
import { Picker } from "@react-native-picker/picker";

export default function Registro({ navigation }) {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [documento, setDocumento] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmarClave, setConfirmarClave] = useState("");
  const [sexo, setSexo] = useState("");
  const [cargando, setCargando] = useState(false);

  const handleRegistro = async () => {
     setCargando(true);
    if (!nombre || !documento || !fechaNacimiento || !telefono || !email || !password || !confirmarClave || !sexo) {
      Alert.alert("Error de campos ☹️", "Debes rellenar todos los campos requerido");
       setCargando(false);
      return;
    }
    if (telefono.length !== 10) {
      Alert.alert("Error de telefono 📞", "El telefono debe tener 10 digitos");
       setCargando(false);
      return;
    }
    if (password !== confirmarClave) {
      Alert.alert("Error de contraseña 🔒", "Las contraseñan no coinciden");
       setCargando(false);
      return;
    }
    const response = await registrar(nombre, apellido, documento, fechaNacimiento, sexo, telefono, email, password);
    if (!response?.success) {
      Alert.alert("Error de registro 📝", response?.message);
       setCargando(false);
      return;
    }
    Alert.alert("Registro exitoso ✅", response?.message);
     setCargando(false);

  };

  const onChangeFecha = (event, selectedDate) => {
    const currentDate = selectedDate || fechaNacimiento;
    setShowPicker(Platform.OS === "ios");
    setFechaNacimiento(currentDate);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      {/* 👇 Fondo de pantalla */}
      <ImageBackground
        source={require("../../IMG/fondo.jpg")} // 👉 aquí colocas tu imagen de fondo
        style={styles.background}
      >
        <ScrollView contentContainerStyle={styles.scroll}>
          <View style={styles.container}>
            <View style={styles.card}>
              <Text style={styles.titulo}>Registrar</Text>

              <Text style={styles.label}>Nombre</Text>
              <TextInput
                style={styles.input}
                placeholder="Ingresa tu nombre"
                placeholderTextColor="#181717ff"
                value={nombre}
                onChangeText={setNombre}
              />

              <Text style={styles.label}>Apellido</Text>
              <TextInput
                style={styles.input}
                placeholder="Ingresa tu apellido"
                placeholderTextColor="#121111ff"
                value={apellido}
                onChangeText={setApellido}
              />

              <Text style={styles.label}>Documento</Text>
              <TextInput
                style={styles.input}
                placeholder="Número de documento"
                placeholderTextColor="#151414ff"
                keyboardType="numeric"
                value={documento}
                onChangeText={setDocumento}
              />

              <Text style={styles.label}>Fecha de Nacimiento</Text>
              <TouchableOpacity style={styles.input} onPress={() => setShowPicker(true)}>
                <Text style={{ color: "#333" }}>{fechaNacimiento.toLocaleDateString()}</Text>
              </TouchableOpacity>
              {showPicker && (
                <DateTimePicker
                  value={fechaNacimiento}
                  mode="date"
                  display="default"
                  onChange={onChangeFecha}
                  maximumDate={new Date()}
                />
              )}

              <Text style={styles.label}>Sexo:</Text>
              <Picker
                selectedValue={sexo}
                onValueChange={(itemValue) => setSexo(itemValue)}
                style={styles.select}
              >
                <Picker.Item label="Seleccione..." value="" />
                <Picker.Item label="Masculino" value="M" />
                <Picker.Item label="Femenino" value="F" />
              </Picker>
              <Text style={styles.label}>Teléfono</Text>
              <TextInput
                style={styles.input}
                placeholder="Número de teléfono"
                placeholderTextColor="#181818ff"
                keyboardType="phone-pad"
                value={telefono}
                onChangeText={setTelefono}
              />

              <Text style={styles.label}>E-mail</Text>
              <TextInput
                style={styles.input}
                placeholder="ejemplo@email.com"
                placeholderTextColor="#030303ff"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
              />

              <Text style={styles.label}>Contraseña</Text>
              <TextInput
                style={styles.input}
                placeholder="********"
                placeholderTextColor="#161616ff"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />

              <Text style={styles.label}>Confirma contraseña</Text>
              <TextInput
                style={styles.input}
                placeholder="********"
                placeholderTextColor="#161616ff"
                secureTextEntry
                value={confirmarClave}
                onChangeText={setConfirmarClave}
              />

              <TouchableOpacity style={styles.boton} disabled={cargando} onPress={handleRegistro}>
                <Text style={styles.botonTexto}>Registrar</Text>
              </TouchableOpacity>

              <Text style={styles.textoCuenta}>
                ¿Ya tienes una cuenta?{" "}
                <Text
                  style={styles.link}
                  onPress={() => navigation.navigate("Login")}
                >
                  Entra Aquí!
                </Text>
              </Text>
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover"

  },
  scroll: {
    flexGrow: 1,
    justifyContent: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: "85%",
    backgroundColor: "rgba(255, 255, 255, 0.25)", // 👈 transparente
    padding: 20,
    marginBottom: 30,
    borderRadius: 12,
    alignItems: "center",
  },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#ffffffff", // 👈 para contraste
    textShadowColor: "#000", // 👈 color del borde (sombra)
    textShadowOffset: { width: 2, height: 2 }, // 👈 desplazamiento de la sombra
    textShadowRadius: 1, // 👈 difuminado, si lo quieres más sólido ponlo en 0
  },
  label: {
    marginTop: 10,
    marginBottom: 5,
    fontWeight: "600",
    color: "#ffffffff", // 👈 Blanco para resaltar
    alignSelf: "flex-start",
    textShadowColor: "#000", // 👈 color del borde (sombra)
    textShadowOffset: { width: 2, height: 2 }, // 👈 desplazamiento de la sombra
    textShadowRadius: 1, // 👈 difuminado, si lo quieres más sólido ponlo en 0
  },
  input: {
    width: "100%",
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    backgroundColor: "rgba(255,255,255,0.4)", // 👈 inputs semitransparentes
    color: "#090909ff",
  },
   select: {
    width: "100%",
    borderRadius: 8,
    padding: 2,
    marginBottom: 10,
    backgroundColor: "rgba(255,255,255,0.4)", // 👈 inputs semitransparentes
    color: "#090909ff",
  },
  boton: {
    backgroundColor: "#1E5EFF",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
    width: "100%",
  },
  botonTexto: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  textoCuenta: {
    textAlign: "center",
    marginTop: 15,
    color: "white",
  },
  link: {
    color: "#FFD700",
    fontWeight: "bold",
  },
});
