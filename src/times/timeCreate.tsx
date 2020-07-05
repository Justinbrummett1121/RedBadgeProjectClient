import React from "react";
import { Form, FormGroup, Label, Container, Row, Col } from "reactstrap";

import { Button, Input } from "antd";

type acceptedProps = {
  token: any;
  updateUsername: any;
  getTimes: any;
  // fetchTimes: any;
};

type valueTypes = {
  nameOfPark: string;
  route: string;
  length: string;
  time: string;
};

export default class TimeCreate extends React.Component<
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
    console.log("Time Create Mounted");
  }

  handleSubmit = (event: any) => {
    event.preventDefault();
    fetch(`http://localhost:4000/time/`, {
      method: "POST",
      body: JSON.stringify({
        nameOfPark: this.state.nameOfPark,
        route: this.state.route,
        length: this.state.length,
        time: this.state.time,
      }),
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: this.props.token,
      }),
    })
      .then((res) => res.json())
      .then((logData) => {
        console.log(logData);
        this.setState({
          nameOfPark: "",
          route: "",
          length: "",
          time: "",
        });
        this.props.getTimes();
        // is this.props.fetchTimes right?
      });
  };

  render() {
    return (
      <Container>
        <h2
          style={{
            textAlign: "center",
            letterSpacing: "1px",
            marginTop: "5px",
          }}
        >
          Add Time
        </h2>
        <Form onSubmit={this.handleSubmit} style={{ marginBottom: "40px" }}>
          <Row>
            <Col md="6">
              <FormGroup>
                <Label htmlFor="name of park" />
                <h5 style={{ letterSpacing: "1px" }}>Name of Park</h5>
                <Input
                  name="nameOfPark"
                  style={{ maxWidth: "250px" }}
                  value={this.state.nameOfPark}
                  required
                  onChange={(e) =>
                    this.setState({ nameOfPark: e.target.value })
                  }
                />
              </FormGroup>
            </Col>
            <Col md="6">
              <FormGroup>
                <Label htmlFor="route" />
                <h5 style={{ letterSpacing: "1px" }}>Route</h5>
                <Input
                  name="route"
                  style={{ maxWidth: "250px" }}
                  value={this.state.route}
                  required
                  onChange={(e) => this.setState({ route: e.target.value })}
                />
              </FormGroup>
            </Col>
            <Col md="4">
              <FormGroup>
                <Label htmlFor="length" />
                <h5 style={{ letterSpacing: "1px" }}>Length</h5>
                <Input
                  name="length"
                  style={{ maxWidth: "250px" }}
                  value={this.state.length}
                  required
                  onChange={(e) => this.setState({ length: e.target.value })}
                />
              </FormGroup>
            </Col>

            <Col md="4">
              <FormGroup>
                <Label htmlFor="time" />
                <h5 style={{ letterSpacing: "1px" }}>Time</h5>
                <Input
                  name="time"
                  style={{ maxWidth: "250px" }}
                  value={this.state.time}
                  required
                  onChange={(e) => this.setState({ time: e.target.value })}
                />
              </FormGroup>
            </Col>
          </Row>
          <Button
            type="primary"
            htmlType="submit"
            style={{ marginTop: "10px" }}
          >
            Submit
          </Button>
        </Form>
      </Container>
    );
  }
}
