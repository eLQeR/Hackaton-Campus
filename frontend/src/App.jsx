import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Layout from './utils/Layout'
import Home from './pages/Home'
import SignIn from './pages/SignIn'
import GroupListPage from './pages/teacher/GroupListPage'
import StudentListPage from './pages/teacher/StudentListPage'
import TestsPageTeacher from './pages/teacher/TestsPage'
import TestsPageUser from './pages/student/TestsPage'
import CreateTestPage from './pages/teacher/CreateTestPage'
import TestDetailsPage from './pages/teacher/TestDetailsPage'
import TestingPage from './pages/student/TestingPage'
import MarksPage from './pages/student/MarksPage'

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
                element: <TestsPageTeacher />,
            },
            {
                path: '/create-test',
                element: <CreateTestPage />,
            },
            {
                path: '/test/:test_id',
                element: <TestDetailsPage />,
            },
            {
                path: '/user-tests',
                element: <TestsPageUser />,
            },
            {
                path: '/testing/:test_id',
                element: <TestingPage />,
            },
            {
                path: '/marks/:user_id',
                element: <MarksPage />,
            },
        ],
    },
])

function App() {
    return <RouterProvider router={router} />
}

export default App
