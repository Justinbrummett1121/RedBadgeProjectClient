import React from "react";
import Login from "./Login";
import Signup from "./Signup";

type acceptedProps = {
  token: any;
  updateUsername: any;
  updateUserRole: string | any;
  //   updateMessage: any;
};

type valueTypes = {
  login: boolean;
  setLogin: boolean;
  username: string;
  password: string;
};

export default class Auth extends React.Component<acceptedProps, valueTypes> {
  constructor(props: acceptedProps) {
    super(props);
    this.state = {
      login: true,
      setLogin: false,
      username: "",
      password: "",
    };
  }

  authTernary = () => {
    return this.state.login ? (
      <Signup
        token={this.props.token}
        updateUsername={this.props.updateUsername}
        updateUserRole={this.props.updateUserRole}
      />
    ) : (
      <Login
        token={this.props.token}
        updateUsername={this.props.updateUsername}
        updateUserRole={this.props.updateUserRole}
      />
    );
  };

  loginToggle = (event: any) => {
    event.preventDefault();
    this.setState({ login: !this.state.login });
    this.setState({ username: "" });
    this.setState({ password: "" });
  };

  render() {
    return (
      <div>
        <h1>Login or Signup</h1>
        {this.authTernary()}
        <button onClick={this.loginToggle}>Toggle</button>
      </div>
    );
  }
}
