import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import InfoIcon from '@material-ui/icons/Info';
import FavoriteIcon from '@material-ui/icons/Favorite';
import pink from '@material-ui/core/colors/pink';
import Header from './Header';

import * as actions from '../actions';
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
  favorite: {
    color: pink[500]
  }
});

class FavoritePage extends React.Component {
  componentDidMount() {
    this.props.fetchFavoritePhotos();
  }

  getGridListCols = () => {
    if (isWidthUp('xl', this.props.width)) {
      return 4;
    }
    if (isWidthUp('sm', this.props.width)) {
      return 3;
    }
    return 2;
  };

  render() {
    const { classes, user } = this.props;

    return (
      <Fragment>
        <Header />
        <main>
          <div className={classes.root}>
            <GridList
              cellHeight={180}
              className={classes.gridList}
              cols={this.getGridListCols()}
            >
              {user.favorites.map(photo => (
                <GridListTile key={photo.filename}>
                  <img
                    src={`/images/uploads/${photo.filename[0]}`}
                    alt={photo.description}
                  />
                  <GridListTileBar
                    title={photo.description}
                    subtitle={
                      <span>
                        in: {photo.postedGroup.name}, by:{' '}
                        {photo.photographer.nickname}
                      </span>
                    }
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
  }
}

FavoritePage.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchFavoritePhotos: () => dispatch(actions.fetchFavoritePhotos())
  };
};

const connected = connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(FavoritePage));

export default withWidth()(connected);
