const gql = require('graphql-tag')

const typeDefs = gql`
    type Post{
        id: ID!
        body: String

    }

    type User {
        id: ID!
        email: String!
        token: String!
        username: String!
        createdAt: String!
    }

    type BookmarkList{
        id: ID!
        objectID: String
        bookmarks: [String]
    }

    type Bookmark{
        id: ID!
        placeIDs: [String]!
        name: String
    }

    input RegisterInput {
        username: String!
        password: String!
        confirmPassword: String!
        email: String!
    }

    input PlaceQnAInput {
        placeID: String
        authorID: String
        authorName: String
        body: String
    }

    type place{
        id: ID
        placeID: String
        name: String,
        category: [String],
        lat: Float,
        lng: Float,
        address: String,
        thumbnail: String,
        url: String,
        reviewCount: Int,
        tel: String
 
    }

    type QnA{
        id: ID
        placeID: String
        authorID: String
        authorName: String
        body: String
    }

    type Query {
        getPosts: [Post]
        getUser: [User]
        getPlace(placeID: [String]): [place]
        getAllPlace: [place]
        getBookmarkList(objectID: String): [BookmarkList]!
        getBookmark(objectID: String): [Bookmark]!
    }

    type Mutation {
        register(registerInput: RegisterInput): User!
        login(username: String! password: String!) : User!
        placeQ(placeQnAInput: PlaceQnAInput): QnA!
        placeAns(placeQnAInput: PlaceQnAInput): QnA!
    }

`




module.exports = typeDefs