import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { signInStart, signInSuccess } from '../redux/userSlice/userSlice'
import Loader from '../utils/Loader'

const SignIn = () => {
    const [formData, setFormData] = useState({})
    const { loading, error } = useSelector((state) => state.user)
    const dispatch = useDispatch()

    const handleFormSubmit = async (e) => {
        e.preventDefault()
        dispatch(signInStart())
        setTimeout(() => dispatch(signInSuccess()), 5000)
    }

    const handleInputChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    if (loading) return <Loader />

    return (
        <section>
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
            {error && <p>Error occured</p>}
        </section>
    )
}

export default SignIn
