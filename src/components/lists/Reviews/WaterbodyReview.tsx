import React, { useState } from 'react'
import { View, StyleSheet, Pressable, ViewStyle, StyleProp } from 'react-native'
import { Text, Title } from 'react-native-paper'
import Avatar from '../../users/Avatar'
import { GetWaterbodyReview } from '../../../hooks/queries/useGetWaterbodyReviews'
import RatingDisplay from '../../ratings/RatingDisplay'
import dayjs from '../../../config/dayjs'
import globalStyles from '../../../globalStyles'

interface Props {
    data: GetWaterbodyReview,
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
                        <Text style={styles.headerDate}>{dayjs(data.created_at).calendar()}</Text>
                    </View>
                </Pressable>
                <RatingDisplay
                    hideLabel
                    rating={data.rating} 
                    style={styles.rating} 
                    iconSize={20}
                />
            </View>
            { data.text &&  
                <Text style={styles.text}>
                    {data.text}
                </Text>
            }
        </View>
    );
};

export default WaterbodyReview;

const styles = StyleSheet.create({
    container: {
        borderColor: 'rgba(0,0,0,.1)',
        borderTopWidth: 1,
        paddingTop: 16
    },
    header: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16
    },
    name: {
        fontWeight: '600',
        fontSize: 16,
        paddingBottom: 2
    },
    headerDate: {
        fontWeight: '400',
        fontSize: 12
    },
    rating: {
        marginRight: 24
    },
    text: {
        marginTop: 16,
        marginBottom: 24,
        marginHorizontal: 24,
        fontSize: 14.5,
        lineHeight: 18
    }
});

