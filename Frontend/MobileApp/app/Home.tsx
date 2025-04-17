import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Animated, ScrollView } from 'react-native';

// For the animation
const AnimatedText = Animated.createAnimatedComponent(Text);

export default function HomePage() {
  const [sensorData, setSensorData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState('Checking...');
  const [statusColor, setStatusColor] = useState('gray');

  // Animation for the page load
  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial opacity 0
  const lastTimestampRef = useRef(null); // Ref to store the last timestamp
  const unchangedCountRef = useRef(0); 

  useEffect(() => {
    // Fetch data and update state
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

  // Trigger the fade-in animation
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000, // Duration of the animation (1 second)
      useNativeDriver: true, // Ensure smooth native animation
    }).start();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Animated.Text style={[styles.heading, { opacity: fadeAnim }]}>StructHealth</Animated.Text>
      
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

      {/* Paragraph */}
      <Animated.Text style={[styles.paragraph, { opacity: fadeAnim }]}>
        Welcome to the StructHealth app. Here, you can monitor the real-time data and sensor logs that are continuously
        collected from structural health monitoring devices. This information helps in ensuring the safety and integrity
        of structures in real-time. Stay connected to keep track of the health of the structure at all times!
      </Animated.Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingTop: 60,
    paddingHorizontal: 24,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  statusIndicator: {
    width: 14,
    height: 14,
    borderRadius: 7,
    marginRight: 8,
  },
  statusText: {
    fontSize: 18,
    fontWeight: 'bold',
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
  paragraph: {
    marginTop: 20,
    fontSize: 16,
    lineHeight: 24,
    color: '#555',
  },
});
