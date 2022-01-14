import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      book [book]
    }
  }
`;


export const QUERY_BOOK = gql`
  query book {
    book {
      _id
      authors
      description
      bookId
      image
      link
      title
    }
  }
`;
