import { Outlet } from 'react-router-dom'

export function AuthLayout() {
  return (
    <div className="relative h-screen w-screen">
      <div className="absolute left-0 top-0 z-50 h-16 w-full" data-tauri-drag-region />
      <div className="relative flex min-h-0 w-full flex-1">
        <Outlet />
      </div>
    </div>
  );
}
