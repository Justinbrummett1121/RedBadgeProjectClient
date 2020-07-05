import React from "react";

import {
  Form,
  FormGroup,
  Label,
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap";

import { Button, Input } from "antd";

type acceptedProps = {
  token: any;
  updateUsername: any;
  fetchTimes: any;
  timeToUpdate: any;
  updateOff: any;
};

type valueTypes = {
  nameOfPark: string;
  route: string;
  length: string;
  time: string;
};

export default class TimeEdit extends React.Component<
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

  timeUpdate = (event: any) => {
    event.preventDefault();
    fetch(`http://localhost:4000/time/${this.props.timeToUpdate.id}`, {
      method: "PUT",
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
    }).then((res) => {
      this.props.fetchTimes();
      this.props.updateOff();
    });
  };

  render() {
    return (
      <>
        <Modal
          isOpen={true}
          style={{
            backgroundColor: "lightgray",
            // opacity: "0.8",
            borderRadius: "10px",
            paddingTop: "10px",
            paddingLeft: "20px",
            paddingBottom: "10px",
            marginTop: "50px",
            marginRight: "20px",
            marginLeft: "10%",
            maxWidth: "75%",
          }}
        >
          <ModalHeader>Edit your Trail Time</ModalHeader>
          <hr />
          <ModalBody>
            <Form onSubmit={this.timeUpdate}>
              <FormGroup>
                <Label htmlFor="name">Edit Name of Park:</Label>
                <Input
                  name="name"
                  style={{ maxWidth: "250px" }}
                  value={this.state.nameOfPark}
                  onChange={(e) =>
                    this.setState({ nameOfPark: e.target.value })
                  }
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="day">Edit Route:</Label>
                <Input
                  name="day"
                  style={{ maxWidth: "250px" }}
                  value={this.state.route}
                  onChange={(e) => this.setState({ route: e.target.value })}
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="location">Edit Length:</Label>
                <Input
                  name="location"
                  style={{ maxWidth: "250px" }}
                  value={this.state.length}
                  onChange={(e) => this.setState({ length: e.target.value })}
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="time">Edit Time:</Label>
                <Input
                  name="time"
                  style={{ maxWidth: "250px" }}
                  value={this.state.time}
                  onChange={(e) => this.setState({ time: e.target.value })}
                />
              </FormGroup>

              <Button htmlType="submit" type="primary">
                Confirm
              </Button>
            </Form>
          </ModalBody>
        </Modal>
      </>
    );
  }
}
