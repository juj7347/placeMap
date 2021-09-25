import { useEffect, useContext} from "react"
import { ParentContext } from "../../../context/placeContext/ParentProvider"


let mapContainer
let markers = []

function removeMarker() {
    for(var i = 0; i < markers.length; ++i) {
        const marker = markers[i]
        marker.setMap(null)
    }
    markers = []
}

function addMarker(place, index, panelDispatch) {
    const {naver} = window

    var marker = new naver.maps.Marker({
        position: {lat: place.lat, lng: place.lng}

    })
    
    naver.maps.Event.addListener(marker,"click", (e) => {
        
        panelDispatch({
            type: "MOVE",
            index: index
        })
        panelDispatch({
            type: "SHOW"
        })
        panelDispatch({
            type: "HIDELIST"
        })
    })
    
    markers.push(marker)
}

function updateMarkers(bounds) {

    var position
    for(var i = 0; i < markers.length; ++i) {
        const marker = markers[i]
        position = marker.getPosition()
        if(bounds.hasLatLng(position)) {
            marker.setMap(mapContainer)
        }
        else {
            marker.setMap(null)
        }
    }
}

const Marker = ({map, bounds}) => {

    const {panelDispatch, placeState} = useContext(ParentContext)

    if(map) {
        mapContainer = map
    }
    useEffect(() => {
        removeMarker()
        if(placeState.filteredPlace) {
            markers=[]
            placeState.filteredPlace?.map((place,i) => {
                addMarker(place, i, panelDispatch)
            })
        }
    },[placeState.filteredPlace])
    

    useEffect(() => {
        if(mapContainer && bounds)
            updateMarkers(bounds)
    },[bounds, placeState.filteredPlace])

    return null

}


export default Marker

