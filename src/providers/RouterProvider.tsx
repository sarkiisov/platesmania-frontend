import {
  AddPage,
  EditPage,
  editPageLoader,
  GalleryPage,
  galleyPageLoader
} from '@/components/pages'
import { FormLayout, GalleryLayout } from '@/layouts'
import { createBrowserRouter, redirect, RouterProvider as ReactRouterProvider } from 'react-router'

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

export const RouterProvider = () => {
  return <ReactRouterProvider router={router} />
}
