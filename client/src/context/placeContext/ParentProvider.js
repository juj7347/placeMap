import { useQuery } from "@apollo/client";
import { GET_BOOKMARKLIST, GET_ALL_PLACE } from "../../GraphQL/graphql-types";
import GetBookmarks from "./getBookmarks";

import { makeStyles, Paper } from "@material-ui/core";

import { createContext, useReducer, useEffect } from "react";
import PlaceList from "../../component/List";

const useStyles = makeStyles((theme) => ({
    container: {
        position: 'fixed',
        zIndex: 100,
        width: '100vw',
        bottom: '20px'
    },
}));

///paneldata
function panelReducer(state, action) {
    switch (action.type) {
        case "MOVE":
            return {
                ...state,
                selected: action.index
            }

        case "SHOW":
            return {
                ...state,
                visible: true
            }

        case "HIDE":
            return {
                ...state,
                visible: false
            }

        case "SWIPE":
            return {
                ...state,
                swiped: !state.swiped
            }

        case "SHOWMORE":
            return {
                ...state,
                visible_more: true
            }

        case "HIDEMORE":
            return {
                ...state,
                visible_more: false
            }

        case "SHOWLIST":
            return {
                ...state,
                visible_list: true
            }
        
        case "HIDELIST":
            return {
                ...state,
                visible_list: false
            }
    
        default:
            break;
    }
}


const initPanel = {
    selected: -1,
    swiped: false,
    visible: false,
    visible_more: false,
    visible_list: false
}
///////


/////placedata

function placeReducer(state,action) {
    switch (action.type) {
        case "PLACE":
            return {
                ...state,
                placeData: state.placeData.concat(action.place)
            }
            
        case "FILTERED_PLACE":
            return {
                ...state,
                filteredPlace: action.filteredPlace
            }

        case "SELECTED_PLACE":
            return {
                ...state,
                selectedPlace: action.selectedPlace
            }

        case "HIDE_PLACE":
            const deletedArr = state.placeData
            const toDelete = deletedArr.find(element => element.name === action.name)
            const index = deletedArr.indexOf(toDelete)
            if(index > -1) {
                deletedArr.splice(index,1)
                return {
                    ...state,
                    placeData: deletedArr
                }
            }
            else 
                break;
        default:
            break;
    }
}

const initPlaceState = {
    placeData: [],
    filteredPlace: null,
    selectedPlace: [],
    myPos: {lat:37.5537596361069, lng:127.02137732693554}
}

/////
const ParentContext = createContext()

const ParentProvider = ({children}) => {

    const classes = useStyles()

    const { data } = useQuery(GET_BOOKMARKLIST, {variables: {objectID: "61222178acc7724c70ea5c7d"}})

    const [placeState, placeDispatch] = useReducer(placeReducer, initPlaceState)
    const [panelState, panelDispatch] = useReducer(panelReducer, initPanel)


    useEffect(() => {
        if(placeState.placeData) {
            let newFiltered = []
            placeState.placeData.map(placeList => {
                const {array} = placeList
                array.map(place => {
                    let found = false
                    for(var i = 0; i < newFiltered.length; ++i) {
                        if(newFiltered[i].name === place.name) {
                            found = true
                            break;
                        }
                    }
                    
                    if(!found) {
                        newFiltered.push(place)
                    }
                    
                })


            })
            placeDispatch({
                type: "SELECTED_PLACE",
                selectedPlace: newFiltered
            })
            placeDispatch({
                type: "FILTERED_PLACE",
                filteredPlace: newFiltered
            })
        }
    },[placeState.placeData.length])


    return (
        <ParentContext.Provider value={{placeState, placeDispatch, panelState, panelDispatch}}>
            <div className={classes.container}>
                <PlaceList>
                    <Paper>
                        {data?.getBookmarkList.map(
                            bookmarkList => bookmarkList.bookmarks.map(
                                bookmark => <GetBookmarks bookmarkID={bookmark}/>
                            )
                        )} 
                    </Paper>                   
                </PlaceList>

            </div>
            {children}
            
        </ParentContext.Provider>
    )

}


export {ParentContext}
export default ParentProvider