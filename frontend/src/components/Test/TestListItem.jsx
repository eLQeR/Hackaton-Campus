import { object } from 'prop-types'
import { Link } from 'react-router-dom'

const TestListItem = ({ test }) => {
    return (
        <div>
            <span>{test.name}</span>
            <span>{test.description}</span>
            <span>{test.test_time}</span>
            <span>{test.max_mark}</span>
            <Link to={`/test/${test.id}`}>
                <button type="button">Перейти до тесту</button>
            </Link>
        </div>
    )
}

TestListItem.propTypes = {
    test: object,
}

export default TestListItem
