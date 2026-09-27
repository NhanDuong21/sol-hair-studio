import { Outlet } from 'react-router-dom'

export default function MainLayout() {
  return (
    <div className="min-h-svh overflow-x-clip bg-canvas font-sans text-ink">
      <Outlet />
    </div>
  )
}
