import { gql } from '@apollo/client'

export const GET_USER_INFO = gql`
query Query($userId: ID!) {
  userById(userId: $userId) {
    _id
    username
    info {
      name
      phone
      city
      country
    }
    interests
  }
}
`;

export const GET_USER_DATA = gql`
query UserById($userId: ID!) {
  userById(userId: $userId) {
    _id
    username
    email
    friends {
      _id
      username
    }
    friendRequests {
      _id
      username
    }
    convos {
      _id
      roomName
    }
    friendsCount
    friendsRequestCount
  }
}
`;



export const GET_RECENT_CONVOS = gql`
query convosRecent {
    convosRecent {
      _id
      roomName
      createdBy {
        _id
        username
      }
      createdAt
      comments {
        _id
        comment
        createdBy {
          _id
        }
      }
    }
  }
`;

export const GET_CONVO = gql`
query GET_CONVO($convoId: String!) {
  convoById(convoId: $convoId) {
    _id
    roomName
    comments {
      _id
      comment
      createdBy {
        _id
        username
      }
    }
    createdBy {
      _id
      username
    }
    createdAt
  }
}
`;

export const GET_PRIVATE_CONVO = gql`
query Query($convoId: ID!) {
  getPrivateConvo(convoId: $convoId) {
    _id
    comments {
      _id
      comment
      createdBy {
        _id
        username
      }
      createdAt
    }
    recipients {
      _id
      username
    }
    createdAt
  }
}
`;

