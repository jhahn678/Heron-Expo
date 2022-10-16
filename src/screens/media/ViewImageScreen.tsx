import React, { useState } from "react";
import { StyleSheet, Text, View, Image, Dimensions } from "react-native";
import { Button, Divider, IconButton, Menu, Surface, Title } from "react-native-paper";
import RectangleLoader from "../../components/loaders/RectangleLoader";
import Avatar from "../../components/users/Avatar";
import dayjs from "../../config/dayjs";
import { theme } from "../../config/theme";
import globalStyles from "../../globalStyles";
import { useGetImageQuery } from "../../hooks/queries/useGetImage";
import { useAuth } from "../../store/auth/useAuth";
import { RootStackScreenProps } from "../../types/navigation";
import { useSaveToGallery } from "../../hooks/utils/useSaveToGallery";
import { useModalStore } from "../../store/modal/useModalStore";
import { useDeleteImage } from "../../hooks/mutations/useDeleteImage";
const { width, height } = Dimensions.get('screen')

const ViewImageScreen = ({ navigation, route }: RootStackScreenProps<'ViewImageScreen'>) => {

    const { params: { id, type, title, uri } } = route;
    const { data, loading } = useGetImageQuery({ id, type })
    const [deleteImage] = useDeleteImage()
    const { saveToGallery } = useSaveToGallery()
    const auth = useAuth(store => store.id)
    const [menuOpen, setMenuOpen] = useState(false)

    const handleDownload = async () => {
        if(data) await saveToGallery(data.media.url)
        else if(uri) await saveToGallery(uri)
        setMenuOpen(false)
    }

    const showConfirmDelete = useModalStore(store => store.setConfirmDelete)

    const handleDelete = () => { 
        if(id && type) showConfirmDelete({ 
            message: 'Are you sure you want to delete this image?',
            confirm: async () => {
                deleteImage({ variables: { id, type } })
                    .then(() => { setMenuOpen(false); navigation.goBack() })
            }
        })
    }
    
    const navigateProfile = () => {
        if(data) navigation.navigate('UserProfileScreen', { id: data.media.user.id })
    }

    return (
        <View style={styles.container}>
            <Surface style={[styles.header, { width }]}>
                <View style={globalStyles.frac}>
                    <IconButton icon='arrow-left' onPress={navigation.goBack}/>
                    { title && <Title style={styles.title}>{title}</Title>}
                </View>
                <Menu
                    visible={menuOpen}
                    onDismiss={() => setMenuOpen(false)}
                    anchor={<IconButton icon={'dots-horizontal'} 
                    onPress={() => setMenuOpen(true)}/>}
                >
                    <Menu.Item
                        title={'Save'}
                        style={{ height: 40 }}
                        trailingIcon={'download'}
                        onPress={handleDownload}
                    />
                    <Divider bold/>
                    { (data?.media.user.id === auth && type) &&
                        <Menu.Item
                            title={'Delete'}
                            style={{ height: 40 }}
                            trailingIcon={'delete'}
                            onPress={handleDelete}
                        />
                    }
                </Menu>
            </Surface>
            { (data || uri) ?
                <Image 
                    source={{ uri: data ? data.media.url : uri }}
                    style={[styles.image, { width }]} 
                    resizeMode='contain'
                /> :
                <RectangleLoader height={height*.5} width={width} style={styles.image}/>
            }
            <View style={styles.footer}>
                <Avatar 
                    loading={loading} 
                    onPress={navigateProfile} 
                    fullname={data?.media.user.fullname} 
                    uri={data?.media.user.avatar}
                />
                { data ? 
                    <View style={styles.details}>
                        <Text style={styles.name}>{data.media.user.fullname}</Text>
                        <Text style={styles.date}>{dayjs(data.media.created_at).fromNow()}</Text>
                    </View> :
                    <View style={styles.details}>
                        <RectangleLoader width={140} height={18}/>
                        <RectangleLoader width={120} height={16} style={{ marginTop: 4 }}/>
                    </View>

                }
                <Button 
                    onPress={navigateProfile} icon='arrow-right' 
                    style={{ alignItems: 'flex-end', flexGrow: 1 }}
                    contentStyle={{ flexDirection: 'row-reverse'}}
                >View profile</Button>
            </View>
        </View>
    )
}

export default ViewImageScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        height: 90,
        paddingRight: 8,
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        backgroundColor: theme.colors.background,
    },
    title: {
        fontWeight: '500',
    },
    image: {
        flexGrow: 1,
        width: '100%'
    },
    footer: {
        width: '100%',
        height: 100,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
    },
    details: {
        paddingLeft: 16,
        display: 'flex',
        justifyContent: "center"
    },
    name: {
        fontSize: 16,
        fontWeight: '500'
    },
    date: {
        fontWeight: '500'
    }
});
