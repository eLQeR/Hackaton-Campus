import './App.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Layout from './utils/Layout'
import Home from './pages/Home'
import SignIn from './pages/SignIn'

const router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            {
                path: '/',
                element: <Home />,
            },
            {
                path: '/login',
                element: <SignIn />,
            },
        ],
    },
])

function App() {
    return <RouterProvider router={router} />
}

export default App
