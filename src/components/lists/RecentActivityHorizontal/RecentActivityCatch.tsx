import React from 'react'
import { 
    StyleSheet, 
    Pressable, 
    View, 
    StyleProp, 
    ViewStyle, 
    Image 
} from 'react-native'
import { Text, useTheme } from 'react-native-paper'
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
        <Pressable onPress={onNavigateToCatch}  style={[styles.container, style]}>
            <View style={styles.header}>
                <Avatar 
                    size={40}
                    uri={data.user.avatar} 
                    onPress={onNavigateToProfile} 
                    fullname={data.user.fullname}
                />  
                <View style={styles.headerText}>
                    <Text style={styles.name}>{data.user.fullname}</Text>    
                    <Text style={styles.created}>{dateToCalendar(data.created_at)}</Text>
                </View>
            </View>
            <Image source={{ uri: data.media[0]?.url }} style={styles.image}/>
            {
                data.species ? 
                    <Text style={styles.caption} numberOfLines={2}>
                        Caught a {data.species} at {data.waterbody.name}
                    </Text>
                :
                    <Text style={styles.caption} numberOfLines={2}>
                        Logged a catch at {data.waterbody.name}
                    </Text>
            }
        </Pressable>
    )
}

export default RecentActivityCatch

const styles = StyleSheet.create({
    container: {
        height: 340,
        width: 300,
        marginRight: 32,
        borderRadius: 12,
        justifyContent: 'space-evenly',
        backgroundColor: 'white',
        overflow: 'hidden'
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
    headerText: {
        paddingLeft: 8
    },
    name: {
        fontWeight: '500',
    },
    created: {
        fontSize: 12
    },
    caption: {
        fontWeight: '500',
        fontSize: 12,
        padding: 16
    }
})