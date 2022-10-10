import { StyleSheet, StyleProp, ViewStyle } from 'react-native'
import { AirbnbRating } from "react-native-ratings";

interface Props {
    value: number,
    setValue: (value: number) => void
    iconSize?: number
    style?: StyleProp<ViewStyle>
}

const RatingInput = ({ iconSize=40, value, setValue, style }: Props) => {


    return (
            <AirbnbRating
                size={iconSize}
                showRating={false}
                defaultRating={value}
                onFinishRating={setValue}
                ratingContainerStyle={[style, { width: iconSize * 5 }]}
            />
    )
}

export default RatingInput;

const styles = StyleSheet.create({
    label: {
        fontWeight: '500',
        marginTop: 12,
        marginLeft: 4
    },
    labelNoRating: {
        fontWeight: '500',
        marginTop: 12
    }
})