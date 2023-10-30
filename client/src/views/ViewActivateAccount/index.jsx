import { useMutation } from "@apollo/client"
import { useNavigate, useParams, useOutletContext } from "react-router-dom";
import { useState, useEffect } from 'react'
import { ACTIVATE_VERIFY, ACCOUNT_ACTIVATE, LOGIN } from "../../../utils/graphql/mutations"

function ViewAccountActivate(props) {

    const [
        modalActive, setModalActive,
        modalContent, setModalContent
    ] = useOutletContext();

    const [isActivated, setIsActivated] = useState();
    const [activateCodeVal, setActivateCodeVal] = useState('');
    const [activateVerify, { data: activateVerifyData }] = useMutation(ACTIVATE_VERIFY);
    const [activateAccount, { data: activateAccountData }] = useMutation(ACCOUNT_ACTIVATE);
    const { userId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        activateVerify({
            variables: {
                userId: userId,
            }
        });
    }, []);

    useEffect(() => {

        if (!activateAccountData) return;

        console.log(activateAccountData);

        if (activateAccountData.activateAccount === true) {
            console.log('account activated');
            setIsActivated(true)
            setModalActive(1);
            setModalContent({ type: 'Login' })
            navigate('/');
        } else {
            console.log('account not activated');
            setIsActivated(false);
        }

    }, [activateAccountData]);

    const handleFormInput = (e) => {

        const { name, value } = e.target;
        if (name === 'activateCode') return setActivateCodeVal(value);

    }

    const handleFormSubmit = (e) => {

        e.preventDefault();

        activateAccount({
            variables: {
                userId: userId,
                activateCode: activateCodeVal,
            }
        })

    }

    return (
        <>

            {activateVerifyData
                ? (<>
                    <h2>Activate your account!</h2>
                    <form onSubmit={handleFormSubmit}>

                        <label htmlFor='activateCode'>Activation Code: </label>
                        <input type='text'
                            name='activateCode'
                            value={activateCodeVal}
                            onChange={handleFormInput}
                        />
                        <input type='submit' value='Submit' />

                    </form>
                </>)
                : 'Loading...'}

            {/* <h2>Activate your account!</h2>
            <form>

                <label htmlFor='activateCode'>Activation Code: </label>
                <input type='text'
                    name='activateCode'
                />
                <input type='submit' value='Submit' />

            </form> */}
        </>
    )
}

export default ViewAccountActivate
