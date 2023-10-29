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
      createdBy {
        _id
      }
    }
  }
  `;

export const ADD_COMMENT = gql`
  mutation ADD_COMMENT($convoId: ID!, $commentContent: String!, $createdBy: ID!) {
    addCommentToConvo(convoId: $convoId, commentContent: $commentContent, createdBy: $createdBy) {
      _id
      roomName
      comments {
        _id
        comment
        createdAt
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

export const UPDATE_INFO = gql`
mutation UpdateInfoById($userId: ID!, $name: String!, $phone: String!, $city: String!, $country: String!) {
  updateInfoById(userId: $userId, name: $name, phone: $phone, city: $city, country: $country) {
    _id
    username
    info {
      name
      phone
      city
      country
    }
  }
}
  `;

export const UPDATE_INTERESTS = gql`
  mutation UpdateInterestsById($userId: ID!, $interests: [String]) {
    updateInterestsById(userId: $userId, interests: $interests) {
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

export const ADD_FRIEND = gql`
  mutation AddFriend($userId: ID!, $friendId: ID!) {
    addFriend(userId: $userId, friendId: $friendId) {
      _id
      username
    }
  }
  `;

  export const REMOVE_FRIEND = gql`
  mutation RemoveFriend($userId: ID!, $friendId: ID!) {
    removeFriend(userId: $userId, friendId: $friendId) {
      _id
      username
    }
  }
  `;

export const START_PRIVATE_CONVO = gql`
  mutation Mutation($userId: ID!, $friendId: ID!) {
    startPrivateConvo(userId: $userId, friendId: $friendId) {
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
      _id
    }
  }
  `;

export const CHECK_PRIVATE_CONVO = gql`
  mutation CheckForPrivateConvo($userId: ID!, $friendId: ID!) {
    checkForPrivateConvo(userId: $userId, friendId: $friendId)
  }
  `;

export const INITIATE_PRIVATE_CONVO = gql`
mutation InitiatePrivateConvo($userId: ID!, $friendId: ID!) {
  initiatePrivateConvo(userId: $userId, friendId: $friendId) {
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

export const ADD_COMMENT_PRIVATE_CONVO = gql`
mutation AddCommentToPrivateConvo($convoId: ID!, $commentContent: String, $createdBy: ID!) {
  addCommentToPrivateConvo(convoId: $convoId, commentContent: $commentContent, createdBy: $createdBy) {
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


