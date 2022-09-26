import { Pressable } from "react-native";

interface Props {
    onPress: () => void
}

const Backdrop = ({ onPress }: Props) => {
    return (
        <Pressable 
            onPress={onPress}
            style={{ 
                position: 'absolute',
                top: 0,
                left: 0,
                height: '100%', 
                width: '100%', 
                backgroundColor: 'rgba(0,0,0,.2)'
            }}
        />
    );
};

export default Backdrop;

