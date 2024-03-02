import { useParams } from 'react-router'
import StudentList from '../../components/Student/StudentList'

const StudentListPage = () => {
    const { group_id } = useParams()

    return (
        <section>
            <div className={'table'}>
                <div className={'student-row'}>
                    <div className={'element left-side'}>Прізвище</div>
                    <div className={'element'}>Ім'я</div>
                    <div className={'element'}>Побатькові</div>
                    <div className={'element right-side'}><strong>Детальна інформація</strong></div>
                </div>
                <StudentList group_id={group_id}/>
            </div>

        </section>
    )
}

export default StudentListPage
