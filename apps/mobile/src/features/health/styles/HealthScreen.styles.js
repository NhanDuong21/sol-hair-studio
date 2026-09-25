import { StyleSheet } from 'react-native'

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

export default styles
