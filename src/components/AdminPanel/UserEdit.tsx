import React from "react";
import {
  FormGroup,
  Label,
  Form,
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap";
import * as bcrypt from "bcryptjs";
import { Input, Space, Button } from "antd";

const salt = bcrypt.genSaltSync(10);

type acceptedProps = {
  token: any;
  updateOff: any;
  getUsers: any;
  usersToUpdate: any;
};

type valueTypes = {
  editUsername: string | any;
  editPassword: string | any;
};

export default class UserEdit extends React.Component<
  acceptedProps,
  valueTypes
> {
  constructor(props: acceptedProps) {
    super(props);
    this.state = {
      editUsername: this.props.usersToUpdate.username,
      editPassword: this.props.usersToUpdate.password,
    };
  }

  componentWillMount() {
    console.log("User Edit Mounted");
  }

  usersUpdate = (event: any) => {
    event.preventDefault();
    fetch(`http://localhost:4000/user/${this.props.usersToUpdate.id}`, {
      method: "PUT",
      body: JSON.stringify({
        user: {
          username: this.state.editUsername,
          password: bcrypt.hashSync(this.state.editPassword, salt),
        },
      }),
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    }).then((res) => {
      this.props.getUsers();
      this.props.updateOff();
    });
  };

  render() {
    return (
      <Modal isOpen={true} style={{ marginLeft: "20px" }}>
        <ModalHeader>Edit User</ModalHeader>
        <hr />
        <ModalBody>
          <Form onSubmit={this.usersUpdate}>
            <FormGroup>
              <Label htmlFor="username">Edit Username:</Label>
              <Space direction="vertical">
                <Input
                  style={{ marginLeft: "7px", marginBottom: "5px" }}
                  name="name"
                  value={this.state.editUsername}
                  onChange={(e) =>
                    this.setState({ editUsername: e.target.value })
                  }
                />
              </Space>

              {/* // <Input
              //   name="name"
              //   value={this.state.editUsername}
              //   onChange={(e) =>
              //     this.setState({ editUsername: e.target.value })
              //   }
              // /> */}
            </FormGroup>
            <FormGroup>
              <Label htmlFor="day">Edit Password:</Label>
              <Space direction="vertical">
                <Input
                  style={{ marginLeft: "10px" }}
                  name="password"
                  value={this.state.editPassword}
                  onChange={(e) =>
                    this.setState({ editPassword: e.target.value })
                  }
                />
              </Space>
            </FormGroup>

            <Button htmlType="submit" type="primary">
              Confirm
            </Button>
          </Form>
        </ModalBody>
      </Modal>
    );
  }
}
