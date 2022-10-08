import React, { useEffect, useState } from "react";
import { FlashList } from "@shopify/flash-list";
import { StyleSheet, View } from "react-native";
import { RootStackScreenProps } from "../../../types/navigation";
import ContactsListItem from "../../../components/lists/ContactsList/ContactsListItem";
import { GetUserFollowers, useGetUserFollowers } from "../../../hooks/queries/useGetUserFollowers";
import { GetUserFollowing, useGetUserFollowing } from "../../../hooks/queries/useGetUserFollowing";
import { FollowType } from "../../../types/User";
import { useGetUserTotalFollows } from "../../../hooks/queries/useGetTotalFollows";
import { IconButton, Surface, Title } from "react-native-paper";
import { theme } from "../../../config/theme";
import globalStyles from "../../../globalStyles";

const limit = 20;

type Data = GetUserFollowers['user']['followers'] | GetUserFollowing['user']['following']

const ContactsListScreen = ({ navigation, route }: RootStackScreenProps<'ContactsListScreen'>) => {

    const { params: { id, type } } = route;

    const totals = useGetUserTotalFollows({ id })
    const [data, setData] = useState<Data>([])
    const followers = useGetUserFollowers({ id, limit, skip: type !== FollowType.Followers })
    const following = useGetUserFollowing({ id, limit, skip: type !== FollowType.Following })

    useEffect(() => {
        if(type === FollowType.Following && following.data){
            return setData(following.data.user.following);
        }if(type === FollowType.Followers && followers.data){
            return setData(followers.data.user.followers);
        }
    }, [followers.data, following.data])

    const navigateToUser = (id: number) => () => navigation.navigate('UserProfileScreen', { id })

    const [refetching, setRefetching] = useState(false)

    const handleRefetch = async () => { 
        setRefetching(true)
        if(type === FollowType.Followers) await followers.refetch()
        if(type === FollowType.Following) await following.refetch()
        setRefetching(false)
    }

    const handleFetchMore = async () => {
        if(data.length < limit || data.length % limit !== 0 || !totals.data) return;
        switch(type){
            case FollowType.Followers:
                return (await followers.fetchMore({ variables: { offset: data.length }}))
            case FollowType.Following:
                return (await following.fetchMore({ variables: { offset: data.length }}))
        }
    }

    return (
        <View style={styles.container}>
            <Surface style={styles.header}>
                <View style={globalStyles.frac}>
                    <IconButton icon="arrow-left" onPress={navigation.goBack} />
                    <Title style={styles.title}>
                        { FollowType.Followers ? "Followers" : "Following" }
                    </Title>
                </View>
                <Title style={styles.total}>
                    { totals.data && FollowType.Followers ? 
                        `${totals.data?.user.total_followers} total` : 
                        `${totals.data?.user.total_following} total`
                    }
                </Title>
            </Surface>
            <FlashList
                data={data}
                estimatedItemSize={80}
                refreshing={refetching}
                onRefresh={handleRefetch}
                onEndReachedThreshold={.3}
                onEndReached={handleFetchMore}
                renderItem={({ item }) => (
                    <ContactsListItem data={item} navigateUser={navigateToUser(item.id)}/>
                )}
            />
        </View>
    );
};

export default ContactsListScreen;

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%'
    },
    header: {
        paddingTop: 24,
        paddingRight: 16,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: 'space-between',
        backgroundColor: theme.colors.background,
        height: 100,
    },
    title: {
        fontWeight: '500'
    },
    total: {
        fontWeight: '500',
        fontSize: 16,
    }
});
