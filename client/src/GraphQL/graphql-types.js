import { gql } from '@apollo/client';

export const GET_ALL_PLACE = gql`
    query getAllPlace {
        getAllPlace {
            name
            address
            lat
            lng
            reviewCount
            url
            thumbnail
            category
            tel
        }
    }
`

export const GET_BOOKMARKLIST = gql`
    query getBookmarkList($objectID: String!){
        getBookmarkList(objectID: $objectID) {
            id
            bookmarks
            objectID
        }
    }
`

export const GET_BOOKMARK = gql`
    query getBookmark($objectID: String!){
        getBookmark(objectID: $objectID) {
            id
            name
            placeIDs
        }
    }
`

export const GET_PLACES = gql`
    query getPlaces($placeID: [String]){
        getPlace(placeID: $placeID){
            name
            address
            lat
            lng
            reviewCount
            url
            thumbnail
            category
            tel
            placeID
        }
    }
`

export const ASK_QUESTION = gql`
    mutation placeQ($placeQnAInput: PlaceQnAInput!) {
        placeQ(placeID: $placeQnAInput) {
            id
            placeID
            authorName
            body
        }
    }
`