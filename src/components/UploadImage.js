import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import ImageAvatar from './ImageAvatar';

const defaultImg = '/images/default-group.svg';

class UploadImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: defaultImg
    };
    this.handleFileChange = this.handleFileChange.bind(this);
  }

  handleFileChange(e) {
    this.setState({
      file: URL.createObjectURL(e.target.files[0])
    });

    // TODO: Save image to database
    // const formData = new FormData();
    // formData.append('id', user._id);
    // formData.append('file', e.target.files[0]);
    // this.props.setGroupImage(formData);
  }

  render() {
    return (
      <div>
        <ImageAvatar size="Lg" alt="group image" image={this.state.file} />
        <input type="file" id="changeImage" onChange={this.handleFileChange} />
      </div>
    );
  }
}

UploadImage.propTypes = {
  setGroupImage: PropTypes.func.isRequired
};

export default UploadImage;
