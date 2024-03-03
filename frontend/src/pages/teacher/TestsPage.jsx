import { FaRegPlusSquare } from 'react-icons/fa'
import { Link } from 'react-router-dom'

import TestList from '../../components/Test/TestList'

const TestsPage = () => {
    return (
        <div>
            <Link to="/create-test">
                <FaRegPlusSquare />
            </Link>
            <TestList />
        </div>
    )
}

export default TestsPage
