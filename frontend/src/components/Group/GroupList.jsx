import { object } from 'prop-types'
import GroupListElement from './GroupListElement'
import { useEffect, useState } from 'react'
import {
    setError,
    startLoading,
    stopLoading,
} from '../../redux/loadingSlice/loadingSlice'
import { useDispatch, useSelector } from 'react-redux'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'
import Loader from '../../utils/Loader'

const GroupList = ({ filters }) => {
    const [groups, setGroups] = useState([])
    const { loading } = useSelector((state) => state.loading)
    const dispatch = useDispatch()
    const axiosPrivate = useAxiosPrivate()

    useEffect(() => {
        const fetchGroups = async () => {
            dispatch(startLoading())

            let query = '?'
            Object.keys(filters).forEach((filter) => {
                query += `${filter}=${filters[filter]}&`
            })

            try {
                const res = await axiosPrivate.get(`/groups/${query}`)
                setGroups(res.data)
            } catch (error) {
                dispatch(setError(error))
            } finally {
                dispatch(stopLoading())
            }
        }

        fetchGroups()
    }, [dispatch, filters, axiosPrivate])

    if (loading) return <Loader />

    return groups.map((group) => (
        <GroupListElement key={group.id} group={group} />
    ))
}

GroupList.propTypes = {
    filters: object,
}

export default GroupList
