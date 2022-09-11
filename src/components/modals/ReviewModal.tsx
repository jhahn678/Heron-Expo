import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Button, Dialog, TextInput, Title } from "react-native-paper";
import { useCreateWaterbodyReview } from "../../hooks/mutations/useCreateWaterbodyReview";
import { useModalStore } from "../../store/modal/useModalStore";
import RatingInput from "../ratings/RatingInput";

interface Props {
    visible: boolean
    dismiss: () => void
}

const ReviewModal = (props: Props) => {

    const { 
        waterbody, 
        setShowErrorModal,
        setShowSuccess
    } = useModalStore(state => ({
        waterbody: state.reviewWaterbody,
        setShowErrorModal: state.setError,
        setShowSuccess: state.setSuccess
    }))

    const [createReview, { loading }] = useCreateWaterbodyReview()
    const [rating, setRating] = useState(5.0)
    const [text, setText] = useState('')

    const handleDismiss = () => {
        setRating(5.0)
        setText('')
        props.dismiss()
    }

    const handleSubmit = () => {
        if(waterbody) {
            const input = { rating, text, waterbody };
            createReview({
                variables: { input },
                onCompleted: () => {
                    handleDismiss()
                    setShowSuccess(true, 'REVIEW')
                },
                onError: (err) => {
                    if(err.message.includes('duplicate key value')){
                        handleDismiss()
                        setShowErrorModal(true, 'REVIEW_DUPLICATE')
                    }else{
                        console.error('from review modal', err)
                        props.dismiss()
                        setShowErrorModal(true)
                    }
                }
            })
        }else{
            props.dismiss()
            setShowErrorModal(true)
        }
    }

    return (
        <Dialog 
            theme={{ roundness: 2 }}
            visible={props.visible}
            onDismiss={handleDismiss}
            style={styles.container}
        >
            <Dialog.Title style={styles.title}>
                Tell us what you think 💬
            </Dialog.Title>
            <Dialog.Content style={styles.main}>
                <RatingInput value={rating} setValue={setRating}/>
                <TextInput 
                    mode="outlined" multiline
                    theme={{ roundness: 12 }}
                    style={styles.input}
                    placeholder="Share your thoughts"
                    value={text} onChangeText={setText}
                />
            </Dialog.Content>
            <Dialog.Actions>
                <Button
                    onPress={props.dismiss}
                >Cancel</Button>
                <Button 
                    labelStyle={{ fontWeight: '600' }}
                    loading={loading}
                    onPress={handleSubmit} 
                >Submit</Button>
            </Dialog.Actions>
        </Dialog>
    );
};

export default ReviewModal;

const styles = StyleSheet.create({
    container: {
        height: 460,
        width: '90%',
        position: 'relative',
        bottom: '8%'
    },
    main: {
        marginTop: 12,
        alignItems: 'center'
    },
    title: {
        fontSize: 20,
        fontWeight: '700'
    },
    input: {
        marginTop: 32,
        height: 200,
        width: '100%'
    }
});
