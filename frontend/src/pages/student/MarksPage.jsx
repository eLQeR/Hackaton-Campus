import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'
import { useDispatch, useSelector } from 'react-redux'
import {
    setError,
    startLoading,
    stopLoading,
} from '../../redux/loadingSlice/loadingSlice'
import Loader from '../../utils/Loader'

const MarksPage = () => {
    const { user_id } = useParams()
    const privateAxios = useAxiosPrivate()
    const dispatch = useDispatch()
    const [marksData, setMarksData] = useState({})
    const { loading } = useSelector((state) => state.loading)

    useEffect(() => {
        const fetchMarks = async () => {
            try {
                dispatch(startLoading())
                const res = await privateAxios.get(`/marks/?user=${user_id}`)
                setMarksData(res.data)
            } catch (error) {
                dispatch(setError(error))
            } finally {
                dispatch(stopLoading())
            }
        }

        fetchMarks()
    }, [user_id, dispatch, privateAxios])

    const xuina = marksData.map((element) => (
        <div key={element.id}>
            <div className="flex-row">
                <div>{element.subject.name}</div> <div>{element.mark}</div>
            </div>
        </div>
    ))

    if (loading) return <Loader />

    return <div>{xuina}</div>
}

export default MarksPage
