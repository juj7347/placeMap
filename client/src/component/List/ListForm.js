import { Paper, IconButton, Collapse, makeStyles, Card, Chip, CardContent, Typography, ButtonBase } from "@material-ui/core";
import { Dehaze } from "@material-ui/icons";

import Filter from "../../context/placeContext/filter";
import { ParentContext } from "../../context/placeContext/ParentProvider";
import { useState, useContext } from "react";


const useStyles = makeStyles((theme) => ({

    list: {
        maxHeight: "70vh",
        maxWidth: "500px",
        overflow: "auto",
    },
    placeCard: {
        display: 'flex',
        margin: 10
    },
    img:{
        width: '200px',
        height: '150px'
    }
}));

const ListForm = ({children}) => {

    const classes = useStyles()
    const [showList, setShowList] = useState(false)
    const [showPlaceList, setShowPlaceList] = useState(false)
    const {panelState, panelDispatch, placeState} = useContext(ParentContext)

    const handleClick = (e) => {
        panelDispatch({
            type:  "HIDE"
        })
        if(!showList) {

            panelDispatch({
                type: "SHOWLIST"
            })
        }
        else {
            panelDispatch({
                type: "HIDELIST"
            })
        }


        
        setShowList(!showList   )
    }

    const photoClick = (e) => {
        panelDispatch({
            type: "MOVE",
            index: e.currentTarget.value
        })
        panelDispatch({
            type: "SHOWMORE"
        })
    }

    const handlePlaceListClick = (e) => {
        setShowPlaceList(!showPlaceList)
    }

    return (
        <div>
            <IconButton onClick={handleClick}>
                <Dehaze fontSize="large"/>
            </IconButton>
            <Collapse
                in={panelState.visible_list}
            >
                <Paper className={classes.list}>
                    <Filter/>
                    <IconButton onClick={handlePlaceListClick}>
                        <Dehaze fontSize="small"/>
                        <Typography variant="subtitle2">
                             내 리스트
                        </Typography>
                    </IconButton>
                    <Collapse
                        in={showPlaceList}
                    >
                        {children}
                    </Collapse>
                    {placeState.filteredPlace?.map((place,index) => 
                        <Card className={classes.placeCard}>
                            <ButtonBase onClick={photoClick} value={index}>
                                <img className={classes.img} src={place.thumbnail} alt="complex" />
                            </ButtonBase>                         
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                {place.name}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    {place.reviewCount}
                                </Typography>
                                {place.category.map(type => 
                                <Chip label={type}/>    
                                )}
                            </CardContent>
                            
                            
                            
                        </Card>
                    )}
                </Paper>
            </Collapse>
        </div>
    )
}

export default ListForm