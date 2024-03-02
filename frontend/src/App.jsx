import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Layout from './utils/Layout'
import Home from './pages/Home'
import SignIn from './pages/SignIn'
import GroupListPage from './pages/teacher/GroupListPage'
import StudentListPage from './pages/teacher/StudentListPage'
import TestsPage from './pages/teacher/TestsPage'

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
            {
                path: '/groups',
                element: <GroupListPage />,
            },
            {
                path: '/students/:group_id',
                element: <StudentListPage />,
            },
            {
                path: '/tests',
                element: <TestsPage />,
            },
        ],
    },
])

function App() {
    return <RouterProvider router={router} />
}

export default App
