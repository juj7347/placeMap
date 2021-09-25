import { CssBaseline } from "@material-ui/core";

import Header from "./component/Header";

import Map from "./component/map/MapDynamics";

import { BrowserRouter, Route, Switch } from 'react-router-dom'


import AlertDialogSlide from "./Dialog/Dialog";

import ParentProvider from "./context/placeContext/ParentProvider";

import QnA from "./Dialog/QnA";
const App = () => {

  return (
    <>
    <CssBaseline/>
      <ParentProvider>
        <BrowserRouter>
          <Header/>
          <Switch>
            <Route path='/' component={Map}/>
          </Switch>
          <AlertDialogSlide/>
        </BrowserRouter>
      </ParentProvider>
    </>
  )
  
 
}

export default App;
