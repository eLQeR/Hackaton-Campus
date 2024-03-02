import { object } from 'prop-types'

const StudentListElement = ({ student }) => {
    return (
        <div>
            <div>{student.last_name}</div>
            <div>{student.first_name}</div>
            <div>{student.second_name}</div>
        </div>
    )
}

StudentListElement.propTypes = {
    student: object,
}

export default StudentListElement
