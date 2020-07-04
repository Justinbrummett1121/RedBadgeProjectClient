import React from "react";

import {
  Form,
  FormGroup,
  Label,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  Button,
} from "reactstrap";

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
        <Modal isOpen={true}>
          <ModalHeader>Edit your Trail Time</ModalHeader>
          <hr />
          <ModalBody>
            <Form onSubmit={this.timeUpdate}>
              <FormGroup>
                <Label htmlFor="name">Edit Name of Park:</Label>
                <Input
                  name="name"
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
                  value={this.state.route}
                  onChange={(e) => this.setState({ route: e.target.value })}
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="location">Edit Length:</Label>
                <Input
                  name="location"
                  value={this.state.length}
                  onChange={(e) => this.setState({ length: e.target.value })}
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="time">Edit Time:</Label>
                <Input
                  name="time"
                  value={this.state.time}
                  onChange={(e) => this.setState({ time: e.target.value })}
                />
              </FormGroup>

              <Button type="submit" variant="contained" color="primary">
                Confirm
              </Button>
            </Form>
          </ModalBody>
        </Modal>
      </>
    );
  }
}
