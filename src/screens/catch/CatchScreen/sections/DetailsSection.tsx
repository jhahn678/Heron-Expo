 import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { GetCatchRes } from "../../../../hooks/queries/useGetCatch";
import dayjs from "../../../../config/dayjs";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import FishingRodIcon from "../../../../components/icons/FishingRodIcon";
import FishIcon from "../../../../components/icons/FishIcon";
import { theme } from "../../../../config/theme";

interface Props {
    data: GetCatchRes['catch'] | undefined
}

const DetailsSection = ({ data }: Props) => {
  
    return (
      <View style={styles.container}>
        { data?.description &&
          <Text style={styles.description}>
            {data.description}
          </Text>
        }
        <View style={styles.barTop}>
            <FishIcon style={styles.icon} size={24}/>
            <View>
              <Text style={styles.label}>Species</Text>
              <Text style={styles.value}>{data?.species || "Not Provided"}</Text>
            </View>
        </View>
         <View style={styles.bar}>
            <Icon name='clock-outline' size={24} color={theme.colors.primary} style={styles.icon}/>
            <View>
              <Text style={styles.label}>Time</Text>
              <Text style={styles.value}>{dayjs(data?.created_at).format("h:mm a")}</Text>
            </View>
            <View style={styles.divider}/>
            <Icon name='ruler' size={24} color={theme.colors.primary} style={styles.icon}/>
            <View>
              <Text style={styles.label}>Length</Text>
              <Text style={styles.value}>{data?.length ? `${data.length} in` : "—"}</Text>
            </View>
            <View style={styles.divider}/>
            <Icon name='scale' size={24} color={theme.colors.primary} style={styles.icon}/>
            <View>
              <Text style={styles.label}>Weight</Text>
              <Text style={styles.value}>{data?.weight ? `${data.weight} in` : "—"}</Text>
            </View>
        </View>
        <View style={styles.bar}>
            <FishingRodIcon style={styles.icon} size={24}/>
            <View>
              <Text style={styles.label}>Caught with</Text>
              <Text style={styles.value}>{data?.rig || "Not Provided"}</Text>
            </View>
        </View>
      </View>
    );
};

export default DetailsSection;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12
  },
  description: {
    paddingHorizontal: 16,
    fontSize: 15,
    lineHeight: 24,
    paddingTop: 24,
    paddingBottom: 40,
    borderBottomWidth: 1,
    borderColor: '#e0e0e0',
  },
  label: {
    fontWeight: "300",
    fontSize: 12,
  },
  value: {
    fontSize: 16,
    fontWeight: "500",
  },
  divider: {
    height: "100%",
    width: 1,
    backgroundColor: "#e0e0e0",
    marginLeft: 24,
    marginRight: 16
  },
  barTop: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderColor: '#e0e0e0',
  },
  bar: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderColor: '#e0e0e0',
  },
  icon: {
    marginRight: 12
  }
});
