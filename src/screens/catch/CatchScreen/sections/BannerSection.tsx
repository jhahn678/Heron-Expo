import React from "react";
import { StyleSheet, View, Dimensions, Pressable, Image, FlatList } from "react-native";
import { RootStackScreenProps } from "../../../../types/navigation";
import { Text, Button } from 'react-native-paper'
import BackButton from "../../../../components/buttons/BackButton";
import { GetCatchRes } from "../../../../hooks/queries/useGetCatch";
import ShareButton from "../../../../components/buttons/ShareButton";
import { ShareType } from "../../../../hooks/utils/useShareContent";

interface Props {
    navigation: RootStackScreenProps<'ViewCatchScreen'>['navigation']
    data: GetCatchRes['catch']['media'] | undefined
    id: number
}

const { width, height } = Dimensions.get('window')

const BannerSection = ({ navigation, id, data }: Props) => {
    
    const navigateToImage = (id: number) => () => navigation.navigate("ViewImageScreen", { id });

    return (
      <View style={styles.container}>
        <BackButton style={styles.back}/>
        <ShareButton id={id} shareType={ShareType.Catch} style={styles.share}/>
        <FlatList
          data={data}
          horizontal={true}
          pagingEnabled={true}
          renderItem={({ item }) => (
            <Pressable onPress={navigateToImage(item.id)}>
              <Image source={{ uri: item.url }} style={styles.image}/>
            </Pressable>
          )}
        />
      </View>
    );
};

export default BannerSection;

const styles = StyleSheet.create({
  container: {
    height: height * 0.5,
    backgroundColor: "#e0e0e0",
  },
  back: {
    position: "absolute",
    zIndex: 100,
    top: 32,
    left: 12,
  },
  share: {
    position: "absolute",
    zIndex: 100,
    top: 32,
    right: 12,
  },
  image: {
    flex: 1,
    width: width,
  },
});
