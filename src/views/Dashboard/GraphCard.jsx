import React from "react";
// import PropTypes from "prop-types";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
// import withStyles from "@material-ui/core/styles/withStyles";
// import Icon from "@material-ui/core/Icon";
// @material-ui/icons
// import Store from "@material-ui/icons/Store";
// import Warning from "@material-ui/icons/Warning";
// import DateRange from "@material-ui/icons/DateRange";
// import LocalOffer from "@material-ui/icons/LocalOffer";
// import Update from "@material-ui/icons/Update";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
// import Accessibility from "@material-ui/icons/Accessibility";
// import BugReport from "@material-ui/icons/BugReport";
// import Code from "@material-ui/icons/Code";
// import Cloud from "@material-ui/icons/Cloud";
// core components
import GridItem from "components/Grid/GridItem.jsx";
// import GridContainer from "components/Grid/GridContainer.jsx";
// import Table from "components/Table/Table.jsx";
// import Tasks from "components/Tasks/Tasks.jsx";
// import CustomTabs from "components/CustomTabs/CustomTabs.jsx";
// import Danger from "components/Typography/Danger.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
// import CardIcon from "components/Card/CardIcon.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";

// import { bugs, website, server } from "variables/general.jsx";

// import {
//   dailySalesChart,
//   emailsSubscriptionChart,
//   completedTasksChart
// } from "variables/charts.jsx";

// import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";

class GraphCard extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <GridItem xs={12} sm={12} md={12}>
        <Card chart>
          <CardHeader color={this.props.color}>
            <ChartistGraph
              className={this.props.className}
              data={this.props.data}// 그래프 그리는 부분
              type= {this.props.type}
              options={this.props.options}
              // listener={this.props.animation}
            />
          </CardHeader>
          <CardBody>
            <h4 className={classes.cardTitle}>{this.props.name}</h4>
            <p className={classes.cardCategory}>
              <span className={classes.successText}>
                <ArrowUpward className={classes.upArrowCardCategory} /> {this.props.value}
                {/* 마지막 센싱했을 때와의 값의 차이를 보여주면 좋을 듯 */}
              </span>{" "}
              {this.props.advice}
            </p>
          </CardBody>
          <CardFooter chart>
            <div className={classes.stats}>
              <AccessTime /> {this.props.updateTime}
            </div>
            {/* 업데이트 시간 넣으면 좋을 듯  */}
          </CardFooter>
        </Card>
      </GridItem>
    );
  }
}

export default GraphCard;