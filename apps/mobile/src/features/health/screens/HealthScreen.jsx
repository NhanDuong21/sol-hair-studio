import { StatusBar } from 'expo-status-bar'
import { ScrollView, StyleSheet, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { apiBaseUrl } from '../../../config/env.js'
import HealthStatusCard from '../components/HealthStatusCard.jsx'
import { useHealth } from '../hooks/useHealth.js'

export default function HealthScreen() {
  const { state, retry } = useHealth()

  return (
    <SafeAreaView
      edges={['top', 'right', 'bottom', 'left']}
      style={styles.safeArea}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.eyebrow}>SOL HAIR STUDIO</Text>
        <Text style={styles.title}>Nền tảng mobile dùng chung</Text>
        <Text style={styles.description}>
          Màn hình này kiểm tra ứng dụng React Native có thể kết nối tới API
          dùng chung. Danh mục dịch vụ chưa nằm trong phạm vi của nền hiện tại.
        </Text>
        <HealthStatusCard
          state={state}
          endpoint={`${apiBaseUrl}/api/health`}
          onRetry={retry}
        />
        <Text style={styles.hint}>
          Android Emulator thường dùng 10.0.2.2. Điện thoại thật phải dùng địa
          chỉ LAN của máy chạy API trong apps/mobile/.env.
        </Text>
      </ScrollView>
      <StatusBar style="dark" />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f7f3ed',
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
  },
  eyebrow: {
    color: '#8d4939',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 2.2,
    marginBottom: 14,
  },
  title: {
    color: '#22201f',
    fontSize: 42,
    fontWeight: '600',
    lineHeight: 45,
    letterSpacing: -1.2,
    marginBottom: 16,
  },
  description: {
    color: '#716d69',
    fontSize: 17,
    lineHeight: 25,
    marginBottom: 28,
  },
  hint: {
    color: '#716d69',
    fontSize: 13,
    lineHeight: 19,
    marginTop: 18,
  },
})
