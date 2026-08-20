// importacion de hooks componentes nativos y servicios
import React, { useEffect, useState, useCallback } from 'react';
import { FlatList, RefreshControl, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { canchasService } from '@/services/canchasService';
import { EstadoCarga } from '@/components/EstadoCarga';
import { TarjetaCancha } from '@/components/TarjetaCancha';
import { Cancha } from '@/types/cancha';

// pantalla principal con el catalogo de canchas disponibles en formosa
export default function PantallaCatalogoCanchas() {
  // router para navegar al detalle de cada cancha
  const router = useRouter();

  // estados locales para el listado de canchas y control de carga
  const [canchas, setCanchas] = useState<Cancha[]>([]);
  const [cargando, setCargando] = useState<boolean>(true);
  const [refrescando, setRefrescando] = useState<boolean>(false);

  // funcion para consultar el listado de canchas desde el servicio
  const cargarCanchas = useCallback(async () => {
    try {
      const datos = await canchasService.obtenerCanchas();
      setCanchas(datos);
    } catch (error) {
      console.error(error);
    } finally {
      setCargando(false);
      setRefrescando(false);
    }
  }, []);

  // carga automatica de datos al montar la pantalla
  useEffect(() => {
    cargarCanchas();
  }, [cargarCanchas]);

  // accion para recargar los datos mediante gesto pull to refresh
  const alRefrescar = useCallback(() => {
    setRefrescando(true);
    cargarCanchas();
  }, [cargarCanchas]);

  // vista mostrada mientras se cargan los datos iniciales
  if (cargando) {
    return (
      <SafeAreaView style={styles.contenedorCarga} edges={['top', 'left', 'right']}>
        <EstadoCarga mensaje="Cargando canchas del complejo..." />
      </SafeAreaView>
    );
  }

  // funcion para renderizar cada tarjeta de cancha en la lista
  const renderizarItem = ({ item }: { item: Cancha }) => (
    <TarjetaCancha
      cancha={item}
      onPress={() => router.push(`/cancha/${item.id}` as any)}
    />
  );

  // encabezado superior de la lista con titulo y descripcion
  const renderizarEncabezado = () => (
    <View style={styles.encabezado}>
      <Text style={styles.titulo}>Canchas Disponibles</Text>
      <Text style={styles.subtitulo}>
        Explora nuestras canchas de Fútbol 5 y Fútbol 6 y reserva tu próximo partido.
      </Text>
    </View>
  );

  // renderizado principal del listado optimizado con flatlist
  return (
    <SafeAreaView style={styles.contenedor} edges={['top', 'left', 'right']}>
      <FlatList
        data={canchas}
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

// estilos para el catalogo de canchas
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
