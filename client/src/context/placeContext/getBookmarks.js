import { useQuery } from "@apollo/client";
import { GET_BOOKMARK } from "../../GraphQL/graphql-types";
import PlaceData from "./placedata";


function GetBookmarks ({bookmarkID}) {
    const {data} = useQuery(GET_BOOKMARK,{variables: {objectID: bookmarkID}})

    return (
        <div>
            {data?.getBookmark.map(
                (bookmark,index) => 
                    <PlaceData placeIDs={bookmark.placeIDs} bookmarkName={bookmark.name}/>
            )}
        </div>
    )

}

export default GetBookmarks