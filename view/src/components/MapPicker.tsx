/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { useState } from 'react';
import { Platform, View, Text, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export default function MapPicker() {
  if (Platform.OS === 'web') {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Map is available only on mobile app</Text>
      </View>
    );
  }

  // 👉 Below is same MapView component (only runs on mobile)
  const [marker, setMarker] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  const handleLongPress = (event: any) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setMarker({ latitude, longitude });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mark Your Location</Text>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 28.6139,
          longitude: 77.209,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
        onLongPress={handleLongPress}
      >
        {marker && <Marker coordinate={marker} title="Your Location" />}
      </MapView>
      {marker && (
        <Text style={styles.coords}>
          Latitude: {marker.latitude.toFixed(4)} | Longitude:{' '}
          {marker.longitude.toFixed(4)}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginTop: 16, padding: 12 },
  title: { fontSize: 16, fontWeight: '600', marginBottom: 8 },
  map: { width: '100%', height: 300, borderRadius: 12 },
  coords: {
    marginTop: 8,
    textAlign: 'center',
    color: '#333',
    fontSize: 14,
  },
});
