import { StyleSheet, StyleProp, ViewStyle, Pressable } from 'react-native'
import { Text } from 'react-native-paper';
import { Rating } from "react-native-ratings";
import { DEFAULT_BACKGROUND } from '../../globalStyles';

interface Props {
    rating: number | undefined | null,
    numberOfRatings?: number | undefined
    iconSize?: number
    onPress?: () => void
    style?: StyleProp<ViewStyle>
    hideLabel?: boolean
    backgroundColor?: string
    ratingBackgroundColor?: string
}

const RatingDisplay = ({
    ratingBackgroundColor,
    backgroundColor,
    numberOfRatings,
    hideLabel=false,
    iconSize=28,
    onPress, 
    rating,
    style,
}: Props) => {

    return (
        <Pressable onPress={onPress} style={style}>
            <Rating
                tintColor={backgroundColor || DEFAULT_BACKGROUND}
                ratingBackgroundColor={ratingBackgroundColor|| 'white'}
                readonly fractions={1}
                type='custom'
                startingValue={rating || 0} 
                style={{ width: iconSize * 4.9 }}
                imageSize={iconSize}
            />
            {hideLabel === false && (numberOfRatings === 0 ?
                <Text style={styles.labelNoRating}>
                    Be the first to leave a review!
                </Text> :
                <Text style={styles.label}>
                    {rating || 0} stars   &bull;   {numberOfRatings || 0} { numberOfRatings === 1 ? 'rating' : 'ratings'}
                </Text>
            )}
        </Pressable>
    )
}

export default RatingDisplay;

const styles = StyleSheet.create({
    label: {
        fontWeight: '500',
        marginTop: 12,
    },
    labelNoRating: {
        fontWeight: '500',
        marginTop: 12
    }
})