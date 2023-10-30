import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App/index.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

// PAGE DEFINITIONS
import ViewIndex from './views/ViewIndex'
import ViewDashboard from "./views/ViewDashboard"
import ViewError from "./views/ViewError"
import ViewAccount from "./views/ViewAccount"
import ViewProfile from './views/ViewProfile'
import ViewActivateAccount from './views/ViewActivateAccount'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ViewError />,
    children: [
      {
        index: true,
        element: <ViewIndex />,
      },
      {
        path: '/dashboard',
        element: <ViewDashboard />,
      },
      {
        path: '/account',
        element: <ViewAccount />,
      },
      {
        path: '/profile/:userId',
        element: <ViewProfile />,
      },
      {
        path: '/activate/:userId',
        element: <ViewActivateAccount />,
      },
    ],
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(

  <RouterProvider router={router} />

)
