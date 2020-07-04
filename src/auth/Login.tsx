import React from "react";
// import Avatar from "@material-ui/core/Avatar";
// import Button from "@material-ui/core/Button";
// import CssBaseline from "@material-ui/core/CssBaseline";
// import Box from "@material-ui/core/Box";
// // import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
// import Typography from "@material-ui/core/Typography";
// import { makeStyles } from "@material-ui/core/styles";
// import Container from "@material-ui/core/Container";
import { FormGroup, Label, Input, Form, Button } from "reactstrap";

type acceptedProps = {
  token: any;
  updateUsername: string | any;
  updateUserRole: string | any;
};

type valueTypes = {
  username: string;
  password: string;
};

export default class Login extends React.Component<acceptedProps, valueTypes> {
  constructor(props: acceptedProps) {
    super(props);
    this.state = {
      username: "",
      password: "",
    };
  }

  handleSubmit = (event: any) => {
    event.preventDefault();
    fetch(`http://localhost:4000/user/login`, {
      method: "POST",
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
      }),
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        this.props.token(data.sessionToken);
        console.log(data);
        this.props.updateUsername(data.user.username);
        this.props.updateUserRole(data.user.userRole);
        // this.props.updateMessage(data.message);
      });
  };

  render() {
    return (
      <div>
        <h1>Login</h1>
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label htmlFor="username">
              <h5>Username</h5>
            </Label>
            <Input
              onChange={(e) => this.setState({ username: e.target.value })}
              type="text"
              name="username"
              required
              value={this.state.username}
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,}"
              title="Must have at least one number, uppercase, and a lowercase letter. Min 4 chars."
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="password">
              <h5>Password</h5>
            </Label>
            <Input
              onChange={(e) => this.setState({ password: e.target.value })}
              name="password"
              type="password"
              required
              value={this.state.password}
              pattern="(?=.*[a-z]).{5,}"
              title="Password must be at least 5 characters"
            />
          </FormGroup>
          <Button type="submit" color="primary">
            Login
          </Button>
        </Form>
      </div>
    );
  }
}
