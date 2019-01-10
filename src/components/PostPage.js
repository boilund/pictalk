import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Steps from './Steps';
import StepAddPhoto from './StepAddPhoto';
import Loading from './Loading';
import Album from '../containers/Album';

const styles = theme => ({
  root: {
    width: '90%'
  },
  backButton: {
    marginRight: theme.spacing.unit
  },
  instructions: {
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2
  },
  preview: {
    width: '300px',
    height: '300px',
    backgroundSize: ' cover',
    backgroundRepeat: ' no-repeat',
    backgroundPosition: 'center'
  }
});

const getSteps = () => {
  return ['Select a photo', 'Write description', 'Submit'];
};

class PostPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeStep: 0,
      uploading: false,
      file: null,
      images: []
    };
    this.handleChange = this.handleChange.bind(this);
  }

  getStepContent = stepIndex => {
    switch (stepIndex) {
      case 0:
        return (
          <StepAddPhoto
            handleChange={this.handleChange}
            file={this.state.file}
          />
        );
      case 1:
        return 'What is an ad group anyways?';
      case 2:
        return 'This is the bit I really care about!';
      default:
        return 'Unknown stepIndex';
    }
  };

  handleNext = () => {
    this.setState({
      activeStep: this.state.activeStep + 1
    });
  };

  handleBack = () => {
    this.setState({
      activeStep: this.state.activeStep - 1
    });
  };

  handleReset = () => {
    this.setState({
      activeStep: 0
    });
  };

  handleChange = e => {
    this.setState({
      file: URL.createObjectURL(e.target.files[0])
    });

    // TODO: Save image to database
    // const formData = new FormData();
    // formData.append('id', user._id);
    // formData.append('file', e.target.files[0]);
    // this.props.setGroupImage(formData);
  };

  render() {
    const { classes } = this.props;
    const steps = getSteps();
    const { activeStep, uploading, images } = this.state;

    const content = () => {
      switch (true) {
        case uploading:
          return <Loading />;
        case images.length > 0:
          return <Album images={images} removeImage={this.removeImage} />;
        default:
          return (
            <Steps
              steps={steps}
              activeStep={activeStep}
              getStepContent={this.getStepContent}
              handleChange={this.handleChange}
              handleNext={this.handleNext}
              handleBack={this.handleBack}
              handleReset={this.handleReset}
            />
          );
      }
    };

    return <main>{content()}</main>;
  }
}

PostPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PostPage);
