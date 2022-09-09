import { Details } from '../store/modal/useModalStore'

export type ErrorType = 
| 'UPLOAD'
| 'UPLOAD_PARTIAL'
| 'REVIEW_DUPLICATE'
| 'CATCH'
| 'LOCATION'
| 'DEFAULT'

const ErrorDetails: { [index in ErrorType]: Details } = {
    UPLOAD: {
        title: 'There was an issue 🤔',
        message: "We ran into a problem uploading your images. The problem \
        may be the format of the images."
    },
    UPLOAD_PARTIAL: {
        title: 'There was an issue 🤔',
        message: 'Some of the images you attempted to upload could not be \
        processed. The problem may have been the image format.'
    },
    CATCH: {
        title: '',
        message: '',
    },
    LOCATION: {
        title: '',
        message: '',
    },
    REVIEW_DUPLICATE: {
        title: '',
        message: '',
    },
    DEFAULT: {
        title: 'Something went wrong 😵‍💫',
        message: 'You may need to refresh your app to get things working again'
    }
}

export const mapErrorTypeToDetails = (type?: ErrorType) => {
    if(type) return ErrorDetails[type];
    return ErrorDetails['DEFAULT'];
}