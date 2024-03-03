import { useState } from 'react'

const CreateTestPage = () => {
    const [formData, setFormData] = useState({ questions: [] })
    const [questions, setQuestions] = useState([])

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
            setFormData(newData)
        })
    }

    console.log(formData.questions)

    return (
        <div>
            <form>
                <input
                    onChange={handleFormChange}
                    name="name"
                    type="text"
                    placeholder="Назва тесту"
                />
                <textarea
                    onChange={handleFormChange}
                    name="description"
                    placeholder="Опис тесту"
                />
                <input
                    onChange={handleFormChange}
                    name="test_time"
                    placeholder="Час на виконання"
                    type="number"
                />
                <input
                    onChange={handleFormChange}
                    name="max_mark"
                    placeholder="Максимальний бал"
                    type="number"
                />
            </form>

            <button
                onClick={() => {
                    setQuestions((prev) => [...prev, { id: prev.length }])
                }}
            >
                Додати питання
            </button>

            {questions.map((question) => (
                <div key={question.id} id={question.id}>
                    <input
                        onChange={updateForm(question.id)}
                        required
                        name={`question`}
                        type="text"
                        placeholder="Текст запитання"
                    />
                    <input
                        onChange={updateForm(question.id)}
                        required
                        name={`mark`}
                        type="number"
                        placeholder="Оцінка"
                    />
                    <button
                        type="button"
                        onClick={() => {
                            setQuestions((prev) =>
                                prev.filter((item) => item.id !== question.id)
                            )
                        }}
                    >
                        Видалити
                    </button>
                </div>
            ))}
        </div>
    )
}

export default CreateTestPage
