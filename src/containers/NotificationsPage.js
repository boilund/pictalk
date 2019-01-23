import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';
import Header from './Header';
import * as actions from '../actions';
import { connect } from 'react-redux';

const styles = theme => ({
  root: {
    flexGrow: 1,
    overflow: 'hidden',
    padding: `0 ${theme.spacing.unit * 3}px`,
    marginTop: theme.spacing.unit * 10
  },
  paper: {
    maxWidth: 800,
    margin: `${theme.spacing.unit}px auto`,
    padding: theme.spacing.unit * 2
  },
  title: {
    margin: `${theme.spacing.unit * 4}px 0 ${theme.spacing.unit * 2}px`
  }
});

class NotificationsPage extends React.Component {
  componentDidMount() {
    this.props.fetchUnreadPhotos();
  }

  render() {
    const { classes } = this.props;

    return (
      <Fragment>
        <Header />
        <main>
          <Grid container spacing={16} className={classes.root}>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <Grid container spacing={16}>
                  <Grid item xs={12}>
                    <Typography variant="h6" className={classes.title}>
                      Your unread item is here
                    </Typography>
                    <div className={classes.demo}>
                      <List>
                        <ListItem>
                          <ListItemAvatar>
                            <Avatar>
                              <FolderIcon />
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemAvatar>
                            <Avatar>
                              <FolderIcon />
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText
                            primary="Single-line item"
                            secondary="Secondary text"
                          />
                          <ListItemSecondaryAction>
                            <IconButton aria-label="Delete">
                              <DeleteIcon />
                            </IconButton>
                          </ListItemSecondaryAction>
                        </ListItem>
                      </List>
                    </div>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </main>
      </Fragment>
    );
  }
}

NotificationsPage.propTypes = {
  classes: PropTypes.object.isRequired,
  fetchUnreadPhotos: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => {
  return {
    fetchUnreadPhotos: () => dispatch(actions.fetchUnreadPhotos())
  };
};

export default connect(
  null,
  mapDispatchToProps
)(withStyles(styles)(NotificationsPage));
