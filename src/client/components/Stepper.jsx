import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  stepper: {
    background: 'transparent',
  },
  stepIcon: {
    color: '#00344d !important',
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
  },
}));

const VerticalLinearStepper = ({
  steps, stepsContent, activeStep,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Stepper className={classes.stepper} activeStep={activeStep} orientation="vertical">
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel
              StepIconProps={{
                classes: {
                  active: classes.stepIcon,
                  completed: classes.stepIcon,
                },
              }}
            >
              {label}
            </StepLabel>
            <StepContent>
              <Typography>{stepsContent[index]}</Typography>
            </StepContent>
          </Step>
        ))}
      </Stepper>
    </div>
  );
};

export default VerticalLinearStepper;

VerticalLinearStepper.propTypes = {
  activeStep: PropTypes.number.isRequired,
  steps: PropTypes.arrayOf(PropTypes.string).isRequired,
  stepsContent: PropTypes.arrayOf(PropTypes.string).isRequired,
};
