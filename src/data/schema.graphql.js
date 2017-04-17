const schema = `
  type User {
    id: ID! # the ! means that every author object _must_ have an id
    name: String
    email: String
    posts: [Post]
  }

  type Post {
    id: ID!
    message: String
    likes: Int
  }

  # the schema allows the following query:
  type Query {
    allPosts: [Post]
    me: User
  }

  # this schema allows the following mutation:
  type Mutation {
    createPost (
      message: String!
    ): Post
    updatePost (
      postId: ID!,
      message: String!
    ): Post
    deletePost (
      postId: ID!
    ): Post
    login (
      fbAccessToken: String!
    ): User
  }

  # we need to tell the server which types represent the root query
  # and root mutation types. We call them RootQuery and RootMutation by convention.
  schema {
    query: Query
    mutation: Mutation
  }
`

export default schema;
