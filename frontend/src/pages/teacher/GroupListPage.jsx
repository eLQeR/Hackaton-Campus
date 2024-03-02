import { useState } from 'react'
import GroupList from '../../components/Group/GroupList'
import Filtering from '../../components/Group/Filtering'

const GroupListPage = () => {
    const [filters, setFilters] = useState({})

    return (
        <section>
            <div className={'filter-block'}>
                <Filtering setFilters={setFilters}/>
            </div>
            <div className={"table"}>
                <div className={"groups-table-head"}>
                    <div className={"element element-border left-side"}><p>Група</p></div>
                    <div className={"element element-border"}><p>Вчений ступінь</p></div>
                    <div className={"element element-border"}><p>Форма навчання</p></div>
                    <div className={"element element-border right-side"}><p>Курс</p></div>
                </div>
                <GroupList filters={filters}/>
            </div>
        </section>
    )
}

export default GroupListPage
