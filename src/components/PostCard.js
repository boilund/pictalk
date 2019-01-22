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
import QuestionAnswer from '@material-ui/icons/QuestionAnswer';
import ImageAvatar from './ImageAvatar';
import LetterAvatar from './LetterAvatar';
import { socket } from '../components/App';

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
  },
  marginBottom: {
    marginBottom: '0'
  },
  commentColumn: {
    display: 'flex',
    flexDirection: 'column'
  },
  commentRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
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
    const { post, user } = this.props;
    // send comment to sockets
    socket.emit('comment', {
      sender: user._id,
      post: post._id,
      comment: comment,
      room: post.postedGroup
    });
    // empty field
    this.setState({ comment: '' });
  };

  render() {
    const { classes, post, user } = this.props;
    const { expanded, comment } = this.state;

    return (
      <Card className={classes.card}>
        <CardHeader
          avatar={
            post.photographer.image ? (
              <ImageAvatar
                image={post.photographer.image}
                alt={post.photographer.nickname}
              />
            ) : (
              <LetterAvatar
                nickname={post.photographer.nickname}
                color={post.photographer.avatarColor}
              />
            )
          }
          action={
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          }
          title={post.photographer.nickname}
          subheader={post.date}
        />
        <CardMedia
          className={classes.media}
          image={`/images/uploads/${post.filename[0]}`}
          title={post.filename}
        />
        <CardContent>
          <Typography component="p">
            <span className={classes.username}>
              {post.photographer.nickname}
            </span>
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
              [classes.expandOpen]: expanded
            })}
            onClick={this.handleExpandClick}
            aria-expanded={expanded}
            aria-label="Show more"
          >
            <QuestionAnswer />
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent className={classes.commentColumn}>
            {post.comments.map((comment, i) => (
              <div key={i} className={classes.commentRow}>
                {comment.sender.image ? (
                  <div className={classes.margin}>
                    <ImageAvatar
                      image={comment.sender.image}
                      alt={comment.sender.nickname}
                    />
                  </div>
                ) : (
                  <div className={classes.margin}>
                    <LetterAvatar
                      nickname={comment.sender.nickname}
                      color={comment.sender.avatarColor}
                    />
                  </div>
                )}
                <Typography paragraph key={i} className={classes.marginBottom}>
                  <span className={classes.username}>
                    {comment.sender.nickname}
                  </span>
                  {comment.comment}
                </Typography>
              </div>
            ))}
          </CardContent>
          <CardActions>
            <TextField
              className={classNames(classes.margin, classes.textField)}
              variant="outlined"
              type="text"
              label="Comment..."
              value={comment}
              onChange={this.handleChangeComment}
              onKeyPress={e => e.key === 'Enter' && this.handleSendComment()}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    {user.image ? (
                      <div className={classes.margin}>
                        <ImageAvatar image={user.image} alt={user.nickname} />
                      </div>
                    ) : (
                      <div className={classes.margin}>
                        <LetterAvatar
                          nickname={user.nickname}
                          color={user.avatarColor}
                        />
                      </div>
                    )}
                  </InputAdornment>
                ),
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
  user: PropTypes.object.isRequired
};

export default withStyles(styles)(PostCard);
