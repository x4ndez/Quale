import './Header.css'
import Title from './Title'
import Nav from './Nav'

function Header(props) {
    
    return (
        <>
            <Title
                modalActive={props.modalActive}
                setModalActive={props.setModalActive}
                modalContent={props.modalContent}
                setModalContent={props.setModalContent}
            />
            <Nav
                modalActive={props.modalActive}
                setModalActive={props.setModalActive}
                modalContent={props.modalContent}
                setModalContent={props.setModalContent}
            />
        </>
    )
}

export default Header
