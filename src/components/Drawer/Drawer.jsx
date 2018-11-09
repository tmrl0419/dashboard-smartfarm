import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Slider, { Range } from 'rc-slider';
import Tooltip from 'rc-tooltip';
import 'rc-slider/assets/index.css';


const styles = theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
  },
  texting: {
    fontSize: theme.typography.pxToRem(15),
    align: 'center',
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  icon: {
    verticalAlign: 'bottom',
    height: 20,
    width: 20,
  },
  details: {
    alignItems: 'center',
  },
  column: {
    flexBasis: '33.33%',
  },
  slide: {
    flexBasis: '33.33%',
    padding:'0% 0% 2% 2%'
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
});



function DetailedExpansionPanel(props) {
  const { classes } = props;
  const createSliderWithTooltip = Slider.createSliderWithTooltip;
  const Range = createSliderWithTooltip(Slider.Range);
  var tempHigh = props.tempHigh;
  var tempLow = props.tempLow;
  var humidityHigh= props.humidityHigh;
  var humidityLow= props.humidityLow;
  var lightHigh= props.lightHigh;
  var lightLow= props.lightLow;
  console.log(tempHigh,tempLow,humidityHigh,humidityLow,lightHigh,lightLow);

  return (
    <div className={classes.root}>
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <div className={classes.column}>
            <Typography className={classes.heading}>Auto Mode</Typography>
          </div>
          <div className={classes.column}>
            <Typography className={classes.secondaryHeading}>Adjust Range you want to maintain for plant</Typography>
          </div>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.details}>
          <div className={classes.slide}>
            <Typography className={classes.texting}>Temperature</Typography>
            <Range
              min={0}
              max={100}
              defaultValue={[20, 40]}
              allowCross
              onChange={newVal => {
                tempLow = newVal[0];
                tempHigh = newVal[1];
              }}
            />
          </div>
          <div className={classes.slide}>
            <Typography className={classes.heading}>Humidity</Typography>
            <Range
              min={0}
              max={100}
              defaultValue={[20, 40]}
              allowCross
              onChange={newVal => {
                humidityLow = newVal[0];
                humidityHigh = newVal[1];
              }}
            />
          </div>
          <div className={classes.slide}>
          <Typography className={classes.heading}>Light</Typography>
            <Range
              min={0}
              max={100}
              defaultValue={[20, 40]}
              allowCross
              onChange={newVal => {
                lightLow = newVal[0];
                lightHigh = newVal[1];
              }}
            />
          </div>
        </ExpansionPanelDetails>
        <Divider />
        <ExpansionPanelActions>
          <Button size="small">Cancel</Button>
          <Button size="small" color="primary"
            onClick={() =>console.log(tempHigh,tempLow,humidityHigh,humidityLow,lightHigh,lightLow)}>
            Save
          </Button>
        </ExpansionPanelActions>
      </ExpansionPanel>
    </div>
  );
}

export default withStyles(styles)(DetailedExpansionPanel);