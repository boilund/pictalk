import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Header from '../components/Header';
import Alert from '../components/Alert';

import * as actions from '../actions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit
  },
  submit: {
    marginTop: theme.spacing.unit * 3
  },
  noUnderLine: {
    textDecoration: 'none'
  }
});

const initialState = {
  email: '',
  password: '',
  alert: false
};

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  componentWillUnmount() {
    this.setState(initialState);
  }

  handleEmailChange = e => {
    this.setState({
      email: e.target.value
    });
  };

  handlePasswordChange = e => {
    this.setState({
      password: e.target.value
    });
  };

  handleSignUpSubmit = e => {
    e.preventDefault();
    const { email, password } = this.state;
    this.props.requestData();

    axios
      .post('/api/login', {
        email,
        password
      })
      .then(res => {
        this.props.setUser(res.data.user);
        this.props.receiveRequestData();
        this.props.history.push('/');
      })
      .catch(err => {
        this.setState({ alert: true });
        this.props.receiveDataFailed();
        console.error(new Error(err));
      });
  };

  render() {
    const { classes } = this.props;
    const { alert } = this.state;

    return (
      <Fragment>
        <Header />
        <main className={classes.main}>
          <Paper className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Login
            </Typography>
            <form
              className={classes.form}
              onSubmit={e => this.handleSignUpSubmit(e)}
            >
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="email">Email Address</InputLabel>
                <Input
                  id="email"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  onChange={e => this.handleEmailChange(e)}
                />
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input
                  name="password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={e => this.handlePasswordChange(e)}
                />
              </FormControl>
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              {alert && (
                <Alert
                  variant="error"
                  message="Email or password is incorrect!"
                />
              )}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Login
              </Button>
              <Link to="/signup" className={classes.noUnderLine}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="secondary"
                  className={classes.submit}
                >
                  Create an account
                </Button>
              </Link>
            </form>
          </Paper>
        </main>
      </Fragment>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  setUser: PropTypes.func.isRequired,
  requestData: PropTypes.func,
  receiveRequestData: PropTypes.func,
  receiveDataFailed: PropTypes.func
};

const mapDispatchToProps = dispatch => {
  return {
    setUser: user => dispatch(actions.setUser(user)),
    requestData: () => dispatch(actions.requestData()),
    receiveRequestData: () => dispatch(actions.receiveRequestData()),
    receiveDataFailed: () => dispatch(actions.receiveDataFailed())
  };
};

const connected = connect(
  null,
  mapDispatchToProps
)(withStyles(styles)(Login));

export default withRouter(connected);
