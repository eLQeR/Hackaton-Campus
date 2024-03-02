import { useState } from 'react'
import GroupList from '../../components/Group/GroupList'
import Filtering from '../../components/Group/Filtering'

const GroupListPage = () => {
    const [filters, setFilters] = useState({})

    return (
        <section>
            <Filtering setFilters={setFilters} />
            <GroupList filters={filters} />
        </section>
    )
}

export default GroupListPage
