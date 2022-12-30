import ReviewRatingBottomSheet from "./ReviewRatingBottomSheet";
import ReviewBodyBottomSheet from "./ReviewBodyBottomSheet";
import ReviewImagesBottomSheet from "./ReviewImagesBottomSheet";
import Backdrop from "../Backdrop";
import { useReviewModalStore } from "../../../store/mutations/useReviewModalStore";
import { useState } from "react";
import { useUploadImages } from "../../../hooks/mutations/useUploadImages";
import { useAddWaterbodyMedia } from "../../../hooks/mutations/useAddWaterbodyMedia";
import { useCreateWaterbodyReview } from "../../../hooks/mutations/useCreateWaterbodyReview";
import { useModalStore } from "../../../store/modal/useModalStore";
import { SuccessType } from "../../../utils/conversions/mapSuccessTypeToDetails";
import { ApolloError } from "@apollo/client";
import { ErrorType } from "../../../utils/conversions/mapErrorTypeToDetails";
import { useImageStore } from "../../../store/image/useImageStore";

const handleError = (error: ApolloError) => error.message
    .includes('waterbody_review_one_per_user') ? ErrorType.ReviewDuplicate : ErrorType.Default

const ReviewModal = () => {

    const [step, setStep] = useState(0)
    const handleNextStep = () => setStep(s => s + 1)
    const handleLastStep = () => setStep(s => s - 1)

    const images = useImageStore(store => store.images)
    const active = useReviewModalStore(store => store.active)
    const refetch = useReviewModalStore(store => store.refetch)
    const resetReview = useReviewModalStore(store => store.reset)
    const clearImages = useImageStore(store => store.clearImages)
    const waterbodyId = useReviewModalStore(store => store.waterbody)
    const handleResetReview = () => { setStep(0); resetReview(); clearImages(); }

    const { uploadToS3 } = useUploadImages()
    const [createReview] = useCreateWaterbodyReview()
    const [saveImages] = useAddWaterbodyMedia(waterbodyId)
    const setLoading = useModalStore(store => store.setLoading)
    const setError = useModalStore(store => store.setError)
    const setSuccess = useModalStore(store => store.setSuccess)
    const getValues = useReviewModalStore(store => store.getValues)
    const reauthenticate = useModalStore(store => store.reauthenticate)

    const handleSubmitReview = async () => {
        const input = getValues();
        if(!input) return; 
        setLoading(true);
        if(images.length > 0){
            const pending = images.map(({ uri, id }) => ({ uri, id }))
            const uploads = await uploadToS3(pending);
            if(uploads.length !== pending.length){
                if(uploads.length > 0){
                    setError(true, ErrorType.UploadPartial)
                }else{
                    if(reauthenticate) return;
                    setError(true, ErrorType.Upload)
                }
            }
            if(uploads.length){
                if(uploads.length !== pending.length){
                    setError(true, ErrorType.UploadPartial)
                }
                await saveImages({ variables: { id: input.waterbody, media: uploads } })
            }else{
                if(reauthenticate) return;
                setError(true, ErrorType.Upload)
            }
        } 
        await createReview({ 
            variables: { input },
            onCompleted: () => { 
                if(refetch) refetch();
                handleResetReview(); 
                setSuccess(true, SuccessType.Review); 
            },
            onError: (err) => { 
                console.error(err)
                setError(true, handleError(err)); 
                handleResetReview() 
            }
        })
        setLoading(false)
    }
    
    if(!active) return null;

    return (
        <>
            <ReviewRatingBottomSheet
                visible={step === 0}
                onSubmit={handleNextStep}
                onClose={handleResetReview}/> 
            <ReviewBodyBottomSheet 
                visible={step === 1} 
                onSubmit={handleNextStep} 
                onBack={handleLastStep}
                onClose={handleResetReview}/> 
            <ReviewImagesBottomSheet 
                visible={step === 2} 
                onSubmit={handleSubmitReview} 
                onBack={handleLastStep}
                onClose={handleResetReview}/> 
            <Backdrop onPress={handleResetReview}/>
        </>
    )
}

export default ReviewModal;
