import { useState } from 'react'
import GroupList from '../../components/Group/GroupList'
import Filtering from '../../components/Group/Filtering'

const GroupListPage = () => {
    const [filters, setFilters] = useState({})

    return (
        <section>
            <Filtering setFilters={setFilters}/>
            <div id={"groups-table"}>
                <div className={"groups-table-head"}>
                    <div className={"element left-side"}><p>Група</p></div>
                    <div className={"element"}><p>Вчений ступінь</p></div>
                    <div className={"element"}><p>Форма навчання</p></div>
                    <div className={"element right-side"}><p>Курс</p></div>
                </div>
                <GroupList filters={filters}/>
            </div>
        </section>
    )
}

export default GroupListPage
