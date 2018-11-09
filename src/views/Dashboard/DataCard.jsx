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
  state = {
    onOff:this.props.onOff
  };

  handleChange = () => event => {
    this.setState({
      onOff: !this.state.onOff
    });
    this.updateFile();
  };

  async updateFile(fileName, content) {
    var url = "http://10.251.100.101:8888/";
    url = url.concat(this.props.controller.toLowerCase());
    console.log(url);
    if(this.state.onOff === true){
      url = url.concat("/0");
      fetch(url);
    } else {
      url = url.concat("/1");
      fetch(url);
    }
  }

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
                바깥날씨와 비교?
              </a>
            </div>
            <FormControlLabel
              control={
                <Switch checked={this.state.onOff} onChange={this.handleChange()} />
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
