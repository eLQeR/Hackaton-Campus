import { useEffect, useState } from 'react'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'
import { useDispatch, useSelector } from 'react-redux'
import {
    setError,
    startLoading,
    stopLoading,
} from '../../redux/loadingSlice/loadingSlice'
import axios from '../../api/axios'
import Loader from '../../utils/Loader'

const CreateTestPage = () => {
    const [formData, setFormData] = useState({ questions: {} })
    const [questions, setQuestions] = useState([])
    const axiosPrivate = useAxiosPrivate()
    const dispatch = useDispatch()
    const [groups, setGroups] = useState([])
    const { loading } = useSelector((state) => state.loading)

    useEffect(() => {
        const fetchGroups = async () => {
            try {
                dispatch(startLoading())
                const res = await axios.get('/groups/')
                setGroups(res.data)
                dispatch(stopLoading())
            } catch (error) {
                dispatch(setError(error))
            }
        }

        fetchGroups()
    }, [dispatch])

    const handleFormChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const updateForm = (id) => (e) => {
        setFormData((prev) => {
            const newData = { ...prev }

            if (!newData.questions[id]) newData.questions[id] = { variants: [] }
            newData.questions[id][e.target.name] = e.target.value

            return newData
        })
    }

    const handleAnswerSelect = (id) => (e) => {
        setFormData((prev) => {
            const newData = { ...prev }

            if (!newData.questions[id]) {
                newData.questions[id] = { variants: [] }
            }

            newData.questions[id].variants.forEach((answer, i) => {
                console.log(answer, e.target.value, i)
                if (!answer) answer = { is_correct: false }
                if (i == e.target.value) answer.is_correct = true
                else answer.is_correct = false
            })

            return newData
        })
    }

    const updateAnswers = (id, index) => (e) => {
        setFormData((prev) => {
            const newData = { ...prev }

            if (!newData.questions[id]) {
                newData.questions[id] = { variants: [] }
            }

            newData.questions[id].variants[index] = {
                answer: e.target.value,
                is_correct: false,
            }

            return newData
        })
    }

    const submit = async (e) => {
        e.preventDefault()
        formData.questions = Object.values(formData.questions)
        formData.questions.forEach((question) => {
            question.test = 8
            question.variants.forEach((answer) => (answer.question = 8))
        })

        console.log(formData)

        try {
            dispatch(startLoading())
            const res = await axiosPrivate.post(
                '/create-test/',
                JSON.stringify(formData)
            )

            console.log(res.data)
        } catch (error) {
            dispatch(setError(error))
        } finally {
            dispatch(stopLoading())
        }
    }

    if (loading) return <Loader />

    return (
        <section>
            <form onSubmit={submit}>
                <div id={'task-head'}>
                    <select className={'left-side'} onChange={handleFormChange} name="group" required>
                        {groups.map((group) => (
                            <option key={group.id} value={group.id}>
                                {group.code}
                            </option>
                        ))}
                    </select>
                    <input className={'element'}
                           onChange={handleFormChange}
                           name="name"
                           type="text"
                           placeholder="Назва тесту"
                           required
                    />
                    <textarea className={'element'}
                              onChange={handleFormChange}
                              name="description"
                              placeholder="Опис тесту"
                              required
                    />
                    <input className={'element'}
                           onChange={handleFormChange}
                           name="test_time"
                           placeholder="Час на виконання"
                           type="number"
                           required
                    />
                    <input className={'element right-side'}
                           onChange={handleFormChange}
                           name="max_mark"
                           placeholder="Максимальний бал"
                           type="number"
                           required
                    />
                </div>
                <div className={'task-flex'}>
                    {questions.map((question) => (
                        <div key={question.id} id={question.id} className={'task-body'}>
                            <input
                                onChange={updateForm(question.id)}
                                name={`question`}
                                type="text"
                                placeholder="Текст запитання"
                                required
                            />
                            <input
                                onChange={updateForm(question.id)}
                                name={`mark`}
                                type="number"
                                placeholder="Оцінка"
                                required
                            />
                            <input
                                onChange={updateAnswers(question.id, 0)}
                                type="text"
                                name="variant1"
                                placeholder="Варіант 1"
                                required
                            />
                            <input
                                onChange={updateAnswers(question.id, 1)}
                                type="text"
                                name="variant2"
                                placeholder="Варіант 2"
                                required
                            />
                            <input
                                onChange={updateAnswers(question.id, 2)}
                                type="text"
                                name="variant3"
                                placeholder="Варіант 3"
                                required
                            />
                            <input
                                onChange={updateAnswers(question.id, 3)}
                                type="text"
                                name="variant4"
                                placeholder="Варіант 4"
                                required
                            />
                            <label htmlFor="answer">
                                Оберіть правильну відповідь
                            </label>
                            <select
                                onChange={handleAnswerSelect(question.id)}
                                name="answer"
                            >
                                <option></option>
                                <option value={0}>1</option>
                                <option value={1}>2</option>
                                <option value={2}>3</option>
                                <option value={3}>4</option>
                            </select>
                            <button
                                type="button"
                                onClick={() => {
                                    setQuestions((prev) =>
                                        prev.filter(
                                            (item) => item.id !== question.id
                                        )
                                    )
                                    setFormData((prev) => {
                                        const newData = {...prev}
                                        delete newData.questions[question.id]
                                        return newData
                                    })
                                }}
                            >
                                Видалити
                            </button>
                        </div>
                    ))}
                    <button type="submit" id={'test-created'}>
                        Завершити створення
                    </button>
                </div>
            </form>
            <button id={'add-task'}
                    onClick={() => {
                        setQuestions((prev) => [...prev, {id: prev.length}])
                    }}
            >
                Додати питання
            </button>
        </section>
    )
}

export default CreateTestPage
