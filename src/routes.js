import React from "react";
import { Route } from "react-router-dom";
import Hoc from "./hoc/hoc";

import Login from "./components/Login";
import Signup from "./components/Signup";
import Profile from './components/Profile';
import UserList from "./components/UserList";
import LandingPage from "./components/Landing";
import UserProfile from "./components/UserProfile";

const Routes = () => (
  <Hoc>
    <Route path="/login" component={Login} />
    <Route path="/signup" component={Signup} />
    <Route path="/profile" component={Profile} />
    <Route path="/users" component={UserList} />
    <Route path="/user/:handle" render={(props) => <UserProfile {...props} />} />
    <Route exact path="/" component={LandingPage} />
  </Hoc>
);

export default Routes;
