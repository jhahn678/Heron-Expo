import { Dimensions, StyleSheet, View } from 'react-native'
import { useState } from 'react'
import { RootStackScreenProps } from '../../types/navigation'
import { TextInput, Button, Card } from 'react-native-paper'
import { useAuth } from '../../store/auth/useAuth'
import EditProfilePictureDialog from '../../components/modals/EditProfilePictureDialog'
import AvatarSection from '../profile/EditProfileScreen/sections/AvatarSection'
import { theme } from '../../config/theme'
import { useImageStore } from '../../store/image/useImageStore'
import { useUploadImages } from '../../hooks/mutations/useUploadImages'
import { useChangeAvatar } from '../../hooks/mutations/useChangeAvatar'
import { useModalStore } from '../../store/modal/useModalStore'
import { useEditProfile, EditProfileVars } from '../../hooks/mutations/useEditProfile'
const { height, width } = Dimensions.get('window')

type DetailsUpdate =  { [K in keyof EditProfileVars['details']]: string }

interface DetailsState {
    bio: string
    city: string
    state: string
    lastname: string
    firstname: string
}

const RegisterAuthScreenThree = ({ navigation }: RootStackScreenProps<'UserDetailsAuthScreen'>) => {

    const auth = useAuth()
    const onAvatarPress = () => setShowDialog(true)
    const [showDialog, setShowDialog] = useState(false)

    const [details, setDetails] = useState<DetailsState>({
        bio: auth.bio || '', 
        city: auth.city || '', 
        state: auth.state || '', 
        lastname: auth.lastname || '', 
        firstname: auth.firstname || ''
    })

    const handleSetDetails = (update: DetailsUpdate) => setDetails(state => ({ ...state, ...update }))

    const [addAvatar] = useChangeAvatar()
    const [editProfile] = useEditProfile()
    const { uploadToS3 } = useUploadImages()
    
    const image = useImageStore(store => store.images[0])
    const setSnack = useModalStore(store => store.setSnack)
    const setLoading = useModalStore(store => store.setLoading)
    const clearImages = useImageStore(store => store.clearImages)
    const setAuthenticated = useAuth(store => store.setAuthenticated)

    const handleUpdateAccount = async () => {
        setLoading(true)
        await editProfile({ variables: { details } })
        if(image){
            const [upload] = await uploadToS3([image])
            if(upload) await addAvatar({ variables: { avatar: upload } })
            clearImages();
        }
        setLoading(false);
        setAuthenticated(true);
        setSnack('Account created successfully');
    }
  
  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <AvatarSection 
            avatar={auth.avatar || undefined}
            onAvatarPress={onAvatarPress}
            fullName={
                (details.firstname || details.lastname) ? 
                `${details.firstname} ${details.lastname}` 
                : null
            } 
          />
          <View style={styles.row}>
            <TextInput
              mode={"flat"}
              autoFocus={true} 
              label={'First name'}
              placeholder={'First name'}
              value={details.firstname} 
              style={[styles.input, { flex: 1, marginRight: 4 }]}
              onChangeText={firstname => handleSetDetails({ firstname })} 
            />
            <TextInput 
              mode={"flat"}
              label={'Last name'}
              placeholder={'Last name'}
              value={details.lastname} 
              style={[styles.input, { flex: 1, marginLeft: 4 }]}
              onChangeText={lastname => handleSetDetails({ lastname })} 
            />
          </View>
          <View style={styles.row}>
            <TextInput
              mode={"flat"}
              label={'City'}
              autoFocus={true} 
              placeholder={'City'}
              value={details.city} 
              onChangeText={city => handleSetDetails({ city })} 
              style={[styles.input, { flex: 1, marginRight: 4 }]}
            />
            <TextInput 
              mode={"flat"}
              label={'State'}
              placeholder={'State'}
              value={details.state} 
              style={[styles.input, { flex: 1, marginLeft: 4 }]}
              onChangeText={state => handleSetDetails({ state })} 
            />
          </View>
          <TextInput 
            mode={"flat"}
            label={'Bio'}
            multiline={true}
            placeholder={'Bio'}
            style={styles.input}
            value={details.bio} 
            onChangeText={bio => handleSetDetails({ bio })} 
          />
          <Button 
            mode={'contained'}
            style={styles.button} 
            theme={{ roundness: 1 }}
            onPress={handleUpdateAccount}
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
  }
})