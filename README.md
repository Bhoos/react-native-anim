# react-native-anim
An animation driver for higher level components

The library provides a centralized way to provide an animation
driver (`Animated`.`Value` or its interpolations) to underlying component
that can animate based on a user defined animation methods.

This can be helpful where you want to associate a centralized animation
to its underlying components. For example, while showing a modal dialog, the
components within the underlying dialog could animate based on the show/hide
animation of the Modal Dialog. Or you could implement a parallax scrolling
using the ScrollView's scroll positions.

## Usage:
The `Anim` component is a provider component that provides the animation
driver and hence must be declared as a. Consider the Modal dialog provider
below:

```javascript
  class Modal extends Component {
    state = {
      animation: new Animated.Value(0),
      modalElement: null,
    };

    // This method shows a modal component
    show(element) {
      this.setState({
        modalElement: element,
      });

      // Start the animation
      Animated.spring(this.state.animation, {
        toValue: 1,
      }).start();
    }

    hide() {
      Animated.spring(this.state.animation, {
        toValue: 0,
      }).start(() => {
        this.setState({
          modalElement: null,
        })
      })
    }

    render() {
      return (
        <Anim driver={this.state.animation}>
          <View>
            {this.props.children}
            {this.state.modalElement && 
              <View style={{ position: 'absolute', left: 0, top: 0, right: 0, bottom: 0, alignItems: 'center', justifyContent: 'center'}}>
                {this.state.modalElement}
              </View>
            }
          </View>
        </Anim>
      )
    }
  }
```

The child components that wan't to be displayed (hidden) using
specific type of animation could then use `Anim`.`View`, `Anim`.`Image`
or `Anim`.`Text` components.
```javascript
  const fade = (driver) => ({
    opacity: driver.interpolate({     // The interpolation is not needed here for this example
      inputRange: [0, 1],             // but just to show the way it needs to done.
      outputRange: [0, 1],
    }),
  });

  class Dialog extends Component {
    render() {
      <Anim.View style={{ width: 400, height: 300 }} animation={fade}>
        <Text>This is a dialog</Text>
      <Anim.view>
    }
  }
```

Also checkout a parallax scroll view within the demo folder.

