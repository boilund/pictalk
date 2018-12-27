import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField';
import ImageAvatar from './ImageAvatar';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import EditIcon from '@material-ui/icons/Edit';

const defaultImg = '/imgs/default-group.svg';

const styles = theme => ({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  imageUpload: {
    position: 'relative',
    width: '120px'
  },
  imageEdit: {
    position: 'absolute',
    zIndex: '1',
    top: '-18px',
    right: '43px'
  },
  imageInput: {
    display: 'none'
  },
  imageInputLabel: {
    cursor: 'pointer',
    color: 'black'
  },
  imagePreview: {
    width: '90px',
    height: '90px',
    borderRadius: '50%',
    boxShadow: '0px 2px 4px 0px rgba(0, 0, 0, 0.1)'
  },
  image: {
    borderRadius: '50%',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroudPosition: 'center'
  }
});

class GroupImageName extends React.Component {
  state = {
    groupname: '',
    imgPath: this.props.user.image || defaultImg,
    formData: ''
  };

  onFileChange = e => {
    const { user } = this.props;
    const { imgPath } = this.state;
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = e => {
        this.setState({
          imgPath: e.target.result
        });
      };
      reader.readAsDataURL(e.target.files[0]);

      const formData = new FormData();
      formData.append('id', user._id);
      formData.append('file', e.target.files[0]);
      this.setState({
        formData
      });
    }
  };

  handleChange = (e, title) => {
    this.setState({
      [title]: e.target.value
    });
  };

  render() {
    const { classes } = this.props;
    const { groupname, imgPath } = this.state;

    return (
      <div className={classes.container}>
        <div className={classes.imageUpload}>
          <FormControl className={classes.imageEdit}>
            <Input
              className={classes.imageInput}
              type="file"
              name="image"
              id="changeImage"
              placeholder="image"
              autoComplete="off"
              onChange={e => this.onFileChange(e)}
            />
            <InputLabel
              htmlFor="changeImage"
              className={classes.imageInputLabel}
            >
              <EditIcon />
            </InputLabel>
          </FormControl>
          <div className={classes.imagePreview}>
            <ImageAvatar
              size="Lg"
              alt={groupname}
              image={imgPath}
              className={classes.image}
            />
          </div>
        </div>
        <form noValidate autoComplete="off">
          <TextField
            id="outlined-name"
            label="Group name"
            className={classes.textField}
            value={groupname}
            onChange={e => this.handleChange(e, 'groupname')}
            margin="normal"
            variant="outlined"
          />
        </form>
      </div>
    );
  }
}

GroupImageName.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

export default withStyles(styles)(GroupImageName);
