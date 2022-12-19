export interface RestError {
    error: string
    code: ErrorCode
}

export type ErrorCode =
| keyof typeof AuthErrorType 
| 'AUTH_ERROR'
| 'DUPLICATE_CONTACT' 
| 'DUPLICATE_CONTACT_REQUEST'
| 'DELETE_NOT_FOUND' 
| 'RESOURCE_NOT_FOUND'
| 'TRANSACTION_NOT_FOUND' 
| 'REQUEST_UNDEFINED'
| 'REQUEST_FAILED' 
| 'INVALID_REFERENCE' 
| 'COORDS_INVALID'
| 'INVALID_FILE_TYPE' 
| 'INVALID_URL'
| "AUTOCOMPLETE_ERROR"
| 'COORDINATES_NOT_WITHIN_BOUNDARY'
| 'INVALID_COORDINATES'
| 'INVALID_LONGITUDE'
| 'INVALID_LATITUDE' 
| 'NOT_WITHIN_BOUNDARY'
| "COORDINATE_ERROR"

export enum AuthErrorType {
    /** 
     * @Status 400 @Message The credentials provided are invalid
    */
    'INVALID_CREDENTIALS',
    /** 
     * @Status 400 @Message The email provided is invalid
    */
    'EMAIL_IN_USE',
    /** 
     * @Status 400 @Message The email provided is already in use
    */
    'EMAIL_INVALID',
    /** 
     * @Status 400 @Message The username provided is invalid
    */
    'USERNAME_INVALID',
    /** 
     * @Status 400 @Message The username provided is already in user
    */
   'USERNAME_IN_USE',
    /** 
     * @Status 400 @Message Could not authenticate request
    */
    'AUTHENTICATION_FAILED',
    /** 
     * @Status 403 @Message Authentication not provided
    */
    'AUTHENTICATION_REQUIRED',
    /** 
     * @Status 403 @Message Request not authorized
    */
    'UNAUTHORIZED',
    /** 
     * @Status 401 @Message The provided authentication token is invalid
    */
    'TOKEN_INVALID',
    /** 
     * @Status 401 @Message The provided authentication token is expired
    */
    'TOKEN_EXPIRED',
    /** 
     * @Status 400 @Message Access token expired
    */
    'ACCESS_TOKEN_EXPIRED',
    /** 
     * @Status 401 @Message Access token invalid
    */
    'ACCESS_TOKEN_INVALID',
    /** 
     * @Status 401 @Message Refresh token expired
    */
    'REFRESH_TOKEN_EXPIRED',
    /** 
     * @Status 401 @Message Refresh token invalid
    */
    'REFRESH_TOKEN_INVALID',
    /** 
     * @Status 400 @Message Could not send password reset email
    */
    'PASSWORD_RESET_EMAIL_FAILED',
    /**
     * @Status 400 @Message Facebook account already in use
    */
    'FACEBOOK_ACCOUNT_IN_USE',
    /** 
     * @Status 500 @Message Could not fetch profile from facebook
    */
    'FACEBOOK_AUTH_FAILED',
    /**
     * @Status 400 @Message Google account already in use
    */
    'GOOGLE_ACCOUNT_IN_USE',
    /** 
     * @Status 500 @Message Could not fetch profile from google
    */
    'GOOGLE_AUTH_FAILED',
    /** 
     * @Status 400 @Message Apple account already in use
    */
    'APPLE_ACCOUNT_IN_USE',
    /** 
     * @Status 400 @Message Provided password is invalid
    */
    'PASSWORD_INVALID'
}