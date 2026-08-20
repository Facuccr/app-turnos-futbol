// importacion de hooks componentes y contexto de reservas
import React, { useEffect, useState, useCallback } from 'react';
import { FlatList, RefreshControl, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useReservas } from '@/context/ReservasContext';
import { reservasService } from '@/services/reservasService';
import { EstadoCarga } from '@/components/EstadoCarga';
import { EstadoVacio } from '@/components/EstadoVacio';
import { TarjetaTurno } from '@/components/TarjetaTurno';
import { TurnoReserva } from '@/types/reserva';

// pantalla de historial para consultar los turnos reservados por el usuario
export default function PantallaHistorialTurnos() {
  // inicializacion de router y contexto global de reservas
  const router = useRouter();
  const { reservas } = useReservas();

  // estados para controlar carga y actualizacion de datos
  const [cargando, setCargando] = useState<boolean>(true);
  const [refrescando, setRefrescando] = useState<boolean>(false);

  // funcion asincrona para recargar el historial de turnos
  const cargarHistorial = useCallback(async () => {
    try {
      await reservasService.obtenerHistorial();
    } catch (error) {
      console.error(error);
    } finally {
      setCargando(false);
      setRefrescando(false);
    }
  }, []);

  // carga del historial al montar el componente
  useEffect(() => {
    cargarHistorial();
  }, [cargarHistorial]);

  // accion para recargar mediante gesto pull to refresh
  const alRefrescar = useCallback(() => {
    setRefrescando(true);
    cargarHistorial();
  }, [cargarHistorial]);

  // vista de espera durante la carga inicial
  if (cargando) {
    return (
      <SafeAreaView style={styles.contenedorCarga} edges={['top', 'left', 'right']}>
        <EstadoCarga mensaje="Cargando historial de turnos..." />
      </SafeAreaView>
    );
  }

  // vista cuando el usuario aun no posee turnos confirmados
  if (reservas.length === 0) {
    return (
      <SafeAreaView style={styles.contenedor} edges={['top', 'left', 'right']}>
        <View style={styles.encabezado}>
          <Text style={styles.titulo}>Mis Turnos</Text>
          <Text style={styles.subtitulo}>
            Historial de tus reservas y partidos confirmados.
          </Text>
        </View>
        <EstadoVacio
          titulo="Aún no tienes turnos reservados"
          mensaje="No registras ninguna reserva en tu cuenta. Explora nuestro catálogo de canchas y agenda tu partido."
          textoBoton="Explorar canchas"
          onAccion={() => router.push('/(tabs)' as any)}
          nombreIcono="event-note"
        />
      </SafeAreaView>
    );
  }

  // funcion para renderizar cada tarjeta de turno reservado
  const renderizarItem = ({ item }: { item: TurnoReserva }) => (
    <TarjetaTurno turno={item} />
  );

  // cabecera de la lista de reservas
  const renderizarEncabezado = () => (
    <View style={styles.encabezado}>
      <Text style={styles.titulo}>Mis Turnos</Text>
      <Text style={styles.subtitulo}>
        Historial de tus reservas y partidos confirmados.
      </Text>
    </View>
  );

  // renderizado principal del listado con historial de turnos
  return (
    <SafeAreaView style={styles.contenedor} edges={['top', 'left', 'right']}>
      <FlatList
        data={reservas}
        keyExtractor={(item) => item.id}
        renderItem={renderizarItem}
        ListHeaderComponent={renderizarEncabezado}
        contentContainerStyle={styles.listaContenido}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refrescando}
            onRefresh={alRefrescar}
            colors={['#0284c7']}
            tintColor="#0284c7"
          />
        }
      />
    </SafeAreaView>
  );
}

// estilos para la pantalla de historial
const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  contenedorCarga: {
    flex: 1,
    backgroundColor: '#f8fafc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  listaContenido: {
    paddingHorizontal: 16,
    paddingBottom: 24,
    paddingTop: 8,
  },
  encabezado: {
    paddingHorizontal: 16,
    marginBottom: 16,
    marginTop: 8,
  },
  titulo: {
    fontSize: 24,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 4,
  },
  subtitulo: {
    fontSize: 14,
    color: '#64748b',
    lineHeight: 20,
  },
});
