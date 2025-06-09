import { Link } from 'react-router-dom'

const Navigation = () => {
    return (
        <nav className='flex space-x-6'>
            <Link to='/'>Home</Link>
            <Link to='/explore'>Explore</Link>
            <Link to='/collection'>My Collection</Link>
        </nav>
    )
}

export default Navigation