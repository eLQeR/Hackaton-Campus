import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    resetError,
    setAccessToken,
    setUserFailure,
    setUserStart,
    setUserSuccess,
    signInFailure,
    signInStart,
    signInSuccess,
} from '../redux/userSlice/userSlice'
import Loader from '../utils/Loader'
import useAxiosPrivate from '../hooks/useAxiosPrivate.js'
import axios, { axiosPrivate } from '../api/axios.js'
import { useNavigate } from 'react-router'

const SignIn = () => {
    const [formData, setFormData] = useState({})
    const { loading, error } = useSelector((state) => state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(resetError())
    }, [formData, dispatch])

    const handleFormSubmit = async (e) => {
        e.preventDefault()
        dispatch(signInStart())

        try {
            const resAuth = await axios.post(
                '/token/',
                JSON.stringify(formData),
                {
                    headers: { 'Content-Type': 'application/json' },
                }
            )

            const res = await axios.get('/me/', {
                withCredentials: true,
                headers: { Authorization: `Bearer ${resAuth.data.access}` },
            })

            dispatch(signInSuccess({ ...resAuth.data, user: res.data }))
            navigate('/profile')
        } catch (error) {
            dispatch(signInFailure(error))
        }
    }

    const handleInputChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    if (loading) return <Loader />

    return (
        <section>
            <form onSubmit={handleFormSubmit} id={"login-form"}>
                <h2>Увійти</h2>
                <div className={'form-input'}>
                    <label htmlFor="username">Логін</label>
                    <input
                        onChange={handleInputChange}
                        name="username"
                        type="text"
                        placeholder="Введіть логін"
                    />
                </div>
                <div className={'form-input'}>
                    <label htmlFor="password">Пароль</label>
                    <input
                        onChange={handleInputChange}
                        name="password"
                        type="password"
                        placeholder="Введіть пароль"
                    />
                </div>

                <button type="submit">Увійти</button>
            </form>
            {error && <p>Error occured</p>}
        </section>
    )
}

export default SignIn
