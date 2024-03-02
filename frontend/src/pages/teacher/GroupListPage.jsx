import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    setError,
    startLoading,
    stopLoading,
} from '../../redux/loadingSlice/loadingSlice'
import { axiosPrivate } from '../../api/axios'
import Loader from '../../utils/Loader'
import GroupList from '../../components/Group/GroupList'

const GroupListPage = () => {
    const [groups, setGroups] = useState([])
    const { loading, error } = useSelector((state) => state.loading)
    const dispatch = useDispatch()

    useEffect(() => {
        const fetchGroups = async () => {
            dispatch(startLoading())

            try {
                const res = await axiosPrivate.get('/groups/')
                setGroups(res.data)
            } catch (error) {
                dispatch(setError(error))
            } finally {
                dispatch(stopLoading())
            }
        }

        fetchGroups()
    }, [dispatch])

    if (loading) return <Loader />

    return (
        <section>
            <GroupList groups={groups} />
        </section>
    )
}

export default GroupListPage
