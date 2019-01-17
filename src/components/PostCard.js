import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import SendIcon from '@material-ui/icons/Send';

const styles = theme => ({
  card: {
    marginBottom: theme.spacing.unit * 3,
    display: 'flex',
    flexDirection: 'column'
  },
  media: {
    height: 0,
    paddingTop: '56.25%' // 16:9
  },
  actions: {
    display: 'flex'
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: 'rotate(180deg)'
  },
  avatar: {
    backgroundColor: red[500]
  },
  username: {
    fontWeight: '600',
    marginRight: theme.spacing.unit
  },
  margin: {
    margin: theme.spacing.unit
  },
  textField: {
    width: '100%'
  }
});

class PostCard extends React.Component {
  state = { expanded: false, comment: '' };

  handleExpandClick = () => {
    this.setState({ expanded: !this.state.expanded });
  };

  handleChangeComment = e => {
    this.setState({ comment: e.target.value });
  };

  handleSendComment = () => {
    const { comment } = this.state;
    const { post, user, addComment, group } = this.props;
    addComment(post._id, user._id, comment, group._id);
    this.setState({ comment: '' });
  };

  render() {
    const { classes, post, members, user } = this.props;
    const postedUser = members.find(member => member._id === post.photographer);

    return (
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Avatar aria-label="Recipe" className={classes.avatar}>
              R
            </Avatar>
          }
          action={
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          }
          title={postedUser.nickname}
          subheader={post.date}
        />
        <CardMedia
          className={classes.media}
          image={`/images/uploads/${post.filename[0]}`}
          title={post.filename}
        />
        <CardContent>
          <Typography component="p">
            <span className={classes.username}>{postedUser.nickname}</span>
            {post.description}
          </Typography>
        </CardContent>
        <CardActions className={classes.actions} disableActionSpacing>
          <IconButton aria-label="Add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="Show photo data">
            <CameraIcon />
          </IconButton>
          <IconButton
            className={classnames(classes.expand, {
              [classes.expandOpen]: this.state.expanded
            })}
            onClick={this.handleExpandClick}
            aria-expanded={this.state.expanded}
            aria-label="Show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
          <CardContent>
            {post.comments.map((comment, i) => (
              <Typography paragraph key={i}>
                <span className={classes.username}>
                  {
                    members.find(member => member._id === comment.sender)
                      .nickname
                  }
                </span>
                {comment.comment}
              </Typography>
            ))}
          </CardContent>
          <CardActions>
            <TextField
              className={classNames(classes.margin, classes.textField)}
              variant="outlined"
              type="text"
              label="Comment..."
              value={this.state.comment}
              onChange={this.handleChangeComment}
              onKeyPress={e => e.key === 'Enter' && this.handleSendComment()}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="Send comment"
                      onClick={this.handleSendComment}
                    >
                      <SendIcon />
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
          </CardActions>
        </Collapse>
      </Card>
    );
  }
}

PostCard.propTypes = {
  classes: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  members: PropTypes.arrayOf(PropTypes.object),
  addComment: PropTypes.func.isRequired
};

export default withStyles(styles)(PostCard);
