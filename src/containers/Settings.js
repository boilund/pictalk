import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import Header from './Header';
import ProfileTable from '../components/ProfileTable';
import GroupTable from '../components/GroupTable';

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

const styles = theme => ({
  root: {
    maxWidth: 1000,
    margin: '0 auto',
    marginTop: theme.spacing.unit * 3,
    display: 'flex',
    flexDirection: 'column'
  },
  clearfix: {
    content: '',
    display: 'block',
    clear: 'both'
  },
  button: {
    margin: theme.spacing.unit,
    float: 'right'
  }
});

class Settings extends React.Component {
  state = {
    value: 0
  };

  handleChange = (e, value) => {
    this.setState({ value });
  };

  logout = () => {
    axios.get('/api/logout').then(res => {
      if (res.data.success) {
        this.props.history.push('/login');
      }
    });
  };

  render() {
    const { classes, user, history } = this.props;
    const { value } = this.state;

    return (
      <Fragment>
        <Header />
        <main>
          <Paper square className={classes.root}>
            <div className={classes.clearfix}>
              <Button
                variant="outlined"
                color="secondary"
                className={classes.button}
                onClick={() => this.logout()}
              >
                Logout
              </Button>
            </div>
            <Tabs
              value={value}
              onChange={this.handleChange}
              variant="fullWidth"
              indicatorColor="secondary"
              textColor="secondary"
            >
              <Tab icon={<PersonPinIcon />} label="Profile" />
              <Tab icon={<PersonPinIcon />} label="Group" />
            </Tabs>
            {value === 0 && <ProfileTable user={user} />}
            {value === 1 && <GroupTable groups={user.groups} />}
          </Paper>
        </main>
      </Fragment>
    );
  }
}

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
