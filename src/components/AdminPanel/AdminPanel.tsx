import React from "react";
import Table from "@material-ui/core/Table";
// import { Button } from "@material-ui/core";

import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import UserEdit from "./UserEdit";

import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

import { makeStyles, createStyles, withStyles } from "@material-ui/core/styles";

import { FormGroup, Label, Form } from "reactstrap";
import { Input, Space, Button } from "antd";

type acceptedProps = {
  token: any;
  updateUserRole: any;
  updateUsername: any;
};

type valueTypes = {
  users: [];
  username: string;
  password: string;
  usersToUpdate: {} | [];
  updateActive: boolean;
};

export default class AdminPanel extends React.Component<
  acceptedProps,
  valueTypes
> {
  constructor(props: acceptedProps) {
    super(props);
    this.state = {
      users: [],
      username: "",
      password: "",
      usersToUpdate: {},
      updateActive: false,
    };
  }

  componentWillMount() {
    console.log("Admin Panel Users Mounted");
  }

  editUpdateUsers = (users: any) => {
    this.setState({ usersToUpdate: users });
    console.log(users);
  };

  updateOn = () => {
    this.setState({ updateActive: true });
  };

  updateOff = () => {
    this.setState({
      updateActive: false,
    });
  };

  getUsers = () => {
    fetch(`http://localhost:4000/user/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((logUsers) => {
        console.log(logUsers);
        this.setState({ users: logUsers.users });
        // this.getUsers();
      });
  };

  componentDidMount() {
    this.getUsers();
  }

  adminRegister = (event: any) => {
    event.preventDefault();
    fetch(`http://localhost:4000/user/adminregister`, {
      method: "POST",
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          username: "",
          password: "",
        });
        this.getUsers();
      });
  };

  deleteUser = (user: any) => {
    fetch(`http://localhost:4000/user/${user.id}`, {
      method: "DELETE",
      headers: new Headers({
        "Content-Type": "application/json",
        // Authorization: this.props.token,
      }),
    }).then(() => this.getUsers());
  };

  render() {
    return (
      <div
        style={{
          backgroundColor: "lightgray",
          // opacity: "0.8",
          borderRadius: "10px",
          paddingTop: "50px",
          marginTop: "50px",
          marginRight: "20px",
          marginLeft: "10%",
          maxWidth: "75%",
        }}
      >
        <Form
          onSubmit={this.adminRegister}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <FormGroup style={{ marginBottom: "10px" }}>
            <Space direction="vertical">
              <Label htmlFor="username">
                <h4>Username</h4>
                <br />
              </Label>
              <Input
                placeholder="input username"
                onChange={(e) => this.setState({ username: e.target.value })}
                name="username"
                type="text"
                style={{ marginTop: "-30px" }}
                value={this.state.username}
                required
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,}"
                title="Must have at least one number, uppercase, and a lowercase letter. Min 4 chars."
              />
            </Space>
            {/* <Input
              onChange={(e) => this.setState({ username: e.target.value })}
              name="username"
              type="text"
              value={this.state.username}
              required
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,}"
              title="Must have at least one number, uppercase, and a lowercase letter. Min 4 chars."
            /> */}
          </FormGroup>
          <FormGroup>
            <Space direction="vertical">
              <Label htmlFor="password">
                <h4>Password</h4>
                <br />
              </Label>
              <Input.Password
                placeholder="input password"
                onChange={(e) => this.setState({ password: e.target.value })}
                name="password"
                style={{ marginTop: "-30px" }}
                value={this.state.password}
                required
                pattern="(?=.*[a-z]).{5,}"
                title="Password must be at least 5 characters"
              />
            </Space>
            {/* <Input
              onChange={(e) => this.setState({ password: e.target.value })}
              name="password"
              value={this.state.password}
              required
              pattern="(?=.*[a-z]).{5,}"
              title="Password must be at least 5 characters"
            /> */}
          </FormGroup>

          <Button
            htmlType="submit"
            type="primary"
            style={{ marginTop: "10px", marginBottom: "40px" }}
          >
            Sign Up
          </Button>
        </Form>

        <TableContainer
          component={Paper}
          style={{
            borderRadius: "10px",
            overflow: "scroll",
            overflowX: "hidden",
            maxHeight: "600px",
            marginBottom: "40px",
            paddingTop: "10px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            maxWidth: "850px",
          }}
        >
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell component="th" scope="row">
                  <b>Username</b>
                </TableCell>
                <TableCell align="right">
                  <b>Password</b>
                </TableCell>
                <TableCell align="right">
                  <b>Update or Delete</b>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.users.map((users: any, main) => (
                <TableRow key={main}>
                  <TableCell component="th" scope="row">
                    {users.username}
                  </TableCell>
                  <TableCell align="right">{users.password}</TableCell>
                  <TableCell align="right">
                    <Button
                      type="primary"
                      onClick={() => {
                        this.editUpdateUsers(users);
                        this.updateOn();
                      }}
                    >
                      Update
                    </Button>
                    <Button
                      style={{ marginLeft: "5px" }}
                      type="primary"
                      danger
                      onClick={() => {
                        this.deleteUser(users);
                      }}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {this.state.updateActive ? (
          <UserEdit
            token={this.props.token}
            updateOff={this.updateOff}
            getUsers={this.getUsers}
            usersToUpdate={this.state.usersToUpdate}
          />
        ) : (
          <></>
        )}
      </div>
    );
  }
}
