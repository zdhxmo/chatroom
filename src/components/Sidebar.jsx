import React, { useEffect, useState } from "react";
import { Avatar } from "@material-ui/core";
import "./Sidebar.css";
import SidebarChat from "./SidebarChat";
import db from "../firebase";
import { useStateValue } from "../StateProvider";
import { auth } from "../firebase";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import { actionTypes } from "../reducer";

const Sidebar = () => {
  const [rooms, setRooms] = useState([]);
  const [{ user }, dispatch] = useStateValue();
  const history = useHistory();

  const signOut = () => {
    if (user) {
      auth.signOut();
      history.replace("/");
      dispatch({
        type: actionTypes.SET_USER,
        user: null,
      });
    }
  };

  useEffect(() => {
    const unsubscribe = db.collection("rooms").onSnapshot((snapshot) =>
      setRooms(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    );

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <Avatar src={user?.photoURL} />
        <Button variant="contained" color="secondary" onClick={signOut}>
          Sign Out
        </Button>
      </div>

      <div className="sidebar__chats">
        <SidebarChat addNewChat />
        {rooms.map((room) => (
          <SidebarChat key={room.id} id={room.id} name={room.data.name} />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
