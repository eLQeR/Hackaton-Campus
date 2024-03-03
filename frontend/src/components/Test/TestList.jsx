import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'
import {
    setError,
    startLoading,
    stopLoading,
} from '../../redux/loadingSlice/loadingSlice'
import TestListItem from './TestListItem'

const TestList = () => {
    const [tests, setTests] = useState([])
    const dispatch = useDispatch()
    const axiosPrivate = useAxiosPrivate()

    useEffect(() => {
        try {
            const fetchTests = async () => {
                dispatch(startLoading())
                const res = await axiosPrivate.get('/tests/')
                setTests(res.data)
                dispatch(stopLoading())
            }

            fetchTests()
        } catch (error) {
            dispatch(setError(error))
        }
    }, [axiosPrivate, dispatch])

    return (
        <div>
            {tests.map((test) => (
                <TestListItem key={test.id} test={test} />
            ))}
        </div>
    )
}

export default TestList
