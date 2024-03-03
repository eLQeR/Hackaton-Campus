import { object } from 'prop-types'

const TestListItem = ({ test }) => {
    return (
        <div>
            <span>{test.name}</span>
            <span>{test.description}</span>
            <span>{test.test_time}</span>
            <span>{test.max_mark}</span>
        </div>
    )
}

TestListItem.propTypes = {
    test: object,
}

export default TestListItem
