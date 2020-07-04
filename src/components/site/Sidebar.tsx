import React from "react";
import { Route, Link, Switch } from "react-router-dom";

type acceptedProps = {
  token: any;
  updatedUsername: any;
  protectedViews: any;
};

export default class Sidebar extends React.Component<acceptedProps, {}> {
  constructor(props: acceptedProps) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <>
        <div className="sidebar_all">
          <div className="sidebar">
            <div className="sidebar-list-styling">
              <hr />
              <ul className="sidebar-list list-unstyled">
                <li>
                  <Link to="/">Home</Link>
                </li>
                <hr />
              </ul>
            </div>
          </div>
          <div className="sidebar-route">
            <Switch>
              <Route exact path="/">
                {this.props.protectedViews()}
              </Route>
            </Switch>
          </div>
        </div>
      </>
    );
  }
}
