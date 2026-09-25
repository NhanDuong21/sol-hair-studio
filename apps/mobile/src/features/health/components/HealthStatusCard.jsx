import { ActivityIndicator, Pressable, Text, View } from 'react-native'
import styles from '../styles/HealthStatusCard.styles.js'

export default function HealthStatusCard({ state, endpoint, onRetry }) {
  return (
    <View style={styles.card}>
      <View style={styles.statusRow}>
        {state.kind === 'loading' ? (
          <ActivityIndicator color="#8d4939" />
        ) : (
          <View
            style={[
              styles.dot,
              state.kind === 'success' ? styles.dotSuccess : styles.dotError,
            ]}
          />
        )}
        <View>
          <Text style={styles.label}>TRẠNG THÁI API</Text>
          <Text style={styles.status}>
            {state.kind === 'loading' && 'Đang kiểm tra…'}
            {state.kind === 'success' && 'Đã kết nối'}
            {state.kind === 'error' && 'Chưa kết nối'}
          </Text>
        </View>
      </View>

      {state.kind === 'success' && (
        <View style={styles.details}>
          <Text style={styles.detailText}>Dịch vụ: {state.data.service}</Text>
          <Text style={styles.detailText}>
            Cơ sở dữ liệu: {state.data.database}
          </Text>
        </View>
      )}

      {state.kind === 'error' && (
        <Text style={styles.error}>{state.message}</Text>
      )}

      <Text selectable style={styles.endpoint}>{endpoint}</Text>
      <Pressable
        accessibilityRole="button"
        accessibilityState={{ disabled: state.kind === 'loading' }}
        disabled={state.kind === 'loading'}
        onPress={onRetry}
        style={({ pressed }) => [
          styles.button,
          pressed && styles.buttonPressed,
          state.kind === 'loading' && styles.buttonDisabled,
        ]}
      >
        <Text style={styles.buttonText}>Kiểm tra lại</Text>
      </Pressable>
    </View>
  )
}
