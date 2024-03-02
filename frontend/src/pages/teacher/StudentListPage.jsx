import { useParams } from 'react-router'
import StudentList from '../../components/Student/StudentList'

const StudentListPage = () => {
    const { group_id } = useParams()

    return (
        <section>
            <StudentList group_id={group_id} />
        </section>
    )
}

export default StudentListPage
