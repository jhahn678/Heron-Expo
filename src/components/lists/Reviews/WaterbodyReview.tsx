import React, { useState } from 'react'
import { View, StyleSheet, Pressable, ViewStyle, StyleProp } from 'react-native'
import { Divider, Menu, Text, Title, TouchableRipple } from 'react-native-paper'
import Avatar from '../../users/Avatar'
import RatingDisplay from '../../ratings/RatingDisplay'
import dayjs from '../../../config/dayjs'
import globalStyles from '../../../globalStyles'
import MapMarkerIcon from '../../icons/MapMarkerIcon'
import { WaterbodyReviews } from '../../../screens/waterbody/ReviewsScreen'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useAuth } from '../../../store/auth/useAuth'
import { useModalStore } from '../../../store/modal/useModalStore'
import { useDeleteReview } from '../../../hooks/mutations/useDeleteReview'

interface Props {
    data: WaterbodyReviews[number],
    navigateToUser: () => void
    navigateToEdit: () => void
    refetch?: () => void
    style?: StyleProp<ViewStyle>
}

const WaterbodyReview = ({ 
    data, 
    style,
    refetch,
    navigateToUser, 
    navigateToEdit, 
}: Props) => {

    const [menuOpen, setMenuOpen] = useState(false)
    const auth = useAuth(store => store.id)
    const [deleteReview] = useDeleteReview(data.id)
    const setConfirmDelete = useModalStore(store => store.setConfirmDelete)
    const setSnack = useModalStore(store => store.setSnack)

    const handleEdit = () => { setMenuOpen(false); navigateToEdit() }

    const handleDelete = () => { 
        setMenuOpen(false); 
        setConfirmDelete({
            message: 'Are you sure you want to delete this review?',
            confirm: () => deleteReview().then(() => { 
                if(refetch) refetch(); 
                setSnack('Review deleted') 
            })
        })
    }

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
                <View style={styles.headerRight}>
                    <RatingDisplay
                        hideLabel
                        rating={data.rating} 
                        style={{ marginRight: data.user.id === auth ? 8 : 16 }} 
                        iconSize={20}
                    />
                    { data.user.id === auth &&
                        <Menu 
                            visible={menuOpen}
                            onDismiss={() => setMenuOpen(false)}
                            anchor={
                                <TouchableRipple onPress={() => setMenuOpen(true)}>
                                    <Icon name={'dots-vertical'} size={24} style={{ padding: 8 }}/>
                                </TouchableRipple>
                            }>
                            <Menu.Item title={'Edit'} style={{ height: 40 }} onPress={handleEdit}/>
                            <Divider/>
                            <Menu.Item title={'Delete'} style={{ height: 40 }} onPress={handleDelete}/>
                        </Menu>
                    }
                </View>
            </View>
            { data.text && <Text style={styles.text}>{data.text}</Text> }
            <View style={styles.waterbody}>
                <MapMarkerIcon/>
                <Title style={styles.waterbodyName}>{data.waterbody.name}</Title>
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
    headerRight: {
        flexDirection: 'row',
        alignItems: 'center'
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
        fontWeight: '600',
        fontSize: 15,
        marginLeft: 6
    }
});

