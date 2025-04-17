import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';

export default function LogsScreen() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    fetch('http://51.21.190.83:8000/all-sensor-logs/')
      .then((res) => res.json())
      .then((data) => setLogs(data.logs))
      .catch(console.error);
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
        keyExtractor={(_, index) => index.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  item: { backgroundColor: '#eee', padding: 10, marginBottom: 10 },
});
