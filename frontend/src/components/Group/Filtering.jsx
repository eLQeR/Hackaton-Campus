import { func } from 'prop-types'

const Filtering = ({ setFilters }) => {
    const handleFilterChange = (e) => {
        setFilters((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    return (
        <div className={'filter-style'}>
            <div>
                <select name="form_of_studying" onChange={handleFilterChange}>
                    <option value={''}>Усі</option>
                    <option value={'Денна'}>Денна</option>
                    <option value={'Заочна'}>Заочна</option>
                </select>
            </div>
        </div>
    )
}

Filtering.propTypes = {
    setFilters: func,
}

export default Filtering
