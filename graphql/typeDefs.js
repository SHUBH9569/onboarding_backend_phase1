import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Book {
    id: ID!
    title: String!
    description: String
    published_date: String
    author: Author
    metadata: Metadata
  }

  type Author {
    id: ID!
    name: String!
    biography: String
    born_date: String
    books: [Book]
  }

  type Review {
    user: String
    comment: String
    rating: Int
  }

  type Metadata {
    reviews: [Review]
    avgRating: Float
  }

  type Query {
    books(page: Int, limit: Int, title: String): [Book]
    authors(page: Int, limit: Int, name: String): [Author]
  }

  type Mutation {
    createAuthor(name: String!, biography: String, born_date: String): Author
    updateAuthor(id: ID!, name: String): Author
    deleteAuthor(id: ID!): Boolean

    createBook(
  title: String!
  description: String
  published_date: String
  author_id: ID!
): Book
    updateBook(
  id: ID!
  title: String
  description: String
  published_date: String
): Book
    deleteBook(id: ID!): Boolean


    addReview(bookId: ID!, user: String!, comment: String, rating: Int!): Metadata

  }
`;