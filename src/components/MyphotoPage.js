import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';

const styles = {};

const MyphotoPage = props => {
  const { classes } = props;

  return (
    <main>
      <Typography variant="h6" align="inherit" color="textPrimary" gutterBottom>
        MyphotoPage
      </Typography>
    </main>
  );
};

MyphotoPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MyphotoPage);
