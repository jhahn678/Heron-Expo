import { faker } from "@faker-js/faker";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Title } from "react-native-paper";
import Avatar from "../../../../components/users/Avatar";
import dayjs from "../../../../config/dayjs";
import { theme } from "../../../../config/theme";
import globalStyles from "../../../../globalStyles";
import { GetCatchRes } from "../../../../hooks/queries/useGetCatch";
import { RootStackScreenProps } from "../../../../types/navigation";

interface Props {
  navigation: RootStackScreenProps<"ViewCatchScreen">["navigation"];
  data: GetCatchRes["catch"] | undefined
}

const HeadingSection = ({ navigation, data }: Props) => {
    
    const navigateToWaterbody = () => {
        if(!data) return;
        navigation.navigate('MainTabs', {
            screen: "ExploreStack",
            params: {
                screen: 'WaterbodyScreen',
                params: { id: data.waterbody.id }
            }
        })
    }

    const navigateToUser = () => {
        if(!data) return;
        navigation.navigate('UserProfileScreen', { id: data.user.id })
    }
    
    return (
      <View style={styles.container}>
        {/* Title -- waterbody -- User - created at - species -- description */}
        <Title style={styles.title}>{data?.title || "Untitled Catch"}</Title>
        <View style={globalStyles.baseline}>
          <Text style={styles.at}>at</Text>
          <Text style={styles.place} numberOfLines={1}>
            {data?.waterbody.name}
          </Text>
        </View>
        <View style={styles.user}>
            <Avatar 
            size={32}
            fullname={data?.user.fullname} 
            uri={data?.user.avatar} 
            onPress={navigateToUser}
            />
            <Text style={styles.name}>{data?.user.fullname}</Text>
            <View style={styles.divider}/>
            <Text style={styles.created}>Logged {dayjs(data?.created_at).fromNow()}</Text>
        </View>
        <Text style={styles.description}>{data?.description || faker.lorem.paragraph()}</Text>
      </View>
    );
};

export default HeadingSection;

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontWeight: "600",
    fontSize: 28,
  },
  at: {
    fontSize: 20,
    paddingRight: 6,
  },
  place: {
    marginTop: 8,
    fontSize: 20,
    fontWeight: "500",
  },
  user: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
  },
  name: {
    fontWeight: "500",
    fontSize: 16,
    paddingLeft: 6,
  },
  divider: {
    width: 1,
    height: 24,
    backgroundColor: "rgba(0,0,0,.2)",
    marginHorizontal: 16,
  },
  created: {
    fontWeight: "500",
  },
  description: {
    marginVertical: 24,
    paddingVertical: 24,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#e0e0e0',
    fontSize: 15,
    lineHeight: 24
  }
});
