import { Link, Outlet } from 'react-router'

export const FormLayout = () => {
  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-4 py-4">
      <Link to="/gallery" className="text-sm font-medium hover:underline">
        ← Вернуться к галерее
      </Link>
      <Outlet />
    </div>
  )
}
