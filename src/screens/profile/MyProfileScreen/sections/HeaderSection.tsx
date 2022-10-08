import React, { useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { Text, IconButton, Menu, Divider } from 'react-native-paper'
import Avatar from "../../../../components/users/Avatar";
import { BottomTabsScreenProps } from "../../../../types/navigation";
import { useGetMyProfile } from "../../../../hooks/queries/useGetMyProfile";
import { ShareType, useShareContent } from "../../../../hooks/utils/useShareContent";
import HeaderUserLoading from "../loaders/HeaderUserLoading";

const { width } = Dimensions.get('screen')

interface Props {
  navigation: BottomTabsScreenProps<'MyProfileScreen'>['navigation']
}

const HeaderSection = ({ navigation }: Props) => {

  const { data, loading, error } = useGetMyProfile()
  const shareContent = useShareContent()
  const [menuOpen, setMenuOpen] = useState(false)
  const handleMenu = () => setMenuOpen(o => !o)
  
  const navigateImage = () => {
    if(!data || !data.me.avatar) return;
    navigation.navigate('ViewImageScreen', { uri: data.me.avatar, title: 'Your Avatar' })
  }

  const navigateSettings = () => { setMenuOpen(false); navigation.navigate('SettingsScreen') }
  const navigateEdit = () => { setMenuOpen(false); navigation.navigate('EditProfileScreen') }
  const handleShare = () => shareContent({ url: '', shareType: ShareType.MyProfile }).then(handleMenu)

  return (<>
    <View style={styles.container}>
      <View style={styles.user}>
        <Avatar 
          size={80}
          loading={loading}
          fullname={data?.me.fullname} 
          uri={data?.me.avatar}
          onPress={navigateImage}
        />
        { data ?
            <View>
              <Text style={styles.name}>{data?.me.fullname}</Text>
              <Text style={styles.location}>{data?.me.location || 'Harrisburg, Pennsylvania'}</Text>
            </View> :
           <HeaderUserLoading/>
        }
      </View>
      <IconButton onPress={handleMenu} icon={'dots-vertical'} style={styles.menu} />
    </View>
    <Menu onDismiss={handleMenu} visible={menuOpen} anchor={{ x: width, y: 40 }}>
      <Menu.Item title='Edit Profile' leadingIcon='pencil' contentStyle={styles.option} onPress={navigateEdit}/>
      <Menu.Item title='Share Profile' leadingIcon='share-variant' contentStyle={styles.option} onPress={handleShare}/>
      <Menu.Item title='Settings' leadingIcon='account-settings' contentStyle={styles.option} onPress={navigateSettings}/>
    </Menu>
  </>);
};

export default HeaderSection;

const styles = StyleSheet.create({
  container: {
    height: 140,
    width: width,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  user: {
    marginTop: 40,
    marginLeft: 24,
    flexDirection: 'row',
    alignItems: 'center'
  },
  name: {
    fontWeight: '600',
    fontSize: 24,
    marginLeft: 12
  },
  location: {
    fontSize: 16,
    marginTop: 2,
    marginLeft: 12,
  },
  menu: {
    marginTop: 40,
    marginRight: 16
  },
  option: {
    width: '45%',
    flexGrow: 1
  }
});
