import Group from './Group'

const GroupsList = () => {
    const groups = []

    return (
        <div>
            {groups.map((group) => (
                <Group key={group.id} group={group} />
            ))}
        </div>
    )
}

export default GroupsList
