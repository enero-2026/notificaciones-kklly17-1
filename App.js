import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import * as Notifications from 'expo-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';


const pedirPermiso = async () => {
  await Notifications.requestPermissionsAsync();
};

const enviarNotificacion = async () => {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Hola, mundo 🌍",
      body: "Esta es tu primera notificación",
    },
    trigger: null, 
  });
};

export default function App() {

  
const [contador, setContador] = useState(0); 


useEffect(() => {
    guardarContador(contador);
  }, [contador]);

  const incrementar = () => {
    setContador(contador + 1);
  };

  const guardarContador = async (valor) => {
    try {
      await AsyncStorage.setItem("contador", JSON.stringify(valor));
    } catch (e) {
      console.log("Error guardando");
    }
  };
const cargarContador = async () => {
    try {
      const data = await AsyncStorage.getItem("contador");
      if (data !== null) {
        setContador(JSON.parse(data));
      }
    } catch (e) {
      console.log("Error cargando");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 20 }}>Notificaciones</Text>
      <Button title="Pedir permiso" onPress={pedirPermiso} />
      <Button title="Enviar notificación" onPress={enviarNotificacion} />

      <Text style={{ fontSize: 20, marginTop: 30 }}>
        Contador: {contador}
      </Text>
      <Button title="Incrementar" onPress={incrementar} />

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
