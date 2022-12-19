import React from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import { Chip, Text } from 'react-native-paper'
import { theme } from "../../../config/theme";
import globalStyles from "../../../globalStyles";

interface Props {
    total?: number
    sortLabel: string
    setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>
    style?: StyleProp<ViewStyle>
}

const ListHeaderFilterBar = ({ total, sortLabel, setMenuOpen, style }: Props) => {

  const handleOpenMenu = () => setMenuOpen(x => !x)

  return (
    <View style={[styles.chips, style]}>
      <Text variant={"titleMedium"} style={styles.total}>
        {total ? total === 1 ? `1 result` : `${total} results` : "0 results"}
      </Text>
      <Chip 
        style={styles.chip} 
        icon={'chevron-down'} 
        onPress={handleOpenMenu} 
        mode={'outlined'}
      >{sortLabel}</Chip>
    </View>
  )
};

export default ListHeaderFilterBar;

const styles = StyleSheet.create({
  total: {
    color: theme.colors.onSecondaryContainer,
    marginRight: 16
  },
  chips: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 16,
  },
  chip: {
    height: 40,
    borderColor: theme.colors.primary,
    backgroundColor: theme.colors.secondaryContainer
  },
});
