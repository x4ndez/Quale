import { gql } from '@apollo/client'

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

