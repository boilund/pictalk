import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import ImageAvatar from './ImageAvatar';

const defaultImg = '/images/default-group.svg';

const UploadImage = props => {
  return (
    <div>
      <ImageAvatar size="Lg" alt="group image" image={props.file} />
      <input type="file" name="file" onChange={props.handleFileChange} />
    </div>
  );
};

UploadImage.propTypes = {
  handleFileChange: PropTypes.func.isRequired,
  file: PropTypes.string.isRequired
};

export default UploadImage;
