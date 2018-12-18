import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';

const styles = {};

const FavoritePage = props => {
  const { classes } = props;

  return (
    <main>
      <Typography variant="h6" align="inherit" color="textPrimary" gutterBottom>
        FavoritePage
      </Typography>
    </main>
  );
};

FavoritePage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(FavoritePage);
