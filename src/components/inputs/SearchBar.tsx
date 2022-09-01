import { StyleSheet } from "react-native";
import { Searchbar } from "react-native-paper";

interface Props {
    value: string,
    setValue: (value: string) => void
}

const SearchBar = (props: Props): JSX.Element => {
    
    return (
        <Searchbar style={styles.searchbar}
            theme={{ roundness:  12 }}
            value={props.value}
            onChangeText={props.setValue}
        />
    )
}

export default SearchBar;

const styles = StyleSheet.create({
    searchbar: {
        width: '100%'
    }
})
