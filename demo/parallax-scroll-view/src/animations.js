export const backgroundAnim = driver => ({
  transform: [
    { scale: driver.interpolate({
      inputRange: [-250, 0, 250],
      outputRange: [2, 1, 1],
    }) },
    { translateY: driver.interpolate({
      inputRange: [-250, 0, 250],
      outputRange: [0, 0, -100],
    }) },
  ],
});

export const navBarAnim = driver => ({
  opacity: driver.interpolate({
    inputRange: [-250, 150, 300],
    outputRange: [0, 0, 1],
  }),
});

export const headerAnim = driver => ({
  opacity: driver.interpolate({
    inputRange: [-250, 0, 250],
    outputRange: [1, 1, 0],
  }),
});
