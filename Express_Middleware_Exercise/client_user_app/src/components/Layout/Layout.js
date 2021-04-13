import React from "react";
import { NavLink } from "react-router-dom";
// import "Layout.css"
import classes from "./Layout.module.css";
const Layout = (props) => {
  return (
    <React.Fragment>
      <div className={classes.container}>
        <nav className={classes.nav}>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/add-user">Add User</NavLink>
          <NavLink to="/about">About</NavLink>
        </nav>
      </div>
      {props.children}
    </React.Fragment>
  );
};
export default Layout;
