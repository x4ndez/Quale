import './Header.css'
import Title from './Title'
import Nav from './Nav'

function Header(props) {

    return (
        <>
            <header>

                <Title />
                <Nav
                    modalActive={props.modalActive}
                    setModalActive={props.setModalActive}
                    modalContent={props.modalContent}
                    setModalContent={props.setModalContent}
                />

            </header>
        </>
    )
}

export default Header
