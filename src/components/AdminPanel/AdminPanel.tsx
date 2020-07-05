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

import { makeStyles } from "@material-ui/core/styles";

import {
  FormGroup,
  Label,
  Input,
  Form,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap";

// const useStyles = makeStyles((theme) => ({
//   paper: {
//     marginTop: theme.spacing(-2),
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//   },
//   avatar: {
//     margin: theme.spacing(1),
//     backgroundColor: theme.palette.secondary.main,
//   },
//   form: {
//     width: "100%", // Fix IE 11 issue.
//     marginTop: theme.spacing(1),
//   },
//   submit: {
//     margin: theme.spacing(3, 0, 2),
//   },
// }));

// const classes = useStyles();

// const inputStyle = {
//   maxWidth: "200px",
// };

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
      <>
        {/* <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign Up
            </Typography>
            <form className={classes.form} onSubmit={this.adminRegister}>
              <FormGroup>
                <Label htmlFor="username">
                  <h5>Username</h5>
                </Label>
                <Input
                  onChange={(e) => this.setState({ username: e.target.value })}
                  name="username"
                  type="text"
                  value={this.state.username}
                  style={inputStyle}
                  required
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
                  value={this.state.password}
                  style={inputStyle}
                  required
                  pattern="(?=.*[a-z]).{5,}"
                  title="Password must be at least 5 characters"
                />
              </FormGroup>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
              >
                Sign Up
              </Button>
            </form>
          </div>
          <Box mt={8}></Box>
        </Container> */}

        <h1>Signup</h1>
        <Form onSubmit={this.adminRegister}>
          <FormGroup>
            <Label htmlFor="username">
              <h5>Username</h5>
            </Label>
            <Input
              onChange={(e) => this.setState({ username: e.target.value })}
              name="username"
              type="text"
              value={this.state.username}
              required
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
              value={this.state.password}
              required
              pattern="(?=.*[a-z]).{5,}"
              title="Password must be at least 5 characters"
            />
          </FormGroup>

          <Button type="submit" color="primary">
            Sign Up
          </Button>
        </Form>

        <TableContainer
          component={Paper}
          style={{
            borderRadius: "10px",
            overflow: "scroll",
            overflowX: "hidden",
            height: "600px",
            marginLeft: "20px",
            marginBottom: "20px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            maxWidth: "850px",
          }}
        >
          <Table style={{ maxWidth: "850px" }} aria-label="simple table">
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
                      variant="contained"
                      color="primary"
                      onClick={() => {
                        this.editUpdateUsers(users);
                        this.updateOn();
                      }}
                    >
                      Update
                    </Button>
                    <Button
                      style={{ marginLeft: "5px" }}
                      variant="contained"
                      color="secondary"
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
      </>
    );
  }
}
