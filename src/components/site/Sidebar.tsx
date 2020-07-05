import React from "react";
import { Route, Link, Switch } from "react-router-dom";
import "./Sidebar.css";

type acceptedProps = {
  token: any;
  updateUsername: any;
  protectedViews: any;
  protectedViewsAdmin: any;
};

export default class Sidebar extends React.Component<acceptedProps, {}> {
  constructor(props: acceptedProps) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <>
        {/* <div className="sidebar_all">
          <div className="sidebar">
            <div className="sidebar-list-styling">
              <hr />
              <ul className="sidebar-list list-unstyled">
                <li>
                  <Link to="/">Home</Link>
                </li>
                <hr />
                <li>
                  <Link to="/AdminPanel">Admin Panel</Link>
                </li>
                <hr />
              </ul>
            </div>
          </div> */}
        <nav className="navbar">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                <span className="link-text">Home</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/AdminPanel" className="nav-link">
                <span className="link-text">Admin</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/AdminPanel" className="nav-link">
                <span className="link-text">Logout</span>
              </Link>
            </li>
          </ul>
        </nav>
        <div className="sidebar-route">
          <Switch>
            <Route exact path="/">
              {this.props.protectedViews()}
            </Route>
            <Route exact path="/AdminPanel">
              {this.props.protectedViewsAdmin()}
            </Route>
          </Switch>
        </div>
        {/* </div> */}
      </>
    );
  }
}
