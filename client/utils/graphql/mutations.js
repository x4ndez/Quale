import { gql } from '@apollo/client'

export const ADD_USER = gql`
mutation Mutation($username: String!, $password: String!, $email: String!) {
  addUser(username: $username, password: $password, email: $email) {
    _id
    username
    email
  }
}
  `;

export const LOGIN = gql`
mutation Mutation($username: String!, $password: String!) {
  login(username: $username, password: $password) {
    token
    user {
      _id
      username
      email
      activateCode
      accountActivated
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

export const ADD_FRIEND_REQUEST = gql`
mutation Mutation($userId: ID!, $friendId: ID!) {
  addFriendRequest(userId: $userId, friendId: $friendId) {
    _id
    username
    friendRequests {
      _id
      username
    }
    friends {
      _id
      username
    }
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

export const USERNAME_EXISTS = gql`
mutation Mutation($username: String!) {
  usernameExists(username: $username)
}
`;

export const EMAIL_EXISTS = gql`
mutation EmailExists($email: String!) {
  emailExists(email: $email)
}
`;


export const ACTIVATE_VERIFY = gql`
mutation Mutation($userId: ID!) {
  activateVerify(userId: $userId) {
    _id
    username
    activateCode
    accountActivated
    email
  }
}
`;

export const ACCOUNT_ACTIVATE = gql`
mutation Mutation($userId: ID!, $activateCode: String!) {
  activateAccount(userId: $userId, activateCode: $activateCode)
}
`;

