import React from "react";
import { StyleSheet, View, Dimensions, Platform } from "react-native";
import { IconButton, Text } from "react-native-paper";
import ShareButton from "../../../../components/buttons/ShareButton";
import globalStyles from "../../../../globalStyles";
import { GetUserProfileRes } from "../../../../hooks/queries/useGetUserProfile";
import { ShareType } from "../../../../hooks/utils/useShareContent";
const { width } = Dimensions.get('screen')

interface Props {
    data: GetUserProfileRes['user'] | undefined
    onNavigateBack: () => void
}

const UserProfileHeader = ({ data, onNavigateBack }: Props) => {

    return (
        <View style={[styles.container, globalStyles.frsb]}>
            <View style={globalStyles.frac}>
                <IconButton icon={'arrow-left'} iconColor={'#000'} onPress={onNavigateBack}/>
                <Text variant={"titleLarge"} style={styles.title}>Profile</Text>
            </View>
            <ShareButton shareType={ShareType.Profile} id={data?.id} mode={"contained"}/>
        </View>
    );
};

export default UserProfileHeader;

const styles = StyleSheet.create({
    container: {
        width,
        backgroundColor: "#fff",
        paddingRight: 12,
        paddingTop: 32,
    },
    title: {
        fontWeight: '700',
    }
});
