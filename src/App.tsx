import { createBrowserRouter, redirect, RouterProvider } from 'react-router'
import {
  AddPage,
  EditPage,
  editPageLoader,
  GalleryPage,
  galleyPageLoader
} from './components/pages'
import { FormLayout, GalleryLayout } from './layouts'
import { ToastContainer } from 'react-toastify'

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
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer
        closeButton={false}
        hideProgressBar
        stacked
        autoClose={2000}
        icon={({ type }) => {
          switch (type) {
            case 'info':
              return <div className="indicator bg-indigo-400" />
            case 'error':
              return <div className="indicator bg-red-500" />
            case 'success':
              return <div className="indicator bg-green-500" />
            case 'warning':
              return <div className="indicator bg-yellow-500" />
            default:
              return null
          }
        }}
      />
    </>
  )
}

export default App
