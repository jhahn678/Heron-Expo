import React from 'react'
import { 
    StyleSheet, 
    Pressable, 
    View, 
    StyleProp, 
    ViewStyle, 
    Image 
} from 'react-native'
import { Title, Text, useTheme } from 'react-native-paper'
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

    const { colors } = useTheme()

    return (
        <Pressable onPress={onNavigateToCatch}  style={[styles.container, style, { shadowColor: colors.backdrop}]}>
            <View style={styles.header}>
                <Avatar 
                    size={40}
                    uri={data.user.avatar} 
                    onPress={onNavigateToProfile} 
                    fullname={data.user.fullname}
                />  
                <View style={styles.headerText}>
                    <Text style={styles.name}>{data.user.fullname}</Text>    
                    <Text>{dateToCalendar(data.created_at)}</Text>
                </View>
            </View>
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
            <Image source={{ uri: data.media[0]?.url }} style={styles.image}/>
        </Pressable>
    )
}

export default RecentActivityCatch

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: 300,
        marginRight: 32,
        elevation: 3, 
        shadowOffset: { 
            height: 2, 
            width: 0 
        }, 
        shadowRadius: 2, 
        shadowOpacity: .2,
        justifyContent: 'space-evenly'
    },
    image: {
        height: '70%',
        width: '100%',
        borderRadius: 12,
        
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerText: {
        paddingLeft: 12
    },
    name: {
        fontWeight: '600',
        fontSize: 16
    },
    caption: {
        fontWeight: '500'
    }
})