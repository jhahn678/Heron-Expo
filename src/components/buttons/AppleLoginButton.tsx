import * as AppleAuthentication from 'expo-apple-authentication';
import { useEffect, useState } from 'react';
import { Dimensions, StyleProp, StyleSheet, ViewStyle } from 'react-native'
import { useAppleLogin } from '../../hooks/mutations/useAppleLogin';
import { useAuth } from '../../store/auth/useAuth';
import { RootStackParams, RootStackScreenProps } from '../../types/navigation';
const { width } = Dimensions.get('screen')

interface Props {
  style?: StyleProp<ViewStyle>
  navigation: RootStackScreenProps<keyof RootStackParams>['navigation']
}

const AppleLoginButton = ({ navigation, style }:Props) => {

  const [available, setAvailable] = useState(false)
  const setUser = useAuth(store => store.setUser)
  const signInUser = useAppleLogin()

  useEffect(() => { AppleAuthentication.isAvailableAsync().then(res => setAvailable(res)) },[])

  if(!available) return null;

  const handleSignIn = async () => {
    try{
      const { fullName, user } = await AppleAuthentication
        .signInAsync({ requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ]})
        const res = await signInUser({ 
          apple_id: user,
          firstname: fullName?.givenName, 
          lastname: fullName?.familyName
        })
        if(res) setUser(res, !res.account_created)
        if(res && res.account_created === true) {
          navigation.navigate('UsernameAuthScreen')
        }
    }catch (e: any){
      if(e.code !== 'ERR_CANCELED') alert('Sign in failed')
    }
  }
  
  return (
    <AppleAuthentication.AppleAuthenticationButton
      cornerRadius={4}
      onPress={handleSignIn}
      style={[styles.container, style]}
      buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
      buttonType={AppleAuthentication.AppleAuthenticationButtonType.CONTINUE}
    />
  );
}

export default AppleLoginButton

const styles = StyleSheet.create({
    container: {
        height: 42,
    }
})