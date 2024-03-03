import { useState } from 'react'
import { FaRegPlusSquare } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const TestsPage = () => {
    const [tests, setTests] = useState([])

    return (
        <div>
            <Link to="/create-test">
                <FaRegPlusSquare />
            </Link>
            <div>Addtest</div>
        </div>
    )
}

export default TestsPage