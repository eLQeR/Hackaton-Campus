import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    signInFailure,
    signInStart,
    signInSuccess,
} from '../redux/userSlice/userSlice'
import Loader from '../utils/Loader'
import axios from '../api/axios'

const SignIn = () => {
    const [formData, setFormData] = useState({})
    const { loading, error } = useSelector((state) => state.user)
    const dispatch = useDispatch()

    const handleFormSubmit = async (e) => {
        e.preventDefault()
        dispatch(signInStart())

        try {
            console.log(formData)
            const res = await axios.post('/token/', JSON.stringify(formData), {
                headers: { 'Content-Type': 'application/json' },
            })

            console.log(res)

            dispatch(signInSuccess(res.data))
        } catch (error) {
            console.log(error)
            dispatch(signInFailure(error))
        }
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
                    name="username"
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
