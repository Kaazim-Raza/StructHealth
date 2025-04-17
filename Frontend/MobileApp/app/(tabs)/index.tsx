import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';

export default function App() {
  const [sensorData, setSensorData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState('Checking...');
  const [statusColor, setStatusColor] = useState('gray');

  const lastTimestampRef = useRef(null);
  const unchangedCountRef = useRef(0);

  useEffect(() => {
    const fetchSensorData = () => {
      fetch('http://51.21.190.83:8000/latest-sensor-data/')
        .then((response) => response.json())
        .then((json) => {
          const latest = json.data;
          setSensorData(latest);
          setLoading(false);

          if (latest?.timestamp) {
            if (latest.timestamp === lastTimestampRef.current) {
              unchangedCountRef.current += 1;
            } else {
              unchangedCountRef.current = 0;
              lastTimestampRef.current = latest.timestamp;
            }

            if (unchangedCountRef.current >= 2) {
              setStatus('Offline');
              setStatusColor('red');
            } else {
              setStatus('Active');
              setStatusColor('green');
            }
          }
        })
        .catch((error) => {
          console.error('Error fetching sensor data:', error);
          setStatus('Error');
          setStatusColor('orange');
        });
    };

    fetchSensorData();
    const interval = setInterval(fetchSensorData, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>📡 Latest Sensor Data</Text>
      <View style={styles.statusRow}>
        <View style={[styles.statusIndicator, { backgroundColor: statusColor }]} />
        <Text style={styles.statusText}>{status}</Text>
      </View>

      {loading ? (
        <ActivityIndicator size="large" />
      ) : sensorData ? (
        <View style={styles.card}>
          <Text style={styles.label}>Deflection:</Text>
          <Text style={styles.value}>{sensorData.deflection} mm</Text>

          <Text style={styles.label}>Load:</Text>
          <Text style={styles.value}>{sensorData.load} kN</Text>

          <Text style={styles.label}>Timestamp:</Text>
          <Text style={styles.value}>
            {new Date(sensorData.timestamp).toLocaleString()}
          </Text>
        </View>
      ) : (
        <Text>⚠️ No data available</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 24,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  card: {
    backgroundColor: '#f5f5f5',
    padding: 16,
    borderRadius: 10,
    marginTop: 20,
  },
  label: {
    fontWeight: 'bold',
    marginTop: 10,
  },
  value: {
    fontSize: 18,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  statusIndicator: {
    width: 14,
    height: 14,
    borderRadius: 7,
    marginRight: 8,
  },
  statusText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
