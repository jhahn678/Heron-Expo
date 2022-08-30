import { StyleSheet } from 'react-native'
import React from 'react'
import { Button } from 'react-native-paper'

const AppleLoginButton = () => {
  return (
    <Button 
        buttonColor='white'
        theme={{ roundness: 2 }}
        style={styles.container}
        icon='apple'
    >
        Continue with Apple
    </Button>
  )
}

export default AppleLoginButton

const styles = StyleSheet.create({
    container: {
        marginTop: 8,
        width: '100%',
        height: 48,
        display: 'flex',
        justifyContent: 'center',
    }
})