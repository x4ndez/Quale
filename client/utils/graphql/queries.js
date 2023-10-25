import { gql } from '@apollo/client'

export const GET_RECENT_CONVOS = gql`
query convosRecent {
    convosRecent {
      _id
      roomName
      createdBy
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