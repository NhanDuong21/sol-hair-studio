import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
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
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '700',
  },
})

export default styles
