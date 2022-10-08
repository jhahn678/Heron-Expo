import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { Card, Chip, Text } from 'react-native-paper'
import ShareButton from "../../../../components/buttons/ShareButton";
import Avatar from "../../../../components/users/Avatar";
import { theme } from "../../../../config/theme";
import globalStyles from "../../../../globalStyles";
import { GetUserProfileRes } from "../../../../hooks/queries/useGetUserProfile";
import { ShareType } from "../../../../hooks/utils/useShareContent";
import { RootStackScreenProps } from "../../../../types/navigation";
import HeaderUserLoading from "../../MyProfileScreen/loaders/HeaderUserLoading";
const { width } = Dimensions.get('screen')

interface Props {
    data: GetUserProfileRes['user'] | undefined
    loading: boolean
    navigation: RootStackScreenProps<'UserProfileScreen'>['navigation']
}

const HeaderSection = ({ data, loading, navigation }: Props) => {

    const navigateToImage = () => {
        if(data && data.avatar) navigation.navigate('ViewImageScreen', { uri: data.avatar })
    }

    return (
        <Card style={styles.container}>
            <View style={styles.user}>
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
                            {data.fullname || data.firstname}
                        </Text>
                        { data.location && 
                            <Text style={styles.location} numberOfLines={1}>
                                {data.location || 'Harrisburg, PA'}
                            </Text>
                        }
                    </View> :
                    <HeaderUserLoading/>
                }
            </View>
            <View style={styles.chips}>
                <Chip 
                onPress={() => {}} 
                style={styles.chip} 
                icon='account-multiple'
                >{`Following`}</Chip>
                <Chip 
                onPress={() => {}} 
                style={styles.chip} 
                icon='account-multiple-outline'
                >{`Followers`}</Chip>
                <Chip 
                onPress={() => {}} 
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
        alignItems: 'center'
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
