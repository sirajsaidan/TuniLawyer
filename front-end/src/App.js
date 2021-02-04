import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Feed from "./pages/Feed";
import Login from "./pages/Login";
import Profile from "./components/Profile";
import Register from "./pages/Register";
import List from "./components/Lawyers/List";
import PrivateRoute from "./components/PrivateRoute";
import Home from "./components/Home";
import Lawyers from "./components/CardLawyers";
import Pop from "./components/PopularLegal";
import Profil from "./components/Profile";
import Chat from "./components/Chat";
import FooterPage from "./components/Footer"
function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/Profil" component={Profil} />
        <Route path="/Pop" component={Pop} />
        <Route path="/lawyers" component={Lawyers} />
        <PrivateRoute path="/list" component={List} />
        <PrivateRoute path="/list" component={List} />
        <PrivateRoute path="/chat/:userId" component={Chat} />

        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/lawyers-admin" component={List} />
        <PrivateRoute path="/registerb" component={Feed} />
        <PrivateRoute path="/profile" component={Profile} />
      </Switch>
      <FooterPage/>
    </Router>
  );
}

export default App;
