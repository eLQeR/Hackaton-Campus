import { useParams } from 'react-router'
import Testing from '../../components/Test/Testing'

const TestingPage = () => {
    const { test_id } = useParams()

    return (
        <section>
            <Testing test_id={test_id} />
        </section>
    )
}

export default TestingPage
