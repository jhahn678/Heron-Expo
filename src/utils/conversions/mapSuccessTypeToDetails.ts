import { Details } from '../../store/modal/useModalStore'

export type SuccessType = 
| 'UPLOAD'
| 'REVIEW'
| 'CATCH'
| 'LOCATION'
| 'DEFAULT'

const SuccessDetails: { [index in SuccessType]: Details } = {
    UPLOAD: {
        title: 'Thank you for contributing! 😄',
        message: 'Your images have been successfully saved. \
        Uploading images is a huge help, not only to us, but \
        the rest of the community as well!'
    },
    CATCH: {
        title: 'Well done! 🎣',
        message: 'Your catch was successfully saved. \
        Thanks for sharing!'
    },
    LOCATION: {
        title: 'Location saved 📍',
        message: 'Your fishing spot was successfully saved.'
    },
    REVIEW: {
        title: 'Review submitted! 😄',
        message: 'Your review has been successfully saved. \
        Adding reviews is a huge help to us and the rest of the community!'
    },
    DEFAULT: {
        title: 'Success 🎉',
        message: 'Your request was successfully processed!'
    }
}

export const mapSuccessTypeToDetails = (type?: SuccessType) => {
    if(type) return SuccessDetails[type]
    return SuccessDetails['DEFAULT']
}