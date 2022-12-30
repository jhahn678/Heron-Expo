import { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native'
import { Button, Text } from 'react-native-paper'
import FollowButton from '../../../../components/buttons/FollowButton';
import RectangleLoader from '../../../../components/loaders/RectangleLoader';
import { theme } from '../../../../config/theme';
import { GetUserProfileRes } from '../../../../hooks/queries/useGetUserProfile';
import { useAuth } from '../../../../store/auth/useAuth';
const { width } = Dimensions.get("screen")

interface Props {
    loading: boolean
    data: GetUserProfileRes['user'] | undefined
    onEditProfile: () => void
}

const UserDetailsSection = ({ data, onEditProfile }: Props) => {

    const currentUser = useAuth(store => store.id)
    const [location, setLocation] = useState<string>("")

    useEffect(() => {
        if(data?.location) return setLocation(data.location);
        if(data?.state) return setLocation(data.state);
        if(data?.city) return setLocation(data.city);
    },[data])

    return (
        <View style={styles.container}>
            { data ?
                <>
                    <Text variant={"headlineSmall"} style={styles.name}>{data?.fullname}</Text>
                    <Text variant={"titleMedium"}>
                        {
                            location.length ?
                            `${location} • @${data?.username}` :
                            `@${data?.username}`
                        }
                    </Text>
                    <View style={styles.divider}/>
                    { data.bio &&
                        <>
                            <Text variant={"bodyMedium"}>
                                {data.bio}
                            </Text> 
                            <View style={styles.divider}/>
                        </>
                    }
                </> :
                <>
                    <RectangleLoader height={32} width={200} style={{ marginBottom: 6 }}/>
                    <RectangleLoader height={20} width={250}/>
                    <View style={styles.divider}/>
                    <RectangleLoader height={20} width={250}/>
                    <View style={styles.divider}/>
                </> 
            }
            {
                currentUser === data?.id ? 
                    <Button 
                        mode={"elevated"} 
                        buttonColor={theme.colors.primary}
                        labelStyle={{ color: "#fff" }}
                        contentStyle={{ flexDirection: 'row-reverse'}}
                        icon={'pencil'}
                        style={styles.button}
                        onPress={onEditProfile}
                    >Edit Profile</Button>
                : 
                    <FollowButton 
                    id={data?.id}
                    disabled={!data}
                    following={data ? data.am_following : false} 
                    style={styles.button}/>
            }
                </View>
    );
}

export default UserDetailsSection;

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        padding: 24,
        backgroundColor: '#fff'
    },
    name: {
        fontSize: 26,
        marginBottom: 2,
        fontWeight: '700'
    },
    divider: {
        width: width * .8,
        height: 1,
        backgroundColor: '#d9d9d9',
        marginVertical: 24
    },
    button: {
        width: width * .75
    }
})