
import React, { useContext, createContext, useState,useEffect  } from "react";
import './App.css'

//importación de componentes
import Login from "./screens/login/login";
import EditProfil from "./screens/editProfil/editProfil";
import PanelAdmin from "./screens/panelAdmin/panelAdmin";
import ChatsOnline from "./screens/chatsOnline/chatsOnline";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation
} from "react-router-dom";

import './App.css';
export default function App() {

  useEffect(() => {
    console.log("iniciando front . . .");

  })

  /* cada compónente dentro de esta distribución de navegación, es una pantalla, que su ves contiene
  componentes */
  return (
      <Router>
        <Switch>
          <Route exact path="/">
               <Login></Login>
          </Route>
          <Route exact path="/firstsettings">
              <EditProfil></EditProfil>
          </Route>
          <Route exact path="/panel">
              <PanelAdmin></PanelAdmin>
          </Route>
          <Route exact path="/chatsonline">
              <ChatsOnline></ChatsOnline>
          </Route>
        </Switch>
      </Router>
  );
}
