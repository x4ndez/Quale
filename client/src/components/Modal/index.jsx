import './Modal.css'

import CreateRoom from './CreateRoom'
import Convo from './Convo'
import Login from './Login'
import Signup from './Signup'

function Modal(props) {

    const handleModalContent = () => {

        if (props.modalContent.type === 'CreateRoom') return <CreateRoom {...props} />;
        if (props.modalContent.type === 'Convo') return <Convo {...props} />;
        if (props.modalContent.type === 'Login') return <Login {...props} />;
        if (props.modalContent.type === 'Signup') return <Signup {...props} />;
        return '';

    }

    return (
        <>

            <div id='modal' className={props.modalActive ? 'modal-active' : 'modal-inactive'}>

                <div id='modal-blockout' className='flex-center-vh'>

                    <div id='modal-container' className='flex-center-vh'>

                        <div id='modal-exit' className='clickable' onClick={() => {
                            props.setModalActive(false);
                            props.setModalContent('');
                        }}>X</div>

                        {handleModalContent()}


                    </div>

                </div>

            </div>

        </>
    )
}

export default Modal
