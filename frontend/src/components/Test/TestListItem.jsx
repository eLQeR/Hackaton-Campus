import { object } from 'prop-types'
import { Link } from 'react-router-dom'

const TestListItem = ({ test }) => {
    return (
        <div className={'tests-table-row'}>
            <span className={'element element-border left-side'}>{test.name}</span>
            <span className={'element element-border'}>{test.description}</span>
            <span className={'element element-border'}>{test.test_time}</span>
            <span className={'element element-border'}>{test.max_mark}</span>
            <Link to="/test/">
                <span className={'element element-border right-side'}>Перейти до тесту</span>
            </Link>
        </div>
    )
}

TestListItem.propTypes = {
    test: object,
}

export default TestListItem
