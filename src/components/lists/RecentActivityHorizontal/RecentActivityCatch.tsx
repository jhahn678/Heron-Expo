import React from 'react'
import { 
    StyleSheet, 
    Pressable, 
    View, 
    StyleProp, 
    ViewStyle, 
    Image 
} from 'react-native'
import { Title, Text } from 'react-native-paper'
import { RecentActivity } from '../../../hooks/queries/useGetRecentActivity'
import Avatar from '../../users/Avatar'

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
    <Pressable onPress={onNavigateToCatch}  style={[styles.container, style]} >
        <View style={styles.header}>
            <Avatar 
                size={48}
                uri={data.user.avatar} 
                onPress={onNavigateToProfile} 
                fullname={data.user.fullname}
            />  
            <View style={styles.headerText}>
                <Text style={styles.name}>{data.user.fullname}</Text>    
                <Text>{data.created_at.toDateString()}</Text>
            </View>
        </View>
        
        <Image source={{ uri: data.media[0]?.url }} style={styles.image}/>
    </Pressable>
  )
}

export default RecentActivityCatch

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: 300,
        borderColor: 'black',
        borderWidth: 1,
        marginRight: 16
    },
    image: {

    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerText: {
        paddingLeft: 8
    },
    name: {
        fontWeight: '600'
    }
})