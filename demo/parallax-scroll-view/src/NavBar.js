import React, { PropTypes } from 'react';
import { StyleSheet, View, Platform, Text } from 'react-native';
import Anim from 'react-native-anim';

import { Icon } from 'react-native-elements';

import { navBarAnim } from './animations';

const styles = StyleSheet.create({
  container: {
    height: (Platform.OS === 'android' && Platform.Version < 21) ? 45 : 65,
    paddingTop: (Platform.OS === 'android' && Platform.Version < 21) ? 0 : 20,
    width: '100%',
    flexDirection: 'row',
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: 'black',
  },
  title: {
    flex: 1,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    backgroundColor: 'transparent',
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  icon: {
    width: 45,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const NavBar = ({ title }) => (
  <View style={styles.container}>
    <Anim.View style={styles.background} animation={navBarAnim} />
    <View style={styles.icon}>
      <Icon name="menu" type="simple-line-icon" color="white" size={23} underlayColor="transparent" />
    </View>
    <Anim.View style={styles.title} animation={navBarAnim}>
      <Text style={styles.titleText}>{title}</Text>
    </Anim.View>
    <View style={styles.icon}>
      <Icon name="present" type="simple-line-icon" color="white" size={23} underlayColor="transparent" />
    </View>
  </View>
);

NavBar.propTypes = {
  title: PropTypes.string.isRequired,
};

export default NavBar;
