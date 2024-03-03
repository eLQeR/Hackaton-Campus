import { FaRegPlusSquare } from 'react-icons/fa'
import { Link } from 'react-router-dom'

import TestList from '../../components/Test/TestList'

const TestsPage = () => {
    return (
        <section>
            <div className={'add-test'}>
                <Link to="/create-test">
                    <FaRegPlusSquare/>
                    <h2>Додати тест</h2>
                </Link>
            </div>

            <TestList />
        </section>
    )
}

export default TestsPage
