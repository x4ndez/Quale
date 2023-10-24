import { Link } from 'react-router-dom'

function Nav(props) {

    return (
        <>
            <nav>

                <a onClick={() => {
                    props.setModalActive(1);
                    props.setModalContent('Login');
                }}>Login</a> /
                <a onClick={() => {
                    props.setModalActive(1);
                    props.setModalContent('Signup');
                }}>Signup</a> /
                <Link to='/dashboard'>Dashboard</Link>

            </nav>
        </>
    )
}

export default Nav
