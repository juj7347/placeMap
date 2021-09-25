import { useQuery } from "@apollo/client";
import { useContext, useState } from "react";
import { ParentContext } from "./ParentProvider";
import { GET_PLACES } from "../../GraphQL/graphql-types";
import { FormControlLabel,Checkbox } from "@material-ui/core";

function PlaceData({placeIDs, bookmarkName}) {
    const [checked, setChecked] = useState(false)
    const {placeDispatch} = useContext(ParentContext)
    const {data} = useQuery(GET_PLACES,{variables: {placeID: placeIDs}})
    const placeList = data?.getPlace

  

    const handleClick = (e) => {
        if(!checked) {

            placeDispatch({
                type: "PLACE",
                place: [{name: bookmarkName, array: placeList}]
            })
        }
        else {
            placeDispatch({
                type: "HIDE_PLACE",
                name: bookmarkName
            })
        }
        setChecked(!checked)

        
    }

    return (
        <FormControlLabel 
            control={<Checkbox
                        checked={checked}
                        onChange={handleClick}
                    />}
            label={bookmarkName}
        />


    )
    

}

export default PlaceData