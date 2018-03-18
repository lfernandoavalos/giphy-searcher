import React, { Component } from 'react';
import PropTypes from 'prop-types';

class AsyncComponent extends Component {
  state = {
    LoadedComponent: null,
  };

  componentDidMount() {
    if (!this.state.Component) {
      this.props.moduleProvider().then((component) => {
        this.setState({ LoadedComponent: component.default });
      });
    }
  }

  render() {
    const { LoadedComponent } = this.state;

    return LoadedComponent ? <LoadedComponent /> : null;
  }
}

AsyncComponent.propTypes = {
  moduleProvider: PropTypes.func.isRequired,
};

export default AsyncComponent;
