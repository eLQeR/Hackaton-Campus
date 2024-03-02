import { useSelector } from 'react-redux'
import axios from '../api/axios'
import { setToken } from '../utils/accessToken'

const useRefreshToken = () => {
    const refreshToken = useSelector((state) => state.user.refreshToken)

    const refresh = async () => {
        try {
            const res = await axios.post(
                '/token/refresh/',
                JSON.stringify({ refresh: refreshToken }),
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true,
                }
            )

            setToken(res.data.access)
            return res.data.access
        } catch (error) {
            console.log(error)
        }
    }

    return refresh
}

export default useRefreshToken
