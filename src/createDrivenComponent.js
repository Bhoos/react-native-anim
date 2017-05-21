import React, { Component, PropTypes } from 'react';
import { Animated } from 'react-native';

function getAnimatedStyles(animation, { animationDriver, animationDriverParams }) {
  if (!Array.isArray(animation)) {
    return animation(animationDriver, animationDriverParams);
  }

  const style = {};

  // Iterate through all the animations, and stack up the transforms,
  // We can't use StyleSheet.flatten as the transforms needs to be concatenated
  animation.forEach((a) => {
    const aStyle = a(animationDriver, animationDriverParams);
    const { transform, ...other } = aStyle;
    if (transform) {
      style.transform = style.transform ? style.transform.concat(transform) : transform;
    }
    Object.assign(style, other);
  });

  return style;
}

export default function createDrivenComponent(Comp, generic) {
  const AnimatedComp = generic || Animated.createAnimatedComponent(Comp);

  class Driven extends Component {
    static contextTypes = {
      animationDriver: PropTypes.oneOfType([
        PropTypes.instanceOf(Animated.Value),
        PropTypes.instanceOf(Animated.Interpolation),
      ]).isRequired,
      animationParams: PropTypes.any,
    };

    static propTypes = {
      // eslint-disable-next-line react/forbid-prop-types
      style: PropTypes.any,
      animation: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.arrayOf(PropTypes.func),
      ]),
    }

    constructor(props, context) {
      super(props, context);

      const { style, animation } = props;

      this.state = {
        animationStyles: animation ? [style, getAnimatedStyles(animation, context)] : false,
      };
    }

    componentWillReceiveProps(props) {
      const { style, animation } = props;
      this.setState({
        animationStyles: animation ? [style, getAnimatedStyles(animation, this.context)] : style,
        animated: !!animation,
      });
    }

    render() {
      const { style, ...other } = this.props;
      const { animationStyles } = this.state;
      if (animationStyles) {
        return <AnimatedComp style={animationStyles} {...other} />;
      }

      return <Comp style={style} {...other} />;
    }
  }

  return Driven;
}

