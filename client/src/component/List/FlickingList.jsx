import * as React from 'react'
import Flicking from "@egjs/react-flicking";
import "@egjs/react-flicking/dist/flicking.css"
import { Fade } from "@egjs/flicking-plugins";

import { useEffect, useContext, createRef} from 'react';
import { ParentContext } from '../../context/placeContext/ParentProvider';
import { Paper, ButtonBase, makeStyles, Grid, Typography, Chip } from '@material-ui/core';
import { Phone } from '@material-ui/icons';



const useStyles = makeStyles((theme) => ({

    root: {
        flexGrow: 1,
      },
      paper: {
        padding: theme.spacing(2),
        margin: 15,
        width: '95vw',
        height: 230
      },
      image: {
        width: 200,
        height: 200,
      },
      img: {
        margin: 'auto',
        display: 'block',
        width: '100%',
        height: '100%',
      },
    
      chip: {
          margin: theme.spacing(0.5),
          height: 20
      }
}));


const FadeDemo = () => {

    const classes = useStyles()
    const plugins = [new Fade()];
    const {panelDispatch, panelState, placeState}= useContext(ParentContext)


    const flick = createRef()

    const handleMove = () => { //update when swiped
        panelDispatch({
            type: "SWIPE"
        })

    }

    const moveToFlicking = (index) => { //movePanel when clicked
        if(flick.current && placeState.filteredPlace) {
            flick.current.moveTo(index)
        }
        return
    }

    useEffect(() => {
        
        if(flick.current) {
            panelDispatch({
                type: "MOVE",
                index: flick.current.getStatus().position.panel
            })
        }
    },[panelState.swiped])
    
    useEffect(() => {
        moveToFlicking(panelState.selected)
    },[panelState.selected])


    
    const handleClick = (e) => {
        panelDispatch({
            type: "SHOWMORE"
        })
    }

    return panelState.visible && (
            
            <Flicking
                plugins={plugins}
                defaultIndex={panelState.selected}
                onMoveEnd={handleMove}
                ref={flick}
            >
                {placeState.filteredPlace?.map(place => 
                    <div className={classes.root}>
                        <Paper className={classes.paper}>
                            <Grid container spacing={2}>
                                <Grid item>
                                <ButtonBase className={classes.image} onClick={handleClick}>
                                    <img className={classes.img} alt="complex" src={place.thumbnail} />
                                </ButtonBase>
                                </Grid>
                                <Grid item xs={12} sm container>
                                <Grid item xs container direction="column" spacing={2}>
                                    <Grid item xs>
                                    {place.category.map(type =>
                                        <Chip label={type} className={classes.chip}/>
                                    )}
                                    
                                    <Typography gutterBottom variant="h5">
                                        {place.name}
                                    </Typography>
                                    <Typography variant="body2" gutterBottom>
                                        리뷰 {place.reviewCount}
                                    </Typography>
                                    <Typography variant="body2">
                                        {place.address}
                                    </Typography>

                                    </Grid>
                                    <Grid item>
                                    <Typography variant="body2" >
                                        <Phone fontSize="small"/> {place.tel}
                                    </Typography>
                                    </Grid>
                                </Grid>
                                </Grid>
                            </Grid>
                        </Paper>
                    </div>    
                )}
            </Flicking>
        )
}

export default FadeDemo