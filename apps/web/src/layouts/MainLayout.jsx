import { Outlet } from 'react-router-dom'

export default function MainLayout() {
  return (
    <main className="min-h-svh min-w-80 bg-[#f7f3ed] bg-[radial-gradient(circle_at_12%_8%,#eadfd2_0,transparent_32%),radial-gradient(circle_at_88%_88%,#e4d3c7_0,transparent_28%)] px-5 py-9 font-sans text-[#22201f] sm:grid sm:place-items-center sm:py-12">
      <Outlet />
    </main>
  )
}
