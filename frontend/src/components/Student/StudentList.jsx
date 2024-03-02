import { useEffect, useState } from 'react'
import {
    setError,
    startLoading,
    stopLoading,
} from '../../redux/loadingSlice/loadingSlice'
import { useDispatch, useSelector } from 'react-redux'
import { axiosPrivate } from '../../api/axios'
import Loader from '../../utils/Loader'
import StudentListElement from './StudentListElement'
import { string } from 'prop-types'

const StudentList = ({ group_id }) => {
    const [students, setStudents] = useState([])
    const { loading } = useSelector((state) => state.loading)
    const dispatch = useDispatch()

    useEffect(() => {
        const fetchStudents = async () => {
            dispatch(startLoading())

            try {
                const res = await axiosPrivate.get(
                    `/students/?group=${group_id}`
                )
                setStudents(res.data)
            } catch (error) {
                dispatch(setError(error))
            } finally {
                dispatch(stopLoading())
            }
        }

        fetchStudents()
    }, [dispatch, group_id])

    if (loading) return <Loader />

    return students.map((student) => (
        <StudentListElement key={student.id} student={student} />
    ))
}

StudentList.propTypes = {
    group_id: string,
}

export default StudentList
