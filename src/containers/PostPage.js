import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Steps from '../components/Steps';
import StepAddPhoto from '../components/StepAddPhoto';
import StepAddText from '../components/StepAddText';
import Loading from '../components/Loading';
import Album from './Album';
import Header from './Header';
import axios from 'axios';
import * as actions from '../actions';
import { connect } from 'react-redux';

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
      formData: {},
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
            files={this.state.files}
          />
        );
      case 2:
        return '';
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

  handleSubmit = async () => {
    const { group, history, changeGroup } = this.props;
    const { formData, description } = this.state;
    formData.append('groupId', group._id);
    formData.append('description', description);

    this.setState({
      uploading: true,
      formData
    });

    try {
      const response = await axios.post('/api/image-upload', formData);
      if (response.data.success) {
        changeGroup(group._id);
        this.setState({ uploading: false });
        history.push('/');
      }
    } catch (error) {
      console.error(error);
    }
  };

  handleChange = e => {
    // preview
    this.setState({
      files: Array.from(e.target.files, file => URL.createObjectURL(file))
    });

    // make formData in order to save files to database when submitting
    const files = Array.from(e.target.files);
    const formData = new FormData();

    files.forEach(file => {
      formData.append('images', file);
    });

    this.setState({ formData });
  };

  handleTextChange = e => {
    this.setState({ description: e.target.value });
  };

  render() {
    const { classes } = this.props;
    const steps = getSteps();
    const { activeStep, uploading } = this.state;

    const content = () => {
      switch (true) {
        case uploading:
          return <Loading />;
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
                handleSubmit={this.handleSubmit}
              />
            </Fragment>
          );
      }
    };

    return <main>{content()}</main>;
  }
}

PostPage.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  group: PropTypes.object.isRequired,
  changeGroup: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    group: state.group
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeGroup: groupId => dispatch(actions.changeGroup(groupId))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(PostPage));
