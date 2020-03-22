import React from "react";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./components/Home";
import Login from "./components/Login";
import Calendar from './components/Calendar';
import Register from './pages/Register';
import AddChildPage from './pages/AddChildPage';
import MyChild from "./components/MyChild";
import UpdateChild from "./components/Forms/UpdateChild";
import MyAccount from './pages/MyAccount';
import './App.css';

import ProfileMenu from './components/menu-profile/menu-profile.component';
import AccountView from './components/account-view/account-view.component';
import AccountDelete from './components/account-delete/account-delete.component';
import AccountEdit from './components/account-edit/account-edit.component';
import AccountSearch from './components/account-search/searchAccount.component';



function App(props) {
  const { isAuthenticated, isVerifying } = props;
  return (
    <Switch>
      <ProtectedRoute
        exact
        path="/"
        component={Home}
        isAuthenticated={isAuthenticated}
        isVerifying={isVerifying}
      />
      <ProtectedRoute
        exact
        path="/calendar"
        component={Calendar}
        isAuthenticated={isAuthenticated}
        isVerifying={isVerifying}
      />
      <ProtectedRoute
        exact
        path="/addChild"
        component={AddChildPage}
        isAuthenticated={isAuthenticated}
        isVerifying={isVerifying}
      />
      <ProtectedRoute
        path="/updateChild/:id"
        component={UpdateChild}
        isAuthenticated={isAuthenticated}
        isVerifying={isVerifying}
      />
      <ProtectedRoute
        path="/myChild/:id"
        component={MyChild}
        isAuthenticated={isAuthenticated}
        isVerifying={isVerifying}
      />
      <ProtectedRoute
        exact
        path="/myAccount"
        component={MyAccount}
        isAuthenticated={isAuthenticated}
        isVerifying={isVerifying}
      />
      <ProtectedRoute
        exact
        path="/account"
        component={ProfileMenu}
        isAuthenticated={isAuthenticated}
        isVerifying={isVerifying}
      />
      <ProtectedRoute
        exact
        path="/account/view"
        component={AccountView}
        isAuthenticated={isAuthenticated}
        isVerifying={isVerifying}
      />
      <ProtectedRoute
        exact
        path="/account/edit"
        component={AccountEdit}
        isAuthenticated={isAuthenticated}
        isVerifying={isVerifying}
      />
      <ProtectedRoute
        exact
        path="/account/delete"
        component={AccountDelete}
        isAuthenticated={isAuthenticated}
        isVerifying={isVerifying}
      />
      <ProtectedRoute
        exact
        path="/account/search"
        component={AccountSearch}
        isAuthenticated={isAuthenticated}
        isVerifying={isVerifying}
      />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
    </Switch>
  );
}


function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    isVerifying: state.auth.isVerifying
  };
}


export default connect(mapStateToProps)(App);

