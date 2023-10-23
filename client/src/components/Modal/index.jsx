import './Modal.css'

import CreateRoom from './CreateRoom'
import Convo from './Convo'

function Modal(props) {

    const handleModalContent = () => {

        if (props.modalContent === 'CreateRoom') return <CreateRoom {...props} />;
        if (props.modalContent === 'Convo') return <Convo {...props} />;
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
