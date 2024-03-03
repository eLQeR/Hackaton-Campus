import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { useDispatch } from 'react-redux'
import {
    startLoading,
    stopLoading,
    setError,
} from '../../redux/loadingSlice/loadingSlice'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'

const TestDetailsPage = () => {
    const { test_id } = useParams()
    const [testData, setTestData] = useState({})
    const dispatch = useDispatch()
    const axiosPrivate = useAxiosPrivate()

    useEffect(() => {
        const fetchData = async () => {
            try {
                dispatch(startLoading())
                const res = await axiosPrivate.get('/test/')
                setTestData(res.data)
            } catch (error) {
                dispatch(setError(error))
            } finally {
                dispatch(stopLoading())
            }
        }

        fetchData()
    }, [test_id, dispatch, axiosPrivate])

    return <div>TestDetailsPage</div>
}

export default TestDetailsPage
