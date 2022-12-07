import React from "react";
import { StyleSheet, View, Pressable } from "react-native";
import { Title, Text } from "react-native-paper";
import RectangleLoader from "../../../../components/loaders/RectangleLoader";
import PrivacyLabel from "../../../../components/locations/PrivacyLabel";
import Avatar from "../../../../components/users/Avatar";
import dayjs from "../../../../config/dayjs";
import globalStyles from "../../../../globalStyles";
import { GetLocationRes } from "../../../../hooks/queries/useGetLocation";
import { RootStackScreenProps } from "../../../../types/navigation";

interface Props {
    navigation: RootStackScreenProps<'ViewLocationScreen'>['navigation']
    data: GetLocationRes['location'] | undefined
}

const HeadingSection = ({ navigation, data }: Props) => {

    const navigateToUser = () => {
        if(!data) return;
        navigation.navigate('UserProfileScreen', { id: data.user.id })
    }

    const navigateToWaterbody = () => {
        if(!data) return;
        navigation.navigate('MainTabs', {
            screen: 'ExploreStack',
            params: {
                screen: 'WaterbodyScreen',
                params: { id: data.waterbody.id }
            }
        })
    }
  
    return (
        <View style={styles.container}>
            { data ? 
                <>
                    <Title style={styles.title}>{data.title || 'Untitled Location'}</Title>
                    <Pressable style={globalStyles.baseline} onPress={navigateToWaterbody}>
                        <Text style={styles.at}>at</Text>
                        <Title style={styles.waterbody} numberOfLines={1}>
                            {data?.waterbody.name}
                        </Title>
                    </Pressable> 
                    <View style={globalStyles.baseline}>
                        <Text style={styles.place} numberOfLines={1}>
                            near {data?.nearest_place}
                        </Text>
                    </View>
                </> :
                <>
                    <RectangleLoader width={300} height={34} style={{ marginLeft: 16 }}/>
                    <View style={styles.loadingPlace}>
                        <Text style={styles.at}>at</Text>
                        <RectangleLoader height={24} width={272} style={{ marginLeft: 4 }}/>
                    </View>
                    <View style={styles.loadingPlace}>
                        <Text style={styles.at}>near</Text>
                        <RectangleLoader height={24} width={250} style={{ marginLeft: 4 }}/>
                    </View>
                </>
            }
            <View style={styles.user}>
                <Avatar
                    size={28}
                    loading={!Boolean(data)}
                    fullname={data?.user.fullname}
                    uri={data?.user.avatar}
                    onPress={navigateToUser}
                />
                { data ?
                    <>
                        <Text style={styles.name}>{data?.user.fullname}</Text>
                        <View style={styles.divider}/>
                        <Text style={styles.created}>
                            Added {dayjs(data?.created_at).fromNow()}
                        </Text>
                        <View style={styles.divider}/>
                        <PrivacyLabel privacy={data?.privacy}/>
                    </> :
                    <>
                        <RectangleLoader height={24} width={80} style={{ marginLeft: 8 }}/>
                        <View style={styles.divider}/>
                        <RectangleLoader width={80} height={24}/>
                        <View style={styles.divider}/>
                        <RectangleLoader width={80} height={24}/>
                    </>
                }
            </View>
        </View>
    );
};

export default HeadingSection;

const styles = StyleSheet.create({
    container: {
        paddingVertical: 16,
    },
    title: {
        paddingHorizontal: 16,
        fontWeight: "700",
        fontSize: 24
    },
    at: {
        paddingLeft: 16,
        fontSize: 18,
        paddingRight: 6,
    },
    waterbody: {
        fontSize: 20,
        fontWeight: "500",
    },
    place: {
        fontSize: 16,
        fontWeight: "500",
        marginLeft: 16,
        marginTop: 6,
    },
    user: {
        paddingHorizontal: 16,
        flexDirection: "row",
        alignItems: "center",
        marginTop: 36,
    },
    name: {
        fontWeight: "500",
        paddingLeft: 12,
    },
    divider: {
        width: 1,
        height: 24,
        backgroundColor: '#e0e0e0',
        marginHorizontal: 12,
    },
    created: {
        fontWeight: "500",
        fontSize: 12
    },
    loadingPlace: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        marginTop: 8
    }
});
