import React, { useEffect, useRef } from 'react'
import { StyleProp, ViewStyle, Animated, StyleSheet, Easing } from 'react-native';

interface Props {
  width: number
  height: number
  borderRadius?: number
  style?: StyleProp<ViewStyle>
}

const RectangleLoader = ({ borderRadius=6, ...props }: Props) => {
  const pulseAnim = useRef(new Animated.Value(0)).current;
 
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1200,
          useNativeDriver: true,
          easing: Easing.out(Easing.ease),
        }),
        Animated.timing(pulseAnim, {
          toValue: 0,
          duration: 200,
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