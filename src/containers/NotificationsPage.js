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
import ForwardIcon from '@material-ui/icons/Forward';
import Header from './Header';
import ImageAvatar from '../components/ImageAvatar';
import LetterAvatar from '../components/LetterAvatar';
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
    maxWidth: 600,
    margin: `${theme.spacing.unit}px auto`,
    padding: theme.spacing.unit * 2
  },
  title: {
    margin: `${theme.spacing.unit * 4}px ${theme.spacing.unit * 2}px ${theme
      .spacing.unit * 2}px`
  },
  thumbnail: {
    margin: '0 auto',
    width: '50px',
    height: '50px',
    backgroundSize: ' contain',
    backgroundRepeat: ' no-repeat',
    backgroundPosition: 'center'
  }
});

class NotificationsPage extends React.Component {
  componentDidMount() {
    this.props.fetchUnreadPhotos();
  }

  render() {
    const { classes, unreadPhotos } = this.props;

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
                    {unreadPhotos.map((item, i) => (
                      <List key={i}>
                        <ListItem button>
                          <ListItemAvatar>
                            {item.postedGroup.image ? (
                              <ImageAvatar
                                alt={item.postedGroup.name}
                                image={`/avatarUploads/${
                                  item.postedGroup.image
                                }`}
                              />
                            ) : (
                              <LetterAvatar
                                nickname={item.postedGroup.name}
                                color={'default'}
                              />
                            )}
                          </ListItemAvatar>
                          <ListItemAvatar>
                            {item.photographer.image ? (
                              <ImageAvatar
                                alt={item.photographer.nickname}
                                image={`/avatarUploads/${
                                  item.photographer.image
                                }`}
                              />
                            ) : (
                              <LetterAvatar
                                nickname={item.photographer.nickname}
                                color={item.photographer.avatarColor}
                              />
                            )}
                          </ListItemAvatar>
                          <ListItemText
                            primary={item.photographer.nickname}
                            secondary={item.description}
                          />
                          {item.filename.map((file, i) => {
                            return (
                              <ListItemIcon key={i}>
                                <img
                                  className={classes.thumbnail}
                                  alt={file}
                                  src={`/images/uploads/${file}`}
                                />
                              </ListItemIcon>
                            );
                          })}
                          <ListItemSecondaryAction>
                            <IconButton aria-label="Forward">
                              <ForwardIcon />
                            </IconButton>
                          </ListItemSecondaryAction>
                        </ListItem>
                      </List>
                    ))}
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

const mapStateToProps = state => {
  return {
    unreadPhotos: state.user.unreadPhotos
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchUnreadPhotos: () => dispatch(actions.fetchUnreadPhotos())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(NotificationsPage));
