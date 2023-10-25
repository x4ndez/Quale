import './Convo.css'
import { useState, useEffect } from 'react'
import { useQuery } from "@apollo/client"
import { GET_CONVO } from "../../../../utils/graphql/queries"

function Convo(props) {

    const { data, loading, error } = useQuery(GET_CONVO, {
        variables: {
            convoId: props.modalContent.feedback.convoId,
        }
    });

    useEffect(() => {
        console.log(data);
    }, [data]);

    return (

        <>

            {data ? (

                <>

                    <div className='convo-container'>

                        <h1>{data.convoById.roomName}</h1>

                        <div className='convo-main'>

                            {data.convoById.comments.length ? 'comments' : 'Start the conversation!'}

                        </div>

                        <form className='convo-input'>

                            <input
                                type='text'
                            />
                            <input
                                type='submit'
                                value='Send'
                            />

                        </form>

                    </div>

                </>

            ) : 'Loading...'}

        </>
    )
}

export default Convo