import { useState } from 'react'
import { Dimensions, StyleSheet, View } from 'react-native'
import { RootStackScreenProps } from '../../types/navigation'
import { useRegistrationStore } from '../../store/auth/useRegistrationStore'
import { TextInput, Button, Card } from 'react-native-paper'
import { useAuth } from '../../store/auth/useAuth'
import EditProfilePictureDialog from '../../components/modals/EditProfilePictureDialog'
import AvatarSection from '../profile/EditProfileScreen/sections/AvatarSection'
import { useCreateAccount } from '../../hooks/mutations/useCreateAccount'
import { theme } from '../../config/theme'
import { useImageStore } from '../../store/image/useImageStore'
import { useUploadImages } from '../../hooks/mutations/useUploadImages'
import { useChangeAvatar } from '../../hooks/mutations/useChangeAvatar'
import { useModalStore } from '../../store/modal/useModalStore'
import AutocompleteLocationInput from '../../components/inputs/AutocompleteLocationInput'
import { AutocompleteGeoplace } from '../../types/Geoplace'
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

  const [place, setPlace] = useState<AutocompleteGeoplace | null>(null)

  const handleSetPlace = (data: AutocompleteGeoplace) => {
    setPlace(data); 
    if(data.fcode === 'ADM1') {
      setCity(undefined); setState(data.admin_one)
    }else{
      setCity(data.name); setState(data.admin_one)
    }
  }

  const handleClearPlace = () => { 
    setPlace(null); 
    setCity(undefined); 
    setState(undefined);
  }

  const reset = useRegistrationStore(store => store.reset)
  const setUser = useAuth(state => state.setUser);
  const { uploadToS3 } = useUploadImages()
  const [addAvatar] = useChangeAvatar()
  const image = useImageStore(store => store.images[0])
  const clearImages = useImageStore(store => store.clearImages)
  const setLoading = useModalStore(store => store.setLoading)
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
          <AvatarSection 
            avatar={undefined}
            onAvatarPress={onAvatarPress}
            fullName={`${store.firstname} ${store.lastname}`} 
          />
          <View style={styles.row}>
            <AutocompleteLocationInput 
              selectedPlace={place}
              onSelect={handleSetPlace} 
              onClearSelected={handleClearPlace}
              containerStyle={[styles.input, { flex: 1 }]}/>
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
})