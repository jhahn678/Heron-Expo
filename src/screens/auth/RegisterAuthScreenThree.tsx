import { Dimensions, StyleSheet, View } from 'react-native'
import { useState } from 'react'
import { RootStackScreenProps } from '../../types/navigation'
import { useRegistrationStore } from '../../store/auth/useRegistrationStore'
import { TextInput, Button, Card, Text } from 'react-native-paper'
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
const { height, width } = Dimensions.get('window')

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
  const { uploadToS3 } = useUploadImages()
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
    setUser(res)
    if(image){
      const [upload] = await uploadToS3([image])
      if(upload) await addAvatar({ variables: { avatar: upload } })
      clearImages();
    }
    setSnack('Account created successfully')
    setLoading(false); reset();
    navigation.navigate("MainTabs", { 
      screen: "ExploreStack",
      params: { screen: "ExploreScreen" } 
    })
  }
  
  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Text variant={"titleMedium"} style={styles.title}>
            Complete your profile
          </Text>
          <AvatarSection 
            avatar={undefined}
            onAvatarPress={onAvatarPress}
            fullName={`${store.firstname} ${store.lastname}`} 
          />
          <View style={styles.row}>
            <TextInput
              value={city} 
              mode={"flat"}
              label={'City'}
              autoFocus={true} 
              placeholder={'City'}
              onChangeText={setCity} 
              style={[styles.input, { flex: 1, marginRight: 4 }]}
            />
            <TextInput 
              value={state} 
              label={'State'}
              mode={"flat"}
              placeholder={'State'}
              onChangeText={setState} 
              style={[styles.input, { flex: 1, marginLeft: 4 }]}
            />
          </View>
          <TextInput 
            value={bio} 
            mode={"flat"}
            label={'Bio'}
            multiline={true}
            placeholder={'Bio'}
            style={styles.input}
            onChangeText={setBio} 
          />
          <Button 
            mode={'contained'}
            style={styles.button} 
            onPress={handleCreateAccount}
            theme={{ roundness: 1 }}
          >Get Started</Button>
        </Card.Content>
      </Card>
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
    padding: 16,
    height
  },
  card: {
    borderColor: theme.colors.primaryContainer,
    borderWidth: 1
  },
  title: {
    marginBottom: 16,
    marginTop: 4
  },
  input: {
    marginBottom: 12,
  },
  button: {
    marginTop: 8
  },
  modal: {
    position: 'absolute',
    alignSelf: 'center',
    width: width * .9,
    top: 50,
    zIndex: 100
  },
  row: {
    zIndex: 0,
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rowItem: {
    flex: 1
  },
  loader: {
    position: 'absolute',
    top: 150
  }
})