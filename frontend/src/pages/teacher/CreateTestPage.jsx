import { useState } from 'react'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'
import { useDispatch } from 'react-redux'
import {
    setError,
    startLoading,
    stopLoading,
} from '../../redux/loadingSlice/loadingSlice'

const CreateTestPage = () => {
    const [formData, setFormData] = useState({ questions: {} })
    const [questions, setQuestions] = useState([])
    const axiosPrivate = useAxiosPrivate()
    const dispatch = useDispatch()

    const handleFormChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const updateForm = (id) => (e) => {
        setFormData((prev) => {
            const newData = { ...prev }
            newData.questions[id] = {
                ...newData.questions[id],
                [e.target.name]: e.target.value,
            }
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
                if (!answer) answer = { is_correct: false }
                if (i === e.target.value) answer.is_correct = true
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
        console.log(formData)
    }

    return (
        <div>
            <button
                onClick={() => {
                    setQuestions((prev) => [...prev, { id: prev.length }])
                }}
            >
                Додати питання
            </button>
            <form>
                <input
                    onChange={handleFormChange}
                    name="name"
                    type="text"
                    placeholder="Назва тесту"
                    required
                />
                <textarea
                    onChange={handleFormChange}
                    name="description"
                    placeholder="Опис тесту"
                    required
                />
                <input
                    onChange={handleFormChange}
                    name="test_time"
                    placeholder="Час на виконання"
                    type="number"
                    required
                />
                <input
                    onChange={handleFormChange}
                    name="max_mark"
                    placeholder="Максимальний бал"
                    type="number"
                    required
                />
                {questions.map((question) => (
                    <div key={question.id} id={question.id}>
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
                                    const newData = { ...prev }
                                    delete newData.questions[question.id]
                                    return newData
                                })
                            }}
                        >
                            Видалити
                        </button>
                    </div>
                ))}
                <button type="button" onClick={submit}>
                    submit
                </button>
            </form>
        </div>
    )
}

export default CreateTestPage
