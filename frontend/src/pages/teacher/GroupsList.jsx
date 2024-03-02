import Group from './Group'

const GroupsList = () => {
    const groups = []

    return (
        <section>
            {groups.map((group) => (
                <Group key={group.id} group={group} />
            ))}
        </section>
    )
}

export default GroupsList
