import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Steps from './Steps';
import StepAddPhoto from './StepAddPhoto';
import StepAddText from './StepAddText';
import Loading from './Loading';
import Album from '../containers/Album';
import Header from '../containers/Header';
import axios from 'axios';

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
      files: [],
      images: [],
      description: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
  }

  getStepContent = stepIndex => {
    switch (stepIndex) {
      case 0:
        return (
          <StepAddPhoto
            handleChange={this.handleChange}
            files={this.state.files}
          />
        );
      case 1:
        return (
          <StepAddText
            handleTextChange={this.handleTextChange}
            description={this.state.description}
          />
        );
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

  handleChange = async e => {
    // preview
    this.setState({
      files: Array.from(e.target.files, file => URL.createObjectURL(file))
    });

    // save file to database
    const files = Array.from(e.target.files);
    this.setState({ uploading: true });

    const formData = new FormData();

    files.forEach(file => {
      formData.append('images', file);
    });

    try {
      const response = await axios.post('/api/image-upload', formData);
    } catch (error) {
      console.error(error);
    }
    this.setState({ uploading: false });
  };

  handleTextChange = e => {
    this.setState({ description: e.target.value });
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
            <Fragment>
              <Header />
              <Steps
                steps={steps}
                activeStep={activeStep}
                getStepContent={this.getStepContent}
                handleChange={this.handleChange}
                handleNext={this.handleNext}
                handleBack={this.handleBack}
                handleReset={this.handleReset}
              />
            </Fragment>
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
