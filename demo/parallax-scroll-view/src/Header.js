import React, { PropTypes } from 'react';
import { Image, Text, StyleSheet } from 'react-native';

import Anim from 'react-native-anim';

import { headerAnim } from './animations';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 250,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  name: {
    fontSize: 22,
    color: 'white',
    paddingTop: 10,
    paddingBottom: 5,
    textAlign: 'center',
    backgroundColor: 'transparent',
  },
  title: {
    fontSize: 17,
    color: 'rgba(247,247, 250, 1)',
    textAlign: 'center',
    backgroundColor: 'transparent',
  },
});

const Header = ({ avatar, name, title }) => (
  <Anim.View animation={headerAnim} style={styles.container}>
    <Image source={{ uri: avatar }} style={styles.avatar} />
    <Text style={styles.name}>{name}</Text>
    <Text style={styles.title}>{title}</Text>
  </Anim.View>
);

Header.propTypes = {
  avatar: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default Header;
