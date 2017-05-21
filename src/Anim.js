import React, { Component, PropTypes } from 'react';
import { Animated, View, Image, Text } from 'react-native';

import createDrivenComponent from './createDrivenComponent';

class Anim extends Component {
  static propTypes = {
    driver: PropTypes.instanceOf(Animated.Value).isRequired,
    // eslint-disable-next-line
    params: PropTypes.any,      // Params can be anything they are passed on the way they are received
    children: PropTypes.element.isRequired,
  };

  static childContextTypes = {
    animationDriver: PropTypes.instanceOf(Animated.Value).isRequired,
    animationDriverParams: PropTypes.any,
  };

  getChildContext() {
    return {
      animationDriver: this.props.driver,
      animationDriverParams: this.props.params,
    };
  }

  render() {
    return React.Children.only(this.props.children);
  }
}

// Create the stock components already
Anim.View = createDrivenComponent(View, Animated.View);
Anim.Image = createDrivenComponent(Image, Animated.Image);
Anim.Text = createDrivenComponent(Text, Animated.Text);

export default Anim;
