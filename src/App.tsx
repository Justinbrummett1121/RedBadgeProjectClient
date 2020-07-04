import React from "react";
import "./App.css";

import { BrowserRouter as Router } from "react-router-dom";

import Auth from "./auth/Auth";
import TimeIndex from "./times/timeIndex";
import Sidebar from "./components/site/Sidebar";
import { setupMaster } from "cluster";

type valueTypes = {
  username: any;
  setUsername: any;
  setToken: any;
};

export default class App extends React.Component<{}, valueTypes> {
  constructor(props: valueTypes) {
    super(props);
    this.state = {
      username: "",
      setUsername: "",
      setToken: "",
    };
  }

  componentWillMount() {
    console.log("Mounted");
  }

  componentDidMount() {
    if (localStorage.getItem("token")) {
      this.setState({ setToken: localStorage.getItem("token") });
    }

    if (localStorage.getItem("username")) {
      this.setState({ setUsername: localStorage.getItem("username") });
    }
  }

  updateToken = (newToken: string) => {
    localStorage.setItem("token", newToken);
    this.setState({ setToken: newToken });
    console.log(this.state.setToken);
  };

  updateUsername = (newUsername: string) => {
    localStorage.setItem("username", newUsername);
    this.setState({ setUsername: newUsername });
    console.log(newUsername);
  };

  protectedViews = () => {
    return this.state.setToken === localStorage.getItem("token") ? (
      <TimeIndex
        token={this.state.setToken}
        updateUsername={this.updateUsername}
      />
    ) : (
      <Auth token={this.updateToken} updateUsername={this.updateUsername} />
    );
  };

  render() {
    return (
      <div className="App">
        <Router>
          <Sidebar
            protectedViews={this.protectedViews}
            token={this.state.setToken}
            updatedUsername={this.updateUsername}
          />
        </Router>
      </div>
    );
  }
}

{
  /* <Auth
token={this.state.setToken}
updateUsername={this.updateUsername}
/>
<TimeIndex
token={this.state.setToken}
updateUsername={this.updateUsername}
/> */
}
