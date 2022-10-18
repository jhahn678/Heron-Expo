import React from 'react'
import { StyleSheet, View, StyleProp, ViewStyle, Image, } from 'react-native'
import { Card, Text } from 'react-native-paper'
import { RecentActivity } from '../../../hooks/queries/useGetRecentActivity'
import Avatar from '../../users/Avatar'
import { dateToCalendar } from '../../../utils/conversions/dateToCalendar'

interface Props<T> {
    data: T
    onNavigateToCatch: () => void
    onNavigateToProfile: () => void
    style?: StyleProp<ViewStyle>
}

const RecentActivityCatch = <T extends RecentActivity>({
    data, style, onNavigateToCatch, onNavigateToProfile
}: Props<T>): JSX.Element => {

    return (
        <Card onPress={onNavigateToCatch} style={[styles.container, style]} elevation={1}>
            <View style={styles.header}>
                <Avatar 
                    size={36}
                    uri={data.user.avatar} 
                    onPress={onNavigateToProfile} 
                    fullname={data.user.fullname}
                />  
                <View style={styles.user}>
                    <Text style={styles.name}>{data.user.fullname}</Text>    
                    <Text style={styles.created}>{dateToCalendar(data.created_at)}</Text>
                </View>
            </View>
            <Image 
                style={styles.image}
                source={{ uri: 
                    data ? data.media.length > 0 ?
                        data.media[0].url
                    : data.map_image ?
                        data.map_image.url
                    : undefined
                    : undefined
                }} 
            />
            <View style={styles.caption}>
                <Text style={styles.captionText} numberOfLines={2}>
                { data.species ? 
                    `Caught a ${data.species} at ${data.waterbody.name}` : 
                    `Logged a catch at ${data.waterbody.name}`}
                </Text>
            </View>
        </Card>
    )
}

export default RecentActivityCatch

const styles = StyleSheet.create({
    container: {
        height: 350,
        width: 300,
        backgroundColor: 'white',
        marginRight: 16,
        marginVertical: 24,
        borderRadius: 12,
        justifyContent: 'space-evenly'
    },
    image: {
        flex: 1,
        width: '100%',
        backgroundColor: '#e0e0e0'
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12
    },
    user: {
        paddingLeft: 8
    },
    name: {
        fontWeight: '500',
        fontSize: 14
    },
    created: {
        fontSize: 12,
    },
    caption: {
        height: 64,
        padding: 12,
    },
    captionText: {
        fontSize: 14,
        fontWeight: '500',
        justifyContent: 'center'
    }
})