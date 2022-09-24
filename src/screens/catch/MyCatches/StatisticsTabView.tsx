import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { MyCatchesTabsScreenProps } from "../../../types/navigation";
import { useGetUserCatchStatistics } from "../../../hooks/queries/useGetUserCatchStatistics";
import { useAuth } from "../../../store/auth/useAuth";

const StatisticsTabView = ({ navigation }: MyCatchesTabsScreenProps<'MyCatchesStatistics'>) => {

  const id = useAuth(state => state.id)

  const { data, error, loading } = useGetUserCatchStatistics(id)

  return (
    <View>
      <Text>StatisticsTabScreen</Text>
    </View>
  );
};

export default StatisticsTabView;

const styles = StyleSheet.create({});
