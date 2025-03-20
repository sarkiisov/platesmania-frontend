import { createBrowserRouter, redirect, RouterProvider } from 'react-router'
import {
  AddPage,
  EditPage,
  editPageLoader,
  GalleryPage,
  galleyPageLoader
} from './components/pages'
import { FormLayout, GalleryLayout } from './layouts'

const router = createBrowserRouter([
  {
    path: '/',
    loader: () => redirect('/gallery')
  },
  {
    element: <GalleryLayout />,
    children: [
      {
        path: '/gallery',
        loader: galleyPageLoader,
        element: <GalleryPage />
      }
    ]
  },
  {
    element: <FormLayout />,
    children: [
      {
        path: '/gallery/add',
        element: <AddPage />
      },
      {
        path: '/gallery/:id/edit',
        loader: editPageLoader,
        element: <EditPage />
      }
    ]
  }
])

function App() {
  return <RouterProvider router={router} />
}

export default App
