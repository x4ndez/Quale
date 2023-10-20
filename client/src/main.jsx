import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App/index.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

// PAGE DEFINITIONS
import ViewIndex from "./views/ViewIndex/index.jsx"
import ViewError from "./views/ViewError/index.jsx"

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
    ],
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(

  <RouterProvider router={router} />

)
