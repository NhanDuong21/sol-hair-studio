import { StatusBar } from 'expo-status-bar'
import { ScrollView, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { apiBaseUrl } from '../../../config/env.js'
import HealthStatusCard from '../components/HealthStatusCard.jsx'
import { useHealth } from '../hooks/useHealth.js'
import styles from '../styles/HealthScreen.styles.js'

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
