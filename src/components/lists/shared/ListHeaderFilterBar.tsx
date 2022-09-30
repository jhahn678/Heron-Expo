import React from "react";
import { Pressable, StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import { Text, Chip } from 'react-native-paper'
import { theme } from "../../../config/theme";
import globalStyles from '../../../globalStyles'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

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
        <Text style={styles.chip}>{sortLabel}</Text>
      </View>
      <Pressable onPress={() => setMenuOpen(o => !o)} style={styles.button}>
        <Text style={styles.edit}>Sort by</Text>
        <Icon name='chevron-down' color={theme.colors.primary} size={14}/>
      </Pressable>
    </View>
  );
};

export default ListHeaderFilterBar;

const styles = StyleSheet.create({
  sort: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
    backgroundColor: theme.colors.secondary
  },
  total: {
    fontWeight: "500",
    fontSize: 16,
    marginRight: 16,
    color: theme.colors.onSecondary
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: theme.colors.primary,
    borderWidth: 2,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
    backgroundColor: theme.colors.secondaryContainer,
  },
  edit: {
    marginRight: 4,
    fontWeight: '500',
    color: theme.colors.primary
  },
  chip: {
    backgroundColor: theme.colors.secondaryContainer,
    color: theme.colors.onPrimaryContainer,
    paddingHorizontal: 12,
    paddingVertical: 4,
    fontWeight: "500",
    borderRadius: 8,
  }
});
