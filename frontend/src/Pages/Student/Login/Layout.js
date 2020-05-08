import React, { Component } from 'react';
import { Card, withStyles, MobileStepper } from '@material-ui/core';
import useStyles from './Style';
import EmailForm from './LoginForm/Email';
import PasswordForm from './LoginForm/Password';

class StudentLogin extends Component {
  state = {
    step: 1,
    enrollmentId: '',
    password: '',
  };

  componentDidMount() {
    document.title = 'Sign in - Students Accounts';
  }

  // Proceed to Next Step
  handleNextStep = () => {
    const { step } = this.state;
    this.setState({
      step: step + 1,
    });
  };

  // Go back to prev Step
  handlePrevStep = () => {
    const { step } = this.state;
    this.setState({
      step: step - 1,
    });
  };

  // Handle Field Change Event
  handleFieldChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    const { classes } = this.props;
    const { step, enrollmentId, password } = this.state;
    const values = { enrollmentId, password };

    return (
      <div className={classes.root}>
        {step === 1 && (
          <Card className={classes.Card}>
            <EmailForm
              nextStep={this.handleNextStep}
              handleChange={this.handleFieldChange}
              values={values}
            />
            <MobileStepper
              position='static'
              style={{ flexGrow: 1 }}
              variant='progress'
              steps={3}
              activeStep={1}
            />
          </Card>
        )}
        {step === 2 && (
          <Card className={classes.Card}>
            <PasswordForm
              prevStep={this.handlePrevStep}
              handleChange={this.handleFieldChange}
              values={values}
            />
            <MobileStepper
              position='static'
              variant='progress'
              steps={3}
              style={{ flexGrow: 1 }}
              activeStep={2}
            />
          </Card>
        )}
      </div>
    );
  }
}

export default withStyles(useStyles)(StudentLogin);
