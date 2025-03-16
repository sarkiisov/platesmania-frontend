import { createBrowserRouter, RouterProvider } from 'react-router'
import { AddPage, EditPage, GalleryPage, galleyPageLoader } from './components/pages'

const router = createBrowserRouter([
  {
    path: '/gallery',
    loader: galleyPageLoader,
    element: <GalleryPage />
  },
  {
    path: '/gallery/add',
    element: <AddPage />
  },
  {
    path: '/gallery/:id/edit',
    element: <EditPage />
  }
])

function App() {
  return <RouterProvider router={router} />
}

export default App
