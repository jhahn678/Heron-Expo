import React from 'react'
import { View, StyleSheet, Pressable, ViewStyle, StyleProp } from 'react-native'
import { Text } from 'react-native-paper'
import Avatar from '../../users/Avatar'
import RatingDisplay from '../../ratings/RatingDisplay'
import dayjs from '../../../config/dayjs'
import globalStyles from '../../../globalStyles'
import MapMarkerIcon from '../../icons/MapMarkerIcon'
import { WaterbodyReviews } from '../../../screens/waterbody/ReviewsScreen'

interface Props {
    data: WaterbodyReviews[number],
    navigateToUser: () => void
    style?: StyleProp<ViewStyle>
}

const WaterbodyReview = ({ data, navigateToUser, style }: Props) => {

    return (
        <View style={[styles.container, style]}>
            <View style={styles.header}>
                <Pressable onPress={navigateToUser} style={globalStyles.frsb}>
                    <Avatar size={50}
                        fullname={data.user.fullname}
                        uri={data.user.avatar}
                        onPress={navigateToUser}
                    />
                    <View style={{ marginLeft: 12 }}>
                        <Text style={styles.name}>{data.user.fullname}</Text>
                        <Text style={styles.date}>{dayjs(data.created_at).fromNow()}</Text>
                    </View>
                </Pressable>
                <RatingDisplay
                    hideLabel
                    rating={data.rating} 
                    style={styles.rating} 
                    iconSize={20}
                />
            </View>
            { data.text && <Text style={styles.text}>{data.text}</Text> }
            <View style={styles.waterbody}>
                <MapMarkerIcon/>
                <Text style={styles.waterbodyName}>{data.waterbody.name}</Text>
            </View>
        </View>
    );
};

export default WaterbodyReview;

const styles = StyleSheet.create({
    container: {
        borderColor: '#d9d9d9',
        borderBottomWidth: 1,
        paddingTop: 16,
        paddingBottom: 24,
        marginHorizontal: 8
    },
    header: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 8
    },
    name: {
        fontWeight: '500',
        fontSize: 16,
        paddingBottom: 2
    },
    date: {
        fontWeight: '500',
        fontSize: 12
    },
    rating: {
        marginRight: 24
    },
    text: {
        marginTop: 16,
        paddingHorizontal: 8,
        lineHeight: 18
    },
    waterbody: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 8,
        marginTop: 16,
    },
    waterbodyName: {
        fontWeight: '500',
        fontSize: 14,
        marginLeft: 6
    }
});

