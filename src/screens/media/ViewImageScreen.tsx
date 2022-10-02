import React from "react";
import { StyleSheet, Text, View, Image, Dimensions } from "react-native";
import { Avatar, Button, IconButton, Surface, Title } from "react-native-paper";
import dayjs from "../../config/dayjs";
import globalStyles from "../../globalStyles";
import { useGetImageQuery } from "../../hooks/queries/useGetImage";
import { RootStackScreenProps } from "../../types/navigation";


const ViewImageScreen = ({ navigation, route }: RootStackScreenProps<'ViewImageScreen'>) => {

    const { width } = Dimensions.get('screen')
    const { params: { id, type, uri, title } } = route;
    const { data, loading, error } = useGetImageQuery({ id, type })
    const navigateProfile = () => navigation.navigate('UserProfileScreen', { id: data?.user.id! })

    return (
        <View style={styles.container}>
            <Surface style={[styles.header, { width }]}>
                <View style={globalStyles.frsb}>
                    <IconButton icon='arrow-left' onPress={navigation.goBack}/>
                    { title && <Title style={styles.title}>{title}</Title>}
                </View>
            </Surface>
            <Image source={{ uri: data ? data.url : uri ? uri : undefined }}
                style={[styles.image, { width }]} resizeMode='contain'
            />
            <View style={styles.footer}>
                { data?.user.avatar && <Avatar.Image source={{ uri: data.user.avatar }}/>}
                <View style={styles.details}>
                    <Text style={styles.name}>{data?.user.fullname}</Text>
                    <Text style={styles.date}>{dayjs(data?.created_at).fromNow()}</Text>
                </View>
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
        height: '100%',
        width: '100%'
    },
    header: {
        position: 'absolute',
        zIndex: 100,
        height: 80,
        flexDirection: 'row',
        alignItems: 'flex-end',
    },
    title: {
        fontWeight: '500',
    },
    image: {
        flexGrow: 1,
        width: '100%'
    },
    footer: {
        position: 'absolute',
        bottom: 0,
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
