import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route, useParams } from "react-router-dom";
import "./App.css";
import Chat from "./components/Chat";
import Login from "./components/Login";
import Sidebar from "./components/Sidebar";
import { useStateValue } from "./StateProvider";
import { auth } from "./firebase";
import { actionTypes } from "./reducer";

function App() {
  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch({
          type: actionTypes.SET_USER,
          user: authUser,
        });
      }
    });
  }, []);

  return (
    <div className="app">
      <div className="app__body">
        {!user ? (
          <Login />
        ) : (
          <Router>
            <Sidebar className="app__sidebar" />
            <Switch>
              <Route path="/rooms/:roomId">
                <Chat className="app__chat" />
              </Route>
              <Route path="/">
                <Chat className="app__chat" />
              </Route>
            </Switch>
          </Router>
        )}
      </div>
    </div>
  );
}

export default App;
