import GroupListElement from './GroupListElement'

const GroupList = ({ groups }) => {
    return groups.map((group) => (
        <GroupListElement key={group.id} group={group} />
    ))
}

export default GroupList
