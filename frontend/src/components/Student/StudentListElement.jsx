import { object } from 'prop-types'

const StudentListElement = ({ student }) => {
    return (
        <div className={'student-row'}>
            <div className={'element left-side'}>{student.last_name}</div>
            <div className={'element'}>{student.first_name}</div>
            <div className={'element'}>{student.second_name}</div>
            <div className={'element'}>{student.average_mark}</div>
            <span className={'element right-side'}>
                <strong>Детальніше</strong>
            </span>
        </div>
    )
}

StudentListElement.propTypes = {
    student: object,
}

export default StudentListElement
