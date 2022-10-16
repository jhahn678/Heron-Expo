import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { Card, Chip, Text } from 'react-native-paper'
import FollowButton from "../../../../components/buttons/FollowButton";
import Avatar from "../../../../components/users/Avatar";
import globalStyles from "../../../../globalStyles";
import { GetUserProfileRes } from "../../../../hooks/queries/useGetUserProfile";
import { ShareType, useShareContent } from "../../../../hooks/utils/useShareContent";
import { useAuth } from "../../../../store/auth/useAuth";
import { RootStackScreenProps } from "../../../../types/navigation";
import { FollowType } from "../../../../types/User";
import HeaderUserLoading from "../../MyProfileScreen/loaders/HeaderUserLoading";
const { width } = Dimensions.get('screen')

interface Props {
    data: GetUserProfileRes['user'] | undefined
    loading: boolean
    navigation: RootStackScreenProps<'UserProfileScreen'>['navigation']
}

const HeaderSection = ({ data, loading, navigation }: Props) => {

    const auth = useAuth(store => store.id)
    const shareContent = useShareContent()
    const handleShareContent = () => shareContent({ shareType: ShareType.Profile, id: data?.id })

    const navigateToImage = () => {
        if(data && data.avatar) navigation.navigate('ViewImageScreen', { uri: data.avatar })
    }

    const navigateFollowing = () => {
        if(data) navigation.navigate('ContactsListScreen', { 
            id: data.id, type: FollowType.Following
        })
    }

    const navigateFollowers = () => {
        if(data) navigation.navigate('ContactsListScreen', {
            id: data.id, type: FollowType.Followers
        })
    }

    return (
        <Card style={styles.container}>
            <View style={styles.user}>
                <View style={globalStyles.frac}>
                    <Avatar 
                        size={80}
                        loading={loading}
                        fullname={data?.fullname} 
                        uri={data?.avatar}
                        onPress={navigateToImage}
                    />
                    { data ?
                        <View>
                            <Text style={styles.name} numberOfLines={1}>
                                {data.fullname || data.firstname || data.username}
                            </Text>
                            { data.location && 
                                <Text style={styles.location} numberOfLines={1}>
                                    {data.location}
                                </Text>
                            }
                        </View> :
                        <HeaderUserLoading/>
                    }
                </View>
                {( auth && auth !== data?.id) && <FollowButton following={data?.am_following} id={data?.id}/> }
            </View>
            <View style={styles.chips}>
                <Chip 
                onPress={navigateFollowing} 
                style={styles.chip} 
                icon='account-multiple'
                >{`Following`}</Chip>
                <Chip 
                onPress={navigateFollowers} 
                style={styles.chip} 
                icon='account-multiple-outline'
                >{`Followers`}</Chip>
                <Chip 
                onPress={handleShareContent} 
                style={styles.chip} 
                icon='share-variant'
                >{'Share'}</Chip>
            </View>
        </Card>
    );
};

export default HeaderSection;

const styles = StyleSheet.create({
    container: {
        width,
        borderRadius: 0
    },
    user: {
        marginTop: 52,
        marginLeft: 24,
        marginRight: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    name: {
        fontWeight: '600',
        fontSize: 24,
        marginLeft: 12
    },
    location: {
        fontSize: 16,
        marginTop: 2,
        marginLeft: 12,
    },
    chips: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 16,
        marginTop: 24,
        marginBottom: 16
    },
    chip: {
        height: 40,
        marginRight: 12
    }
});
