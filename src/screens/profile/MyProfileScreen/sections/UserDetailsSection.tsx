import { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native'
import { Button, Text } from 'react-native-paper'
import RectangleLoader from '../../../../components/loaders/RectangleLoader';
import { theme } from '../../../../config/theme';
import { GetMyProfileTotalsRes } from '../../../../hooks/queries/useGetMyProfile';
const { width } = Dimensions.get("screen")

interface Props {
    onEditProfile: () => void
    data: GetMyProfileTotalsRes['me'] | undefined
}

const UserDetailsSection = ({ data, onEditProfile }: Props) => {

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
                    { data.bio ?
                        <>
                            <View style={styles.divider1}/>
                            <Text variant={"bodyMedium"}>
                                {data.bio}
                            </Text> 
                            <View style={styles.divider2}/>
                        </> :
                        <>
                            <View style={styles.divider1}/>
                        </>
                    }
                </> :
                <>
                    <RectangleLoader height={32} width={200} style={{ marginBottom: 6 }}/>
                    <RectangleLoader height={20} width={250}/>
                    <View style={styles.divider1}/>
                    <RectangleLoader height={20} width={250}/>
                    <View style={styles.divider2}/>
                </> 
            }
            <Button 
                icon={'pencil'}
                mode={"elevated"} 
                style={styles.button}
                onPress={onEditProfile}
                labelStyle={{ color: "#fff" }}
                buttonColor={theme.colors.primary}
                contentStyle={{ flexDirection: 'row-reverse'}}
            >Edit Profile</Button>
        </View>
    );
}

export default UserDetailsSection;

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        padding: 24,
        paddingBottom: 16,
        backgroundColor: "#fff"
    },
    name: {
        fontSize: 26,
        marginBottom: 2,
        fontWeight: '700',
    },
    divider1: {
        width: width * .8,
        height: 1,
        backgroundColor: '#d9d9d9',
        marginVertical: 24
    },
    divider2: {
        width: width * .8,
        height: 1,
        backgroundColor: '#d9d9d9',
        marginTop: 24,
        marginBottom: 16
    },
    button: {
        width: width * .8
    }
})