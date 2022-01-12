const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID!
        username: String!
        email: String!
        password: String!
    }

    type Book {
        authors: String!
        description: String!
        bookId: String!
        image: String!
        link: String!
        title: String!
    }

    type Query {
        user: [User]
        book: [Book]
    }
`;

module.exports = typeDefs;