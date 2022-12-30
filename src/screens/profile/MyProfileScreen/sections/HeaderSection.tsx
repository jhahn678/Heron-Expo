import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import {  IconButton } from 'react-native-paper'
import { BottomTabsScreenProps } from "../../../../types/navigation";
import { ShareType } from "../../../../hooks/utils/useShareContent";
import ShareButton from "../../../../components/buttons/ShareButton";
import { useAuth } from "../../../../store/auth/useAuth";
import Icon from 'react-native-vector-icons/MaterialIcons'
import FIcon from 'react-native-vector-icons/Feather'
import globalStyles from "../../../../globalStyles";

const { width } = Dimensions.get('screen')

interface Props {
  navigation: BottomTabsScreenProps<'MyProfileScreen'>['navigation']
}

const HeaderSection = ({ navigation }: Props) => {

  const id = useAuth(store => store.id)
  const navigateSettings = () => navigation.navigate('SettingsScreen');
  const navigateSearchUsers = () => navigation.navigate("UserSearchScreen")

  return (
    <View style={styles.container}>
        <ShareButton 
          id={id} 
          mode={'contained'}
          shareType={ShareType.MyProfile}/>
        <View style={globalStyles.frac}>
          <IconButton 
            mode={"contained"} 
            icon={"account-plus-outline"} 
            onPress={navigateSearchUsers}/>
          <IconButton 
            mode={"contained"} 
            icon={(args) => <Icon name="settings" {...args}/>} 
            onPress={navigateSettings}/>
        </View>
    </View>
  );
};

export default HeaderSection;

const styles = StyleSheet.create({
  container: {
    height: 90,
    width: width,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: 16
  }
});
