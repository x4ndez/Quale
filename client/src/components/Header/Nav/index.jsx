import { Link } from 'react-router-dom'

function Nav(props) {

    return (
        <>
            <nav>

                <a onClick={() => {
                    props.setModalActive(1);
                    props.setModalContent({ type: 'Login' });
                }}>Login</a> /
                <a onClick={() => {
                    props.setModalActive(1);
                    props.setModalContent({ type: 'Signup' });
                }}>Signup</a> /
                <Link to='/dashboard'>Dashboard</Link> / 
                <Link to='/account'>Account</Link>

            </nav>
        </>
    )
}

export default Nav
