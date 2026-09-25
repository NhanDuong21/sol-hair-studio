import { Route, Routes } from 'react-router-dom'
import HealthPage from '../features/health/pages/HealthPage.jsx'
import MainLayout from '../layouts/MainLayout.jsx'

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HealthPage />} />
      </Route>
    </Routes>
  )
}
