import { Dialog, DialogContent, Slide, Card, Typography  } from '@material-ui/core';


import { ParentContext } from '../context/placeContext/ParentProvider.js';
import { useContext, useEffect, useState, forwardRef } from 'react';

import MainFeaturedPost from './MainFeatuedPost.js'

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

export default function AlertDialogSlide() {

  const {panelDispatch, panelState, placeState} = useContext(ParentContext)
  

  const handleClose = () => {
    panelDispatch({
        type: "HIDEMORE"
    });
  };

  const [mainFeaturedPost, setMainFeaturedPost] = useState({
    title: "",
    image: "",
    reviewCount: 0,
    handleClose: handleClose
  })

  let place





  useEffect(() => {
    if(panelState.selected > -1) {
        if(panelState.selected < placeState.filteredPlace.length) { 
          place = placeState.filteredPlace[panelState.selected]
        }
        else {
          place = placeState.filteredPlace[0]
        }
        setMainFeaturedPost({...mainFeaturedPost, title: place.name, image:place.thumbnail, reviewCount: place.reviewCount})
        
          
    }
  },[panelState.selected, placeState.filteredPlace])

  return panelState.visible_more && (
    <div>
      <Dialog
        open={panelState.visible_more}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
        fullScreen={true}
      >
        <DialogContent>

            <MainFeaturedPost post={mainFeaturedPost} />
            <Typography>
              정보
            </Typography>
            <Card>
              <Typography>
                주소 
              </Typography>
              <Typography>
                {placeState.filteredPlace[panelState.selected].address}
              </Typography>
              <Typography>
                전화번호
              </Typography>
              <Typography>
              {placeState.filteredPlace[panelState.selected].tel}
              </Typography>
              <Typography>
                홈페이지
              </Typography>
              <Typography>
                {placeState.filteredPlace[panelState.selected].url}
              </Typography>
            </Card>
            <Card>
              <Typography>
                리뷰
              </Typography>
            </Card>
        </DialogContent>
      </Dialog>
    </div>
  );
}