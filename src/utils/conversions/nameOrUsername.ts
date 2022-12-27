import { IUser } from "../../types/User"

/**
 * 
 * @param user User object
 * @param defaultValue A default value to return if firstname or username doesn't exist
 * @returns User's firstname, username, or the default value. "User" if no default provided
 */
export const nameOrUsername = <TUser extends Pick<IUser, 'firstname' | 'username'>>(
    user: TUser | undefined | null,
    defaultValue?: string
) => {
    if(user?.firstname) return user.firstname;
    if(user?.username) return user.username;
    if(defaultValue) return defaultValue;
    return "User"
}