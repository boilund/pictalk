import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import axios from 'axios';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  }
});

const Settings = props => {
  const { classes, user, history } = props;

  const logout = () => {
    axios.get('/api/logout').then(res => {
      if (res.data.success) {
        props.history.push('/login');
      }
    });
  };

  return (
    <main>
      <Typography variant="h6" align="inherit" color="textPrimary" gutterBottom>
        Settings {user.nickname}
        <Button
          variant="outlined"
          color="secondary"
          className={classes.button}
          onClick={() => logout()}
        >
          Logout
        </Button>
      </Typography>
    </main>
  );
};

Settings.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

const connected = connect(
  mapStateToProps,
  null
)(withStyles(styles)(Settings));

export default withRouter(connected);
