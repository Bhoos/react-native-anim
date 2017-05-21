import React, { Component, PropTypes } from 'react';
import { Animated, View, StyleSheet } from 'react-native';

import Anim from 'react-native-anim';

import NavBar from './NavBar';
import Header from './Header';
import { backgroundAnim } from './animations';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    position: 'absolute',
    width: '100%',
    height: 400,
    resizeMode: 'cover',
  },
});

class ParallaxScrollView extends Component {
  static propTypes = {
    user: PropTypes.shape({
      name: PropTypes.string,
      image: PropTypes.string,
      title: PropTypes.string,
    }),
    navBarTitle: PropTypes.string,
    children: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.arrayOf(PropTypes.node),
    ]),
  };

  constructor(props) {
    super(props);

    this.state = {
      scrollY: new Animated.Value(0),
    };
  }

  render() {
    const { scrollY } = this.state;
    const { user, navBarTitle, children } = this.props;

    return (
      <Anim driver={scrollY}>
        <View style={styles.container}>
          <Anim.Image animation={backgroundAnim} style={styles.background} source={{ uri: 'https://i.imgur.com/6Iej2c3.png' }} />
          <NavBar title={navBarTitle} />
          <Animated.ScrollView
            scrollEventThrottle={16}
            onScroll={Animated.event([
              { nativeEvent: { contentOffset: { y: scrollY } } }
            ], { useNativeDriver: true })}
          >
            <Header name={user.name} avatar={user.image} title={user.title} />
            {children}
          </Animated.ScrollView>
        </View>
      </Anim>
    );
  }
}

export default ParallaxScrollView;
