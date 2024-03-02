import { useState } from 'react'

const SignIn = () => {
    const [formData, setFormData] = useState({})

    const handleFormSubmit = (e) => {
        e.preventDefault()

        console.log(formData)
    }

    const handleInputChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    return (
        <div>
            <form onSubmit={handleFormSubmit}>
                <input
                    onChange={handleInputChange}
                    name="login"
                    type="text"
                    placeholder="Логін"
                />
                <input
                    onChange={handleInputChange}
                    name="password"
                    type="password"
                    placeholder="Пароль"
                />
                <button type="submit">Увійти</button>
            </form>
        </div>
    )
}

export default SignIn
