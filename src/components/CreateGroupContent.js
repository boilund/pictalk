import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import green from '@material-ui/core/colors/green';

const styles = theme => ({
  addIcon: {
    margin: theme.spacing.unit,
    backgroundColor: green[500]
  }
});

const CreateGroupContent = props => {
  const { classes } = props;
  return (
    <Fragment>
      <Avatar className={classes.addIcon}>
        <AddIcon />
      </Avatar>
      <Typography variant={'subtitle1'}>Create group</Typography>
    </Fragment>
  );
};

CreateGroupContent.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CreateGroupContent);
