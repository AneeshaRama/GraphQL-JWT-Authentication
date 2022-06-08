const { gql } = require("apollo-server");

const typeDefs = gql`
  type User {
    _id: ID!
    name: String!
    email: String
    password: String!
  }
  type Query {
    users: User
  }
  type Token {
    token: String
  }
  type Mutation {
    register(name: String!, email: String!, password: String!): User
    login(email: String!, password: String): Token
  }
`;

module.exports = { typeDefs };
