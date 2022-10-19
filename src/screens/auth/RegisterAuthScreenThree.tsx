import { StyleSheet, View } from 'react-native'
import { useState } from 'react'
import { RootStackScreenProps } from '../../types/navigation'
import { useRegistrationStore } from '../../store/auth/useRegistrationStore'
import { TextInput, Button } from 'react-native-paper'
import { useAuth } from '../../store/auth/useAuth'
import EditProfilePictureDialog from '../../components/modals/EditProfilePictureDialog'
import AvatarSection from '../profile/EditProfileScreen/sections/AvatarSection'
import { useCreateAccount } from '../../hooks/mutations/useCreateAccount'
import { theme } from '../../config/theme'
import { useImageStore } from '../../store/image/useImageStore'
import { useUploadImages } from '../../hooks/mutations/useUploadImages'
import { useChangeAvatar } from '../../hooks/mutations/useChangeAvatar'
import LoadingBackdrop from '../../components/loaders/LoadingBackdrop'
import { useModalStore } from '../../store/modal/useModalStore'

const RegisterAuthScreenThree = ({ navigation }: RootStackScreenProps<'RegisterAuthScreenThree'>) => {

  const [showDialog, setShowDialog] = useState(false)
  const onAvatarPress = () => setShowDialog(true)
  const [city, setCity] = useState<string | undefined>(undefined)
  const [state, setState] = useState<string | undefined>(undefined)
  const [bio, setBio] = useState<string | undefined>(undefined)

  const store = useRegistrationStore(store => ({
    firstname: store.firstname,
    lastname: store.lastname,
    username: store.username,
    email: store.email,
    password: store.password
  }))

  const reset = useRegistrationStore(store => store.reset)
  const setUser = useAuth(state => state.setUser);
  const setAuthenticated = useAuth(store => store.setAuthenticated)
  const uploadImage = useUploadImages()
  const [addAvatar] = useChangeAvatar()
  const image = useImageStore(store => store.images[0])
  const clearImages = useImageStore(store => store.clearImages)
  const [loading, setLoading] = useState(false)
  const { createAccount } = useCreateAccount();
  const setSnack = useModalStore(store => store.setSnack)

  const handleCreateAccount = async () => {
    setLoading(true)
    const res = await createAccount({ ...store, city, state, bio })
    if(!res) return alert('Account Creation Failed');
    setUser(res, false); reset(); 
    if(image){
      const upload = await uploadImage([image])
      if(upload) await addAvatar({ 
        variables: { avatar: upload.uploads[0] } 
      })
      clearImages();
    }
    setAuthenticated(true); 
    setSnack('Account created successfully')
    setLoading(false) //@ts-ignore
    navigation.replace('MainTabs', { screen: 'ExploreStack' })
  }
  
  return (
    <View style={styles.container}>
      <AvatarSection 
        avatar={undefined}
        fullName={`${store.firstname} ${store.lastname}`} 
        onAvatarPress={onAvatarPress}
      />
      <View style={styles.row}>
        <TextInput
          autoFocus={true} 
          value={city} 
          onChangeText={setCity} 
          placeholder='City'
          mode="outlined"
          label={'City'}
          style={[styles.rowItem, { marginRight: 4 }]}
        />
        <TextInput 
          value={state} 
          label={'State'}
          mode={"outlined"}
          placeholder={'State'}
          onChangeText={setState} 
          style={[styles.rowItem, { marginLeft: 4 }]}
        />
      </View>
      <TextInput 
        value={bio} 
        label={'Bio'}
        multiline={true}
        mode={"outlined"}
        placeholder={'Bio'}
        onChangeText={setBio} 
      />
      <Button 
        mode='contained-tonal' 
        style={styles.button} 
        theme={{ roundness: 2 }} 
        onPress={handleCreateAccount}
      >Get Started</Button>
      <EditProfilePictureDialog
        style={styles.modal}
        visible={showDialog} 
        setVisible={setShowDialog}
      />
      {loading && <LoadingBackdrop loaderStyle={styles.loader}/>}
    </View>
  )
}

export default RegisterAuthScreenThree

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    display: 'flex',
    padding: 24,
    paddingBottom: 0,
  },
  input: {
    marginBottom: 12,
  },
  button: {
    marginTop: 16,
    height: 48,
    display: 'flex',
    justifyContent: 'center',
  },
  error: {
    marginTop: 4,
    marginBottom: 8,
    color: theme.colors.error
  },
  modal: {
    position: 'relative',
    bottom: 64,
    zIndex: 100
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
    position: 'relative',
    zIndex: 0
  },
  rowItem: {
    flex: 1
  },
  loader: {
    position: 'relative',
    bottom: 200
  }
})