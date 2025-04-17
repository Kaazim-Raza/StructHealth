import { View, Text, Button } from 'react-native';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={{ padding: 20 }}>
      <Text>Welcome to the Home Screen!</Text>
      <Button
        title="Go to Logs"
        onPress={() => router.push('/(tabs)/LogScreen')}
      />
    </View>
  );
}
