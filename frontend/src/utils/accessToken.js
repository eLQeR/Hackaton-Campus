const accessToken = () => {
    let token

    const getToken = () => {
        return token
    }

    const setToken = (value) => {
        token = value
    }

    return { getToken, setToken }
}

export const { setToken, getToken } = accessToken()
