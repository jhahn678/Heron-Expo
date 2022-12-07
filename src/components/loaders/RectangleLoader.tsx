import React, { useEffect, useRef } from 'react'
import { StyleProp, ViewStyle, Animated, StyleSheet, Easing } from 'react-native';

const RectangleLoader = ({
    borderRadius=6,
    ...props
}: {
  width: string | number;
  height: string | number;
  borderRadius?: number
  style?: StyleProp<ViewStyle>;
}) => {
  const pulseAnim = useRef(new Animated.Value(0)).current;
 
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1250,
          useNativeDriver: true,
          easing: Easing.out(Easing.ease),
        }),
        Animated.timing(pulseAnim, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
          easing: Easing.in(Easing.ease),
        })
      ])
    ).start();
 
    return () => pulseAnim.stopAnimation();

  }, []);
 
  return (
    <Animated.View
      style={[
        styles.container,
        { width: props.width, height: props.height, borderRadius },
        { opacity: pulseAnim },
        props.style,
      ]}
    />
  );
};

export default RectangleLoader

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#e3e3e3'
    }
});