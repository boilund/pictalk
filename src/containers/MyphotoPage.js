import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import InfoIcon from '@material-ui/icons/Info';
import Header from './Header';
import { connect } from 'react-redux';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
    marginTop: theme.spacing.unit * 10
  },
  gridList: {
    width: 800,
    height: 'auto'
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)'
  }
});

const MyphotoPage = props => {
  const { classes, user } = props;

  const getGridListCols = () => {
    if (isWidthUp('xl', props.width)) {
      return 4;
    }
    if (isWidthUp('sm', props.width)) {
      return 3;
    }
    return 2;
  };

  return (
    <Fragment>
      <Header />
      <main>
        <div className={classes.root}>
          <GridList
            cellHeight={180}
            className={classes.gridList}
            cols={getGridListCols()}
          >
            {user.photos.map(photo => (
              <GridListTile key={photo.filename}>
                <img
                  src={`/images/uploads/${photo.filename[0]}`}
                  alt={photo.description}
                />
                <GridListTileBar
                  title={photo.description}
                  subtitle={<span>in: {photo.postedGroup.name}</span>}
                  actionIcon={
                    <IconButton className={classes.icon}>
                      <InfoIcon />
                    </IconButton>
                  }
                />
              </GridListTile>
            ))}
          </GridList>
        </div>
      </main>
    </Fragment>
  );
};

MyphotoPage.propTypes = {
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
)(withStyles(styles)(MyphotoPage));

export default withWidth()(connected);
