import React from "react";
import PropTypes from "prop-types";
// react plugin for creating charts
// @material-ui/core
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Warning from "@material-ui/icons/Warning";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import Danger from "components/Typography/Danger.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";

class Datacard extends React.Component {
  constructor(props){
    super(props);
    console.log(this.props.facility);
    var onOff = this.props.facility;
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  handleChange = () => event => {
    if (this.onOff === true) {
      console.log(this.onOff);
      this.onOff = false;
      // fetch("https://ip:port/facility/", {  
      //   method: "POST",
      //   headers: {
      //     "Accept": "application/json",
      //     "Content-Type": "application/json"
      //   },
      //   body: JSON.stringify({
      //     firstParam: "yourValue",
      //     secondParam: "yourOtherValue"
      //   })
      // });
    } else{
      console.log(this.onOff);
      this.onOff = true;
      // fetch("https://mywebsite.com/endpoint/", {
      //   method: "POST",
      //   headers: {
      //     "Accept": "application/json",
      //     "Content-Type": "application/json"
      //   },
      //   body: JSON.stringify({
      //     firstParam: "yourValue",
      //     secondParam: "yourOtherValue"
      //   })
      // });
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <GridItem xs>
        <Card>
          <CardHeader color={this.props.color} stats icon>
            <CardIcon color={this.props.color}>
              <Icon>{this.props.icon}</Icon>
            </CardIcon>
            <p className={classes.cardCategory}>{this.props.data}</p>
            <h3 className={classes.cardTitle}>
              {this.props.value} <small>{this.props.unit}</small>
            </h3>
          </CardHeader>
          <CardFooter stats>
            <div className={classes.stats}>
              <Danger>
                <Warning />
              </Danger>
              <a href="#pablo" onClick={e => e.preventDefault()}>
                {this.props.advice}
              </a>
            </div>
            <FormControlLabel
              control={
                <Switch
                  value="checkedA"
                  onChange={this.handleChange()}
                />
              }
              label={this.props.controller}
            />
          </CardFooter>
        </Card>
      </GridItem>
    );
  }
}

Datacard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default Datacard;
