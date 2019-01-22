import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import * as actions from '../actions';
import { connect } from 'react-redux';

const styles = {};

class CommentPage extends React.Component {
  componentDidMount() {
    this.props.fetchUnreadPhotos();
  }

  render() {
    const { classes } = this.props;

    return (
      <main>
        <Typography
          variant="h6"
          align="inherit"
          color="textPrimary"
          gutterBottom
        >
          CommentPage
        </Typography>
      </main>
    );
  }
}

CommentPage.propTypes = {
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
)(withStyles(styles)(CommentPage));
