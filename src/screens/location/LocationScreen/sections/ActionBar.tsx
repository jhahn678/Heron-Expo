import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { RootStackScreenProps } from "../../../../types/navigation";
import { theme } from "../../../../config/theme";
import LikeButton, { LikeType } from "../../../../components/buttons/LikeButton";
import ShareButton from "../../../../components/buttons/ShareButton";
import { ShareType } from "../../../../hooks/utils/useShareContent";
import { GetLocationRes } from "../../../../hooks/queries/useGetLocation";
import SaveLocationButton from "../../../../components/buttons/SaveLocationButton";

interface Props{
    navigation: RootStackScreenProps<"ViewLocationScreen">["navigation"];
    totalFavorites: GetLocationRes['location']['total_favorites'] | undefined
    isFavorited: GetLocationRes['location']['is_favorited'] | undefined
    isSaved: GetLocationRes['location']['is_saved'] | undefined
    id: number
}

const ActionBar = ({ navigation, totalFavorites, isFavorited, isSaved, id }: Props) => {

    return (
        <View>
            {(totalFavorites && totalFavorites > 0) ?
                <Text style={styles.likes}>
                {
                    totalFavorites && totalFavorites > 1 ? 
                    `${totalFavorites} People Have Liked This Catch`:
                    `1 Person Has Liked This Catch`
                }
                </Text>
            : null}
            <View style={styles.actionbar}>
                <LikeButton active={isFavorited} id={id} type={LikeType.Location} />
                <View style={styles.bardivider}/>
                <SaveLocationButton id={id} active={isSaved}/>
                <View style={styles.bardivider} />
                <ShareButton shareType={ShareType.Location} id={id} mode="none" />
            </View>
        </View>
    );
};

export default ActionBar;

const styles = StyleSheet.create({
    actionbar: {
        width: '100%',
        height: 50,
        paddingHorizontal: 24,
        marginTop: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: theme.colors.surfaceVariant
    },
    bardivider: {
        width: 1,
        height: 24,
        backgroundColor: 'rgba(0,0,0,.2)',
        marginHorizontal: 16,
    },
    likes: {
        paddingHorizontal: 16,
        paddingTop: 8,
        fontSize: 12,
        fontWeight: '500'
    },
});
