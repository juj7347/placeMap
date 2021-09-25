import { useRef, useState, useEffect, useContext } from "react"
import { ParentContext } from "../../../context/placeContext/ParentProvider"
import Marker from "../Marker"


//material UI
import { useMediaQuery } from '@material-ui/core'

import useStyles from './styles'


function initMap(
    mapContainer,
    setMap,
    setBounds,
    dispatch,
    options
) {
        const {naver} = window
        
        if(!naver || !naver.maps || !mapContainer) return null

        if(!options) {
            options = {
                center: { lat: 37.56374564373636, lng: 127.006631030684},
                zoom: 15,
            }
        }
        const mapInstance = new naver.maps.Map(mapContainer,options)
        
        setBounds(mapInstance.getBounds())
        
        naver.maps.Event.addListener(mapInstance,'idle', (e) => {
            setBounds(mapInstance.getBounds())
        })

        naver.maps.Event.addListener(mapInstance,'click', (e) => {
            dispatch({
                type: "HIDE"
            })
            dispatch({
                type: "HIDELIST"
            })
        })
                
        setMap(mapInstance)

        return mapInstance
}

const Map = () => {

    const classes = useStyles()

    const isMobile = useMediaQuery('(min-width:600px)') //responsive

    const mapContainer = useRef()
    const [map, setMap] = useState()
    const [bounds, setBounds] = useState()

    const {panelDispatch} = useContext(ParentContext)

    let createMap
   
 

    useEffect(() => { //initmap
        createMap = initMap(mapContainer.current, setMap, setBounds, panelDispatch)
    },[])
    
    return (
        <div className={classes.mapContainer}>
            
            <div
                style={{ height: '100%', width: `100%`, zIndex: '1'}}
                ref={mapContainer}
            />

            
            <Marker
                map={map}   
                bounds={bounds}
            />
            
            
        </div>
    )

}

export default Map