import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HealthScreen from '../features/health/screens/HealthScreen.jsx'

const Stack = createNativeStackNavigator()

export default function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Health" component={HealthScreen} />
    </Stack.Navigator>
  )
}
