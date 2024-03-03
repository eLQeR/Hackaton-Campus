import { useSelector } from 'react-redux'
import TestList from '../../components/Test/TestList'

const TestsPage = () => {
    const { user } = useSelector((state) => state.user)

    return (
        <section>
            <TestList query={{ group: user?.group }} />
        </section>
    )
}

export default TestsPage
