// LogsScreen.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const LogsScreen = () => {
  const [logs, setLogs] = useState<any[]>([]);

  useEffect(() => {
    fetch('http://51.21.190.83:8000/all-sensor-logs/')  // API to get logs
      .then((response) => response.json())
      .then((data) => setLogs(data.logs))
      .catch((error) => console.error('Error fetching logs:', error));
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Sensor Logs</Text>
      <FlatList
        data={logs}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>Timestamp: {item.timestamp}</Text>
            <Text>Deflection: {item.deflection}</Text>
            <Text>Load: {item.load}</Text>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  item: {
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#f0f0f0',
  },
});

export default LogsScreen;
