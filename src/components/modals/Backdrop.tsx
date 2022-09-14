import { Pressable } from "react-native";

interface Props {
    onPress: () => void
}

const Backdrop = ({ onPress }: Props) => {
    return (
        <Pressable 
            onPress={onPress}
            style={{ 
                height: '100%', 
                width: '100%', 
                backgroundColor: 'rgba(0,0,0,.3)'
            }}
        />
    );
};

export default Backdrop;

