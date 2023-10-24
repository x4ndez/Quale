import { gql } from '@apollo/client'

export const ADD_USER = gql`
mutation AddUser($username: String!, $password: String!, $email: String!) {
    addUser(username: $username, password: $password, email: $email) {
      _id
      username
      password
      email
    }
  }`;