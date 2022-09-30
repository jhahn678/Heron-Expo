import React from "react";
import { StyleSheet, View } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { BottomTabsScreenProps, MyProfileTabsParams } from "../types/navigation";
import HeaderSection from "../screens/profile/sections/HeaderSection";
import MyProfileScreen from "../screens/profile/MyProfileScreen/MyProfileScreen";
import ContactsTabScreen from "../screens/profile/ContactsTabScreen/ContactsTabScreen";

const Tab = createMaterialTopTabNavigator<MyProfileTabsParams>();

const MyProfileTabs = ({ navigation }: BottomTabsScreenProps<'MyProfileScreen'>) => {

  return (
        <View style={styles.container}>
            <HeaderSection navigation={navigation}/>
            <Tab.Navigator initialRouteName={'ProfileTab'}>
                <Tab.Screen
                    name="ProfileTab"
                    component={MyProfileScreen}
                    options={{ tabBarLabel: 'Profile' }}
                />
                <Tab.Screen
                    name='FriendsTab'
                    component={ContactsTabScreen}
                    options={{ tabBarLabel: 'Friends' }}
                />
            </Tab.Navigator>
        </View>
  );
};

export default MyProfileTabs;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%'
    },
});
