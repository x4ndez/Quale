import './App.css'
import { useState, useEffect } from 'react'
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from '@apollo/client'
import { Outlet } from 'react-router-dom'
import { setContext } from '@apollo/client/link/context'
import { socket } from '../config/socket'

import Header from '../components/Header'
import Modal from '../components/Modal'

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

  const [isConnected, setIsConnected] = useState(socket.connected);
  console.log(socket.connected);

  useEffect(() => {

    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);

    socket.emit('create', 'TheBoiz');
    socket.emit('chat', 'message01');

    socket.on('chat', (socket) => {
      console.log(socket);
    });

    // socket.join('room_01');

    // socket.to('room_01').emit('lolwtf');

    return () => {
      socket.off('connect', onConnect);
      //   socket.off('disconnect', onDisconnect);
    };
  }, []);

  return (

    <ApolloProvider client={client}>

      <Modal />

      <Header />

      <main className='flex-center-h'>
        <Outlet />
      </main>

    </ApolloProvider>

  )
}

export default App
