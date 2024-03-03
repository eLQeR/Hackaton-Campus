import { string } from 'prop-types'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'
import {
    setError,
    startLoading,
    stopLoading,
} from '../../redux/loadingSlice/loadingSlice'
import Loader from '../../utils/Loader'

const Testing = ({ test_id }) => {
    const [testData, setTestData] = useState({})
    const axiosPrivate = useAxiosPrivate()
    const dispatch = useDispatch()
    const { loading } = useSelector((state) => state.loading)

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                dispatch(startLoading())
                const res = await axiosPrivate.get(`/tests/${test_id}/`)
                setTestData(res.data)
            } catch (error) {
                dispatch(setError(error))
            } finally {
                dispatch(stopLoading())
            }
        }

        fetchDetails()
    }, [test_id])

    if (loading) return <Loader />

    return (
        <div>
            <div>
                <p>Тест: {testData.name}</p>
                <p>{testData.description}</p>
            </div>
            {testData.questions.map((question, i) => (
                <div key={question.question}>
                    <p>
                        {question.question} оцінка - {question.mark}
                    </p>
                    {question.variants.map((variant) => (
                        <div key={variant.answer}>
                            <input id={`${i}`} type="radio" name="answer" />
                            <label htmlFor={`${i}`}>{variant.answer}</label>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    )
}

Testing.propTypes = {
    test_id: string,
}

export default Testing
