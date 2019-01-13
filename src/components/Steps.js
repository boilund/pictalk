import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    margin: 'auto',
    marginTop: theme.spacing.unit * 5,
    maxWidth: 1000,
    minHeight: 650
  },
  stepContent: {
    width: '80%',
    height: '80%',
    margin: '0 auto'
  }
});

const Steps = props => {
  const {
    classes,
    steps,
    activeStep,
    getStepContent,
    handleNext,
    handleBack,
    handleReset
  } = props;

  return (
    <main className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <Typography
              variant="h6"
              align="inherit"
              color="textPrimary"
              gutterBottom
              className={classes.instructions}
            >
              Post a picture
            </Typography>
            <div className={classes.root}>
              <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map(label => {
                  return (
                    <Step key={label}>
                      <StepLabel>{label}</StepLabel>
                    </Step>
                  );
                })}
              </Stepper>
              <div className={classes.stepContent}>
                {activeStep === steps.length ? (
                  <div>
                    <Typography className={classes.instructions}>
                      All steps completed
                    </Typography>
                    <Button onClick={() => handleReset()}>Reset</Button>
                  </div>
                ) : (
                  <div>
                    {getStepContent(activeStep)}
                    <div>
                      <Button
                        disabled={activeStep === 0}
                        onClick={() => handleBack()}
                        className={classes.backButton}
                      >
                        Back
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleNext()}
                      >
                        {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Grid>
        </Grid>
      </Paper>
    </main>
  );
};

Steps.propTypes = {
  classes: PropTypes.object.isRequired,
  steps: PropTypes.array.isRequired,
  activeStep: PropTypes.number.isRequired,
  getStepContent: PropTypes.func.isRequired,
  handleNext: PropTypes.func.isRequired,
  handleBack: PropTypes.func.isRequired,
  handleReset: PropTypes.func.isRequired
};

export default withStyles(styles)(Steps);
