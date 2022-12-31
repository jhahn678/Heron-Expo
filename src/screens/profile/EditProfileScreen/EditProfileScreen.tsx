import { RootStackScreenProps } from "../../../types/navigation";
import { StyleSheet, View, Dimensions } from "react-native";
import { useAuth } from "../../../store/auth/useAuth";
import AvatarSection from "./sections/AvatarSection";
import { useGetMyProfile } from "../../../hooks/queries/useGetMyProfile";
import EditProfilePictureDialog from "../../../components/modals/EditProfilePictureDialog";
import { useEffect, useState } from "react";
import { Button, Card, TextInput } from "react-native-paper";
import AutocompleteLocationInput from "../../../components/inputs/AutocompleteLocationInput";
import { DetailsState, DetailsUpdate } from "../../auth/UserDetailsAuthScreen";
import { theme } from "../../../config/theme";
import { AutocompleteGeoplace } from "../../../types/Geoplace";
import { useChangeAvatar } from "../../../hooks/mutations/useChangeAvatar";
import { useEditProfile } from "../../../hooks/mutations/useEditProfile";
import { useUploadImages } from "../../../hooks/mutations/useUploadImages";
import { useImageStore } from "../../../store/image/useImageStore";
import { useModalStore } from "../../../store/modal/useModalStore";
const { width, height } = Dimensions.get('screen')

const EditProfileScreen = ({ navigation }: RootStackScreenProps<'EditProfileScreen'>) => {

    const auth = useAuth()
    const { data } = useGetMyProfile()
    const [showDialog, setShowDialog] = useState(false)
    const onAvatarPress = () => setShowDialog(true)

    const [details, setDetails] = useState<DetailsState>({
        bio: auth.bio || '',
        city: auth.city || '', 
        state: auth.state || '', 
        lastname: auth.lastname || '', 
        firstname: auth.firstname || ''
    })

    const handleSetDetails = (update: DetailsUpdate) => 
        setDetails(state => ({ ...state, ...update }));

    useEffect(() => {
        if(data) setDetails({
            bio: data.me.bio || '',
            city: data.me.city || '',
            state: data.me.state || '',
            lastname: data.me.lastname || '',
            firstname: data.me.firstname || ''
        })
    },[data])

    const [place, setPlace] = useState<AutocompleteGeoplace | null>(null)

    const handleSetPlace = (data: AutocompleteGeoplace) => {
      setPlace(data); 
      if(data.fcode === 'ADM1') {
        handleSetDetails({ state: data.admin_one })
      }else{
        handleSetDetails({ city: data.name, state: data.admin_one })
      }
    }

    const handleClearPlace = () => { setPlace(null); handleSetDetails({ city: '', state: '' }) }

    const [addAvatar] = useChangeAvatar()
    const [editProfile] = useEditProfile()
    const { uploadToS3 } = useUploadImages()
    
    const image = useImageStore(store => store.images[0])
    const setSnack = useModalStore(store => store.setSnack)
    const setLoading = useModalStore(store => store.setLoading)
    const clearImages = useImageStore(store => store.clearImages)
    useEffect(() => navigation.addListener('beforeRemove', clearImages),[])

    const handleUpdateAccount = async () => {
        setLoading(true)
        await editProfile({ variables: { details } })
        if(image){
            const [upload] = await uploadToS3([image])
            if(upload) await addAvatar({ variables: { avatar: upload } })
            clearImages();
        }
        setLoading(false);
        setSnack('Profile saved');
        navigation.goBack();
    }
    console.log(details)
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
                    <AutocompleteLocationInput 
                        selectedPlace={place}
                        onSelect={handleSetPlace}
                        initialValue={data?.me?.location || ''}
                        onClearSelected={handleClearPlace}
                        containerStyle={[styles.input, { flex: 1}]}/>
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
                >Save Profile</Button>
                </Card.Content>
            </Card>
            <EditProfilePictureDialog
                style={styles.modal}
                visible={showDialog} 
                setVisible={setShowDialog}
            />
        </View>
    );
};

export default EditProfileScreen;

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
  }
})