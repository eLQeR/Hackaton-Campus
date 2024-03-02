import { object } from 'prop-types'
import { Link } from 'react-router-dom'

const GroupListElement = ({ group }) => {
    return (
        <div>
            <Link to={`/students/${group.id}`}>
                <div>{group.code}</div>
            </Link>
            <div>{group.degree}</div>
            <div>{group.form_of_studying}</div>
            <div>{group.course}</div>
        </div>
    )
}

GroupListElement.propTypes = {
    group: object,
}

export default GroupListElement
