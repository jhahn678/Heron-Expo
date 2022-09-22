import React from 'react'
import { 
    StyleSheet, 
    View, 
    StyleProp, 
    ViewStyle, 
    Image, 
    Pressable
} from 'react-native'
import { Text } from 'react-native-paper'
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
        <Pressable onPress={onNavigateToCatch} style={[styles.container, style]}>
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
            <Image source={{ uri: data.media[0]?.url }} style={styles.image}/>
            {
                data.species ? 
                    <Text style={styles.caption}>
                        Caught a {data.species} at {data.waterbody.name}
                    </Text>
                :
                    <Text style={styles.caption}>
                        Logged a catch at {data.waterbody.name}
                    </Text>
            }
        </Pressable>
    )
}

export default RecentActivityCatch

const styles = StyleSheet.create({
    container: {
        height: 350,
        width: 300,
        backgroundColor: 'white',
        marginRight: 32,
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
        fontSize: 14,
        fontWeight: '500',
        padding: 12,
    }
})