const GroupListElement = ({ group }) => {
    return (
        <div>
            <div>{group.code}</div>
            <div>{group.degree}</div>
            <div>{group.form_of_studying}</div>
            <div>{group.course}</div>
        </div>
    )
}

export default GroupListElement
