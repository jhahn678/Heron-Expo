import React from "react";
import { StyleSheet, Text, View, Image, Dimensions } from "react-native";
import { Button, IconButton, Surface, Title } from "react-native-paper";
import Avatar from "../../components/users/Avatar";
import dayjs from "../../config/dayjs";
import { theme } from "../../config/theme";
import globalStyles from "../../globalStyles";
import { useGetImageQuery } from "../../hooks/queries/useGetImage";
import { RootStackScreenProps } from "../../types/navigation";


const ViewImageScreen = ({ navigation, route }: RootStackScreenProps<'ViewImageScreen'>) => {

    const { width } = Dimensions.get('screen')
    const { params: { id, type, title, uri } } = route;

    const { data, loading, error } = useGetImageQuery({ id, type })

    const navigateProfile = () => {
        if(data) navigation.navigate('UserProfileScreen', { id: data.media.user.id })
    }

    return (
        <View style={styles.container}>
            <Surface style={[styles.header, { width }]}>
                <View style={globalStyles.frsb}>
                    <IconButton icon='arrow-left' onPress={navigation.goBack}/>
                    { title && <Title style={styles.title}>{title}</Title>}
                </View>
            </Surface>
            <Image 
                source={{ uri: data ? data.media.url : uri ? uri : undefined }}
                style={[styles.image, { width }]} 
                resizeMode='contain'
            />
            { data &&  
                <View style={styles.footer}>
                    <Avatar onPress={navigateProfile} fullname={data.media.user.fullname} uri={data.media.user.avatar}/>
                    <View style={styles.details}>
                        <Text style={styles.name}>{data.media.user.fullname}</Text>
                        <Text style={styles.date}>{dayjs(data.media.created_at).fromNow()}</Text>
                    </View>
                    <Button 
                        onPress={navigateProfile} icon='arrow-right' 
                        style={{ alignItems: 'flex-end', flexGrow: 1 }}
                        contentStyle={{ flexDirection: 'row-reverse'}}
                    >View profile</Button>
                </View>
            }
        </View>
    )
}

export default ViewImageScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        height: 80,
        flexDirection: 'row',
        alignItems: 'flex-end',
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
