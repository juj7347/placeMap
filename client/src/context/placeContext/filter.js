import { useState, useEffect, useContext } from "react"

import { Collapse, Paper, makeStyles, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Typography, Button } from "@material-ui/core"
import { FilterList } from "@material-ui/icons";
import { ParentContext } from "./ParentProvider";

const useStyles = makeStyles((theme) => ({
    button_color: {
        backgroundColor: "#0000FF"
    },
}));



export default function Filter() {


    const {panelDispatch, placeState, placeDispatch} = useContext(ParentContext)
// on off
    const [on, setOn] = useState(false)
    const classes = useStyles()


    const onClick = e => {

        setOn(!on)
    }
//
    const[value, setValue] = useState({
        distance: "-1",
        reviews: "0",
        rating: "0"
    })    

   

    useEffect(() => {
        setValue({...value, reviews: "0"})
    },[placeState.placeData])



    //filter by review count

    const filterReviews = (e) => {
        setValue({...value, [e.target.name] : e.target.value})
        
        const filtered = placeState.selectedPlace.filter(place => place.reviewCount >= Number(e.target.value))
      
        placeDispatch({
            type: "FILTERED_PLACE",
            filteredPlace: filtered
        })

        panelDispatch({
            type: "HIDE"
        })

    }

    

    return (
        <div className={classes.filter}>
            <Button
                onClick={onClick}
            >
                <FilterList/>
                <Typography>
                    필터링
                </Typography>
            </Button>
            <Collapse in={on}>
                <Paper> 
                    <Typography>
                        필터링 항목
                    </Typography>    
                    <FormControl component="fieldset">


                        <FormLabel component="legend">리뷰개수 </FormLabel>
                        <RadioGroup name="reviews" value={value.reviews} onChange={filterReviews}>
                            <FormControlLabel value="0" control={<Radio />} label="해당없음" />
                            <FormControlLabel value="10" control={<Radio />} label="10개 이상"/>
                            <FormControlLabel value="50" control={<Radio />} label="50개 이상"/>
                            <FormControlLabel value="100" control={<Radio />} label="100개 이상"/>
                            <FormControlLabel value="500" control={<Radio />} label="500개 이상"/>
                        </RadioGroup>

                    </FormControl>
                </Paper>
            </Collapse>
        </div>
    )
}