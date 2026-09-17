import { StatusBar } from 'expo-status-bar'
import { useCallback, useEffect, useState } from 'react'
import {
  ActivityIndicator,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native'

const apiBaseUrl = (
  process.env.EXPO_PUBLIC_API_BASE_URL ?? 'http://localhost:4000'
).replace(/\/+$/, '')

export default function App() {
  const [requestState, setRequestState] = useState({ kind: 'loading' })

  const checkApi = useCallback(async (signal) => {
    setRequestState({ kind: 'loading' })

    try {
      const response = await fetch(`${apiBaseUrl}/api/health`, { signal })
      if (!response.ok) throw new Error(`API trả về HTTP ${response.status}.`)

      const data = await response.json()
      setRequestState({ kind: 'success', data })
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') return

      setRequestState({
        kind: 'error',
        message:
          error instanceof Error ? error.message : 'Không thể kết nối API.',
      })
    }
  }, [])

  useEffect(() => {
    const controller = new AbortController()

    void (async () => {
      try {
        const response = await fetch(`${apiBaseUrl}/api/health`, {
          signal: controller.signal,
        })
        if (!response.ok) {
          throw new Error(`API trả về HTTP ${response.status}.`)
        }

        const data = await response.json()
        setRequestState({ kind: 'success', data })
      } catch (error) {
        if (error instanceof Error && error.name === 'AbortError') return

        setRequestState({
          kind: 'error',
          message:
            error instanceof Error ? error.message : 'Không thể kết nối API.',
        })
      }
    })()

    return () => controller.abort()
  }, [])

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.eyebrow}>SOL HAIR STUDIO</Text>
        <Text style={styles.title}>Nền tảng mobile dùng chung</Text>
        <Text style={styles.description}>
          Màn hình này kiểm tra ứng dụng React Native có thể kết nối tới API
          dùng chung. Danh mục dịch vụ chưa nằm trong phạm vi của baseline này.
        </Text>

        <View style={styles.card}>
          <View style={styles.statusRow}>
            {requestState.kind === 'loading' ? (
              <ActivityIndicator color="#8d4939" />
            ) : (
              <View
                style={[
                  styles.dot,
                  requestState.kind === 'success'
                    ? styles.dotSuccess
                    : styles.dotError,
                ]}
              />
            )}
            <View>
              <Text style={styles.label}>TRẠNG THÁI API</Text>
              <Text style={styles.status}>
                {requestState.kind === 'loading' && 'Đang kiểm tra…'}
                {requestState.kind === 'success' && 'Đã kết nối'}
                {requestState.kind === 'error' && 'Chưa kết nối'}
              </Text>
            </View>
          </View>

          {requestState.kind === 'success' && (
            <View style={styles.details}>
              <Text style={styles.detailText}>
                Dịch vụ: {requestState.data.service}
              </Text>
              <Text style={styles.detailText}>
                Cơ sở dữ liệu: {requestState.data.database}
              </Text>
            </View>
          )}

          {requestState.kind === 'error' && (
            <Text style={styles.error}>{requestState.message}</Text>
          )}

          <Text selectable style={styles.endpoint}>
            {apiBaseUrl}/api/health
          </Text>
          <Pressable
            accessibilityRole="button"
            onPress={() => void checkApi()}
            style={({ pressed }) => [
              styles.button,
              pressed && styles.buttonPressed,
            ]}
          >
            <Text style={styles.buttonText}>Kiểm tra lại</Text>
          </Pressable>
        </View>

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
  card: {
    backgroundColor: '#ffffff',
    borderColor: '#ded6cb',
    borderRadius: 22,
    borderWidth: 1,
    padding: 22,
  },
  statusRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 14,
  },
  dot: {
    borderRadius: 7,
    height: 14,
    width: 14,
  },
  dotSuccess: {
    backgroundColor: '#2f7d55',
  },
  dotError: {
    backgroundColor: '#b23a36',
  },
  label: {
    color: '#716d69',
    fontSize: 11,
    letterSpacing: 1.3,
  },
  status: {
    color: '#22201f',
    fontSize: 20,
    fontWeight: '700',
    marginTop: 2,
  },
  details: {
    backgroundColor: '#f4efe8',
    borderRadius: 14,
    gap: 5,
    marginTop: 20,
    padding: 14,
  },
  detailText: {
    color: '#3f3b38',
    fontSize: 14,
  },
  error: {
    color: '#b23a36',
    lineHeight: 20,
    marginTop: 18,
  },
  endpoint: {
    color: '#716d69',
    fontSize: 12,
    marginTop: 20,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#8d4939',
    borderRadius: 999,
    marginTop: 16,
    paddingHorizontal: 18,
    paddingVertical: 12,
  },
  buttonPressed: {
    opacity: 0.8,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '700',
  },
  hint: {
    color: '#716d69',
    fontSize: 13,
    lineHeight: 19,
    marginTop: 18,
  },
})
