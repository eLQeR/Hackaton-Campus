import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'
import {
    setError,
    startLoading,
    stopLoading,
} from '../../redux/loadingSlice/loadingSlice'
import TestListItem from './TestListItem'
import { object } from 'prop-types'

const TestList = ({ query }) => {
    const [tests, setTests] = useState([])
    const dispatch = useDispatch()
    const axiosPrivate = useAxiosPrivate()

    useEffect(() => {
        let params = '?'
        Object.keys(query).forEach(
            (param) => (params += `${param}=${query[param]}&`)
        )

        try {
            const fetchTests = async () => {
                dispatch(startLoading())
                const res = await axiosPrivate.get(`/tests/${params}`)
                setTests(res.data)
                dispatch(stopLoading())
            }

            fetchTests()
        } catch (error) {
            dispatch(setError(error))
        }
    }, [axiosPrivate, dispatch, query])

    return (
        <div>
            {tests.map((test) => (
                <TestListItem key={test.id} test={test} />
            ))}
        </div>
    )
}

TestList.propTypes = {
    query: object,
}

export default TestList
