import React, { useEffect, useState, useCallback } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { canchasService } from '@/services/canchasService';
import { BadgeTipo } from '@/components/BadgeTipo';
import { BotonAccion } from '@/components/BotonAccion';
import { EstadoCarga } from '@/components/EstadoCarga';
import { formatearMoneda } from '@/utils/formateadores';
import { Cancha } from '@/types/cancha';

export default function PantallaDetalleCancha() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [cancha, setCancha] = useState<Cancha | null>(null);
  const [cargando, setCargando] = useState<boolean>(true);

  const cargarDetalle = useCallback(async () => {
    if (!id) {
      setCargando(false);
      return;
    }
    try {
      setCargando(true);
      const datos = await canchasService.obtenerCanchaPorId(id);
      setCancha(datos);
    } catch (error) {
      console.error(error);
      setCancha(null);
    } finally {
      setCargando(false);
    }
  }, [id]);

  useEffect(() => {
    cargarDetalle();
  }, [cargarDetalle]);

  if (cargando) {
    return (
      <SafeAreaView style={styles.contenedorCarga} edges={['bottom', 'left', 'right']}>
        <EstadoCarga mensaje="Cargando detalle de la cancha..." />
      </SafeAreaView>
    );
  }

  if (!cancha) {
    return (
      <SafeAreaView style={styles.contenedorError} edges={['bottom', 'left', 'right']}>
        <MaterialIcons name="error-outline" size={64} color="#94a3b8" />
        <Text style={styles.tituloError}>Cancha no encontrada</Text>
        <Text style={styles.mensajeError}>
          No se pudo encontrar la información correspondiente a la cancha seleccionada.
        </Text>
        <BotonAccion
          titulo="Volver al catálogo"
          onPress={() => router.back()}
          variante="secundario"
          style={styles.botonVolver}
        />
      </SafeAreaView>
    );
  }

  const imagenPorDefecto =
    cancha.tipo === 'Fútbol 5'
      ? 'https://images.unsplash.com/photo-1529900240051-06c3960f15d8?w=800&auto=format&fit=crop&q=60'
      : 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&auto=format&fit=crop&q=60';

  return (
    <SafeAreaView style={styles.contenedor} edges={['bottom', 'left', 'right']}>
      <ScrollView
        contentContainerStyle={styles.scrollContenido}
        showsVerticalScrollIndicator={false}
      >
        <Image
          source={{ uri: cancha.imagenUrl || imagenPorDefecto }}
          style={styles.imagen}
          resizeMode="cover"
        />

        <View style={styles.cuerpo}>
          <View style={styles.encabezado}>
            <Text style={styles.nombre}>{cancha.nombre}</Text>
            <BadgeTipo tipo={cancha.tipo} />
          </View>

          <View style={styles.tarjetaPrecio}>
            <View>
              <Text style={styles.etiquetaPrecio}>Precio por turno</Text>
              <Text style={styles.valorPrecio}>
                {formatearMoneda(cancha.precioPorTurno)}
              </Text>
            </View>
            <View style={styles.insigniaDisponibilidad}>
              <Text style={styles.textoDisponibilidad}>Disponible</Text>
            </View>
          </View>

          <View style={styles.seccion}>
            <Text style={styles.tituloSeccion}>Descripción</Text>
            <Text style={styles.textoDescripcion}>{cancha.descripcion}</Text>
          </View>

          <View style={styles.seccion}>
            <Text style={styles.tituloSeccion}>Servicios incluidos</Text>
            <View style={styles.serviciosContenedor}>
              {cancha.servicios.map((servicio, indice) => (
                <View key={indice} style={styles.chipServicio}>
                  <MaterialIcons
                    name="check-circle"
                    size={18}
                    color="#0284c7"
                    style={styles.iconoServicio}
                  />
                  <Text style={styles.textoServicio}>{servicio}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.barraInferior}>
        <BotonAccion
          titulo="Reservar Turno"
          onPress={() => router.push(`/reserva/${cancha.id}` as any)}
          variante="primario"
          style={styles.botonReservar}
        />
      </View>
    </SafeAreaView>
  );
}

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
  contenedorError: {
    flex: 1,
    backgroundColor: '#f8fafc',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  tituloError: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1e293b',
    marginTop: 16,
    marginBottom: 8,
  },
  mensajeError: {
    fontSize: 15,
    color: '#64748b',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 24,
  },
  botonVolver: {
    minWidth: 180,
  },
  scrollContenido: {
    paddingBottom: 24,
  },
  imagen: {
    width: '100%',
    height: 220,
    backgroundColor: '#e2e8f0',
  },
  cuerpo: {
    padding: 20,
  },
  encabezado: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 12,
    marginBottom: 16,
  },
  nombre: {
    flex: 1,
    fontSize: 22,
    fontWeight: '700',
    color: '#0f172a',
  },
  tarjetaPrecio: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    marginBottom: 20,
  },
  etiquetaPrecio: {
    fontSize: 13,
    color: '#64748b',
    marginBottom: 2,
  },
  valorPrecio: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0284c7',
  },
  insigniaDisponibilidad: {
    backgroundColor: '#ecfdf5',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#a7f3d0',
  },
  textoDisponibilidad: {
    color: '#059669',
    fontSize: 13,
    fontWeight: '600',
  },
  seccion: {
    marginBottom: 20,
  },
  tituloSeccion: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 8,
  },
  textoDescripcion: {
    fontSize: 15,
    color: '#475569',
    lineHeight: 22,
  },
  serviciosContenedor: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chipServicio: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  iconoServicio: {
    marginRight: 6,
  },
  textoServicio: {
    fontSize: 14,
    color: '#334155',
    fontWeight: '500',
  },
  barraInferior: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
  },
  botonReservar: {
    width: '100%',
  },
});
