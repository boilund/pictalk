import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

const styles = {};

const Settings = props => {
  const { classes, user } = props;

  return (
    <main>
      <Typography variant="h6" align="inherit" color="textPrimary" gutterBottom>
        Settings {user.nickname}
      </Typography>
    </main>
  );
};

Settings.propTypes = {
  classes: PropTypes.object.isRequired,
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
