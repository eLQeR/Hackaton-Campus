import { array } from 'prop-types'
import GroupListElement from './GroupListElement'

const GroupList = ({ groups }) => {
    return groups.map((group) => (
        <GroupListElement key={group.id} group={group} />
    ))
}

GroupList.propTypes = {
    groups: array,
}

export default GroupList
