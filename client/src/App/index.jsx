import './App.css'
import { useState, useEffect } from 'react'
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { Outlet } from 'react-router-dom'
import { socket } from '../config/socket'

import Header from '../components/Header'
import Modal from '../components/Modal'
import ViewDashboard from '../views/ViewDashboard'

const httpLink = createHttpLink({
  uri: '/setup/graphql',
});

const authLink = setContext((_, { headers }) => {

  const token = localStorage.getItem('id_token');

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    }
  }

});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {


  const [modalActive, setModalActive] = useState(false);
  const [modalContent, setModalContent] = useState({ type: '', feedback: {} });

  

  return (

    <ApolloProvider client={client}>

      <Modal
        modalActive={modalActive}
        setModalActive={setModalActive}
        modalContent={modalContent}
        setModalContent={setModalContent}
      />

      <Header
        modalActive={modalActive}
        setModalActive={setModalActive}
        modalContent={modalContent}
        setModalContent={setModalContent}
      />

        <Outlet
          context={
            [modalActive, setModalActive, modalContent, setModalContent]
          }
        />

    </ApolloProvider>

  )
}

export default App
