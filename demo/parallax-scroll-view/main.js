import Expo from 'expo';
import React from 'react';
import { StyleSheet, View, Dimensions, StatusBar } from 'react-native';
import { List, ListItem } from 'react-native-elements';

import ParallaxScrollView from './src/ParallaxScrollView';
import { NAV_HEIGHT, USER, FACEBOOK_LIST, SLACK_LIST, GENERIC_LIST } from './constants';

const SCREEN_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    backgroundColor: 'rgba(247,247, 250, 1)',
  },
});

class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <StatusBar translucent barStyle="light-content" />
        <ParallaxScrollView navBarTitle={USER.name} user={USER}>
          <View style={styles.body}>
            <List>
              { FACEBOOK_LIST.map((item, index) => (
                <ListItem key={index} title={item.title} leftIcon={{ name: item.icon }} />
              ))}
            </List>
            <List>
              { SLACK_LIST.map((item, index) => (
                <ListItem key={index} title={item.title} leftIcon={{ name: item.icon }} />
              ))}
            </List>
            <List>
              { GENERIC_LIST.map((item, index) => (
                <ListItem key={index} title={item.title} leftIcon={{ name: item.icon }} />
              ))}
            </List>
            <List containerStyle={{ marginBottom: 15 }}>
              <ListItem
                key={1}
                hideChevron
                title="LOGOUT"
                icon={{ name: '' }}
              />
            </List>
          </View>
        </ParallaxScrollView>
      </View>
    );
  }
}

Expo.registerRootComponent(App);
