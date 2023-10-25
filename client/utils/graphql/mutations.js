import { gql } from '@apollo/client'

export const ADD_USER = gql`
mutation ADD_USER($username: String!, $password: String!, $email: String!) {
  addUser(username: $username, password: $password, email: $email) {
    token
    user {
      _id
      username
      email
    }
  }
}
  `;

export const LOGIN = gql`
mutation Login($username: String!, $password: String!) {
  login(username: $username, password: $password) {
    token
    user {
      _id
      username
      email
    }
  }
}
  `;

export const ADD_CONVO = gql`
  mutation AddConvo($roomName: String!, $createdBy: ID!) {
    addConvo(roomName: $roomName, createdBy: $createdBy) {
      roomName
      createdBy
    }
  }
  `;




