import "./App.css";

import { Route, Switch } from "react-router-dom";
import React from "react";
import Layout from "./components/Layout/Layout";
import User from "./containers/UsersData/User";
import AddUser from "./containers/AddUser/AddUser";
import About from "./components/About/about";

const app = (props) => {
  let routes = (
    <Switch>
      {/* <Route path='/delete' component={User} /> */}
      <Route path="/about" component={About} />
      <Route path="/add-user" component={AddUser} />
      <Route path="/" component={User} />
    </Switch>
  );
  return (
    <Layout>
      <React.Fragment>{routes}</React.Fragment>
    </Layout>
  );
};

export default app;
