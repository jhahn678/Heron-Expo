import React from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import { Text, Button, Chip } from 'react-native-paper'
import globalStyles from '../../../globalStyles'

interface Props {
    total?: number
    sortLabel: string
    setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>
    style?: StyleProp<ViewStyle>
}

const ListHeaderFilterBar = ({ total, sortLabel, setMenuOpen, style }: Props) => {

  return (
    <View style={[styles.sort, style]}>
      <View style={globalStyles.frac}>
        {total ? <Text style={styles.total}>{total} results</Text> : null}
        <Chip compact textStyle={{ fontSize: 12 }} style={{ height: 32 }}>
          {sortLabel}
        </Chip>
      </View>
      <Button icon="chevron-down" onPress={() => setMenuOpen(o => !o)}>
        Sort by
      </Button>
    </View>
  );
};

export default ListHeaderFilterBar;

const styles = StyleSheet.create({
    total: {
    fontWeight: "600",
    fontSize: 16,
    marginRight: 16
  },
  sort: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 12,
    marginHorizontal: 12,
  },
});
