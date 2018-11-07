import React from "react";
import PropTypes from "prop-types";
// react plugin for creating charts
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
// core components
import GridContainer from "components/Grid/GridContainer.jsx";

import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart
} from "variables/charts.jsx";

import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";
import GraphCard from "./GraphCard.jsx";
import DataCard from "./DataCard.jsx";
import Drawer from "../../components/Drawer/Drawer.jsx";

import io from "socket.io-client";
const socket = io("http://localhost:3001");

class Dashboard extends React.Component {
  state = {
    UserID: this.props.UserID,
    DeviceID: this.props.DeviceID,
    AmbientTemp: 0,
    Humidity: 0,
    Lux: 0
    // advice_temp:"hot",
    // advice_
  };

  componentWillMount() {
    console.log("WILLMOUNT");
    this.socketSend();
    this.socketRecive();
  }

  componentDidMount() {
    setInterval(() => {
      this.socketSend();
    }, 60000);
  }

  socketRecive = () => {
    socket.on("getData", data => {
      console.log("recive");
      console.log("getData: ", data);
      data.AmbientTemp = parseFloat(data.AmbientTemp).toFixed(1);
      data.Humidity = parseFloat(data.Humidity).toFixed(1);
      data.Lux = parseFloat(data.Lux).toFixed(0);
      this.setState({
        AmbientTemp: data.AmbientTemp,
        Humidity: data.Humidity,
        Lux: data.Lux
      });
    });
  };

  socketSend = () => {
    socket.emit("requestData", { deviceID: this.state.DeviceID });
    console.log("Function");
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <GridContainer>
          <DataCard
            classes={classes}
            data="Temperature"
            value={this.state.AmbientTemp}
            unit="℃"
            advice="덥다"
            color="warning"
            icon="wb_sunny"
            controller="Heating Pad"
            facility={true}
          />
          <DataCard
            classes={classes}
            data="Humidity"
            value={this.state.Humidity}
            unit="%"
            advice="물좀주라"
            color="success"
            icon="opacity"
            controller="Fan"
            facility={true}
          />
          <DataCard
            classes={classes}
            data="Lux"
            value={this.state.Lux}
            unit="lux"
            advice="빛좀주라"
            color="danger"
            icon="wb_incandescent"
            controller="Light"
            facility={true}
          />
        </GridContainer>
        <GridContainer>
          <Drawer />
        </GridContainer>
        <GridContainer>
          <GraphCard
            classes={classes}
            color="success"
            className="ct-chart"
            type="Line"
            data={dailySalesChart.data}
            options={dailySalesChart.options}
            animation={dailySalesChart.animation}
            name="Temperature"
            values="33도"
            updateTime="1초전"
            advice="춥다"
          />
          <GraphCard
            classes={classes}
            color="warning"
            className="ct-chart"
            type="Bar"
            data={emailsSubscriptionChart.data}
            options={emailsSubscriptionChart.options}
            animation={emailsSubscriptionChart.animation}
            name="Humidity"
            values="51%"
            updateTime="1초전"
            advice="습하네"
          />
          <GraphCard
            classes={classes}
            color="danger"
            className="ct-chart"
            type="Line"
            data={completedTasksChart.data}
            options={completedTasksChart.options}
            animation={completedTasksChart.animation}
            name="Lux"
            values="44"
            updateTime="1초전"
            advice="눈부시다"
          />
        </GridContainer>
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(Dashboard);
