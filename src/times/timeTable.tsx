import React from "react";
import Table from "@material-ui/core/Table";
// import { Button } from "@material-ui/core";
import { Button } from "antd";

import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import "./TimeTable.css";

type acceptedProps = {
  token: any;
  updateUsername: any;
  getTimes: any;
  time: [];
  editUpdateTime: any;
  updateOn: any;
};

type valueTypes = {
  nameOfPark: string;
  route: string;
  length: string;
  time: string;
};

export default class TimeTable extends React.Component<
  acceptedProps,
  valueTypes
> {
  constructor(props: acceptedProps) {
    super(props);
    this.state = {
      nameOfPark: "",
      route: "",
      length: "",
      time: "",
    };
  }

  componentWillMount() {
    console.log("Time Table Mounted");
  }

  deleteTime = (time: any) => {
    fetch(`http://localhost:4000/time/${time.id}`, {
      method: "DELETE",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: this.props.token,
      }),
    }).then(() => this.props.getTimes());
  };

  componentDidMount() {
    this.props.getTimes();
  }

  render() {
    return (
      <TableContainer
        component={Paper}
        style={{
          borderRadius: "10px",
          overflow: "scroll",
          display: "block",
          overflowX: "hidden",
          height: "600px",
          marginBottom: "20px",
        }}
      >
        <Table style={{ minWidth: "650px" }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell component="th" scope="row">
                <b>Name of Park</b>
              </TableCell>
              <TableCell align="right">
                <b>Route</b>
              </TableCell>
              <TableCell align="right">
                <b>Length</b>
              </TableCell>
              <TableCell align="right">
                <b>Time</b>
              </TableCell>
              <TableCell align="right">
                <b>Update or Delete</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.props.time.map((time: any, main) => (
              <TableRow key={main}>
                <TableCell component="th" scope="row">
                  {time.nameOfPark}
                </TableCell>
                <TableCell align="right">{time.route}</TableCell>
                <TableCell align="right">{time.length}</TableCell>
                <TableCell align="right">{time.time}</TableCell>
                <TableCell align="right">
                  <Button
                    type="link"
                    onClick={() => {
                      this.props.editUpdateTime(time);
                      this.props.updateOn();
                    }}
                  >
                    Update
                  </Button>
                  <Button
                    style={{ marginLeft: "5px" }}
                    type="link"
                    danger
                    onClick={() => {
                      this.deleteTime(time);
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
    );
  }
}
