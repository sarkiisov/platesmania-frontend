import { ToastContainer } from 'react-toastify'

export const ToastProvider = () => {
  return (
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
  )
}
