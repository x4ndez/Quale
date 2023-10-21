import './App.css'
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache
} from '@apollo/client'
import { Outlet } from 'react-router-dom'

const client = new ApolloClient({
  uri: '/setup/graphql',
  cache: new InMemoryCache(),
});

function App() {

  return (

    <ApolloProvider client={client}>

      <Outlet />

    </ApolloProvider>

  )
}

export default App
