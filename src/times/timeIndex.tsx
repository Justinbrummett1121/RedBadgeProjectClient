import React from "react";
import TimeTable from "./timeTable";
import TimeCreate from "./timeCreate";
import TimeEdit from "./timeEdit";
import { Container, Row, Col } from "reactstrap";
// import styled from "@types/styled-components/cssprop";

// const Div = styled.div`
//   background-color: #363136;
//   opacity: 0.8;
//   border-radius: 5px;
//   padding-left: 10px;
//   padding-top: 10px;
//   padding-bottom: 10px;
//   padding-right: 5px;
//   margin-right: 20px;
//   max-width: 100%;
// `;

type acceptedProps = {
  token: any;
  updateUsername: any;
};

type valueTypes = {
  times: [];
  updateActive: boolean;
  timeToUpdate: string;
};

export default class TimeIndex extends React.Component<
  acceptedProps,
  valueTypes
> {
  constructor(props: acceptedProps) {
    super(props);
    this.state = {
      times: [],
      updateActive: false,
      timeToUpdate: "",
    };
  }

  editUpdateTime = (time: string) => {
    this.setState({ timeToUpdate: time });
    console.log(time);
  };

  updateOn = () => {
    this.setState({ updateActive: true });
  };

  updateOff = () => {
    this.setState({
      updateActive: false,
    });
  };

  //     useEffect(() => {
  //       fetchTime();
  //     }, []);

  componentWillMount() {
    console.log("Time Index Mounted");
  }

  // fetchTimes = () => {
  //   fetch(`http://locahost:4000/time/`, {
  //     method: "POST",
  //     headers: new Headers({
  //       "Content-Type": "application/json",
  //       Authorization: this.props.token,
  //     }),
  //   })
  //     .then((res) => res.json())
  //     .then((logData) => {
  //       console.log(logData);
  //       this.setState({ times: this.state.times });
  //     });
  // };

  getTimes = () => {
    fetch(`http://localhost:4000/time/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: this.props.token,
      },
    })
      .then((res) => res.json())
      .then((logData) => {
        console.log(logData);
        this.setState({ times: logData.times });
      });
  };

  // componentDidMount() {
  //   this.fetchTimes();
  // }

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
        <Container>
          <Row>
            <Col md="12">
              <TimeCreate
                // fetchTimes={this.fetchTimes}
                token={this.props.token}
                updateUsername={this.props.updateUsername}
                getTimes={this.getTimes}
              />
            </Col>
            <Col md="12">
              <TimeTable
                time={this.state.times}
                editUpdateTime={this.editUpdateTime}
                updateOn={this.updateOn}
                getTimes={this.getTimes}
                token={this.props.token}
                updateUsername={this.props.updateUsername}
              />
            </Col>
            {this.state.updateActive ? (
              <TimeEdit
                timeToUpdate={this.state.timeToUpdate}
                updateOff={this.updateOff}
                token={this.props.token}
                updateUsername={this.props.updateUsername}
                fetchTimes={this.getTimes}
              />
            ) : (
              <></>
            )}
          </Row>
        </Container>
      </div>
    );
  }
}
