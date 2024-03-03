import { object } from 'prop-types'
import { Link } from 'react-router-dom'

const GroupListElement = ({ group }) => {
    return (
        <div className={"groups-table-row"}>
            <Link to={`/students/${group.id}`}>
                <div className={"element element-border left-side"}><p>{group.code}</p></div>
            </Link>
            <div className={"element element-border"}><p>{group.degree}</p></div>
            <div className={"element element-border"}><p>{group.form_of_studying}</p></div>
            <div className={"element element-border right-side"}><p>{group.course}</p></div>
        </div>
    )
}

GroupListElement.propTypes = {
    group: object,
}

export default GroupListElement
