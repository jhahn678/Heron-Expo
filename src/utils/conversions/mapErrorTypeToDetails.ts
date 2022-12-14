import { Details } from '../../store/modal/useModalStore'

export enum ErrorType {
    Default = 'DEFAULT',
    Upload = 'UPLOAD',
    UploadPartial = 'UPLOAD_PARTIAL',
    ReviewDuplicate = 'REVIEW_DUPLICATE',
    CreateCatch = 'CREATE_CATCH',
    EditCatch = 'EDIT_CATCH',
    MapCatch = 'MAP_CATCH',
    CreateLocation = 'CREATE_LOCATION',
    EditLocation = 'EDIT_LOCATION',
    MapLocation = 'MAP_LOCATION',
    MapNoCatches = 'MAP_NO_CATCHES',
    MapNoCatchesLogged = 'MAP_NO_CATCHES_LOGGED',
    MapNoLocations = 'MAP_NO_LOCATIONS',
    MapCurrentLocation = 'MAP_CURRENT_LOCATION',
    RequestError = 'REQUEST_ERROR'
}

const ErrorDetails: { [key in ErrorType]: Details } = {
    UPLOAD: {
        title: 'There was an issue 🤔',
        message: "We ran into a problem uploading your images."
    },
    UPLOAD_PARTIAL: {
        title: 'There was an issue 🤔',
        message: 'Some of the images you attempted to upload could not be \
        processed. The problem may have been the image format.'
    },
    CREATE_CATCH: {
        title: 'Something went wrong 😵‍💫',
        message: 'Could not create catch. Please try again'
    },
    EDIT_CATCH: {
        title: 'Something went wrong 😵‍💫',
        message: 'Could not save catch. Please try again'
    },
    MAP_CATCH: {
        title: 'Something went wrong 😵‍💫',
        message: 'Could not display catch on map'
    },
    EDIT_LOCATION: {
        title: 'Something went wrong 😵‍💫',
        message: 'Could not save location. Please try again'
    },
    CREATE_LOCATION: {
        title: 'Something went wrong 😵‍💫',
        message: 'Could not create location. Please try again'
    },
    MAP_LOCATION: {
        title: 'Something went wrong 😵‍💫',
        message: 'Could not display location in map'
    },
    REVIEW_DUPLICATE: {
        title: 'Duplicate Review',
        message: "It looks like you've already left a review for this fishery.",
    },
    MAP_CURRENT_LOCATION: {
        title: 'There was an issue 🤔',
        message: 'Your location is not available. \
        Please make sure location permissions are enabled'
    },
    MAP_NO_CATCHES: {
        title: 'Nothing to display 🗺',
        message: 'No catches available to display'
    },
    MAP_NO_CATCHES_LOGGED: {
        title: 'Nothing to display 🗺',
        message: 'There are no catches logged here yet'
    },
    MAP_NO_LOCATIONS: {
        title: 'Nothing to display 🗺',
        message: 'There are no locations available to display'
    },
    REQUEST_ERROR: {
        title: 'Request Error',
        message: 'There was a problem making a request to the server'
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