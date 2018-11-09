import React, { Component } from "react";
import Dashboard from "../Dashboard/Dashboard.jsx";

const device = "0C:61:CF:4F:6C:07";
const user = "UserID";

class test extends Component {
  render() {
    return <Dashboard DeviceID={device} UserID={user} location={"부산"} />;
  }
}

export default test;
