import { useQuery } from "@tanstack/react-query";
import { axios } from "../../config/axios";
import { useAuth } from "../../store/auth/useAuth";
import { IUser } from "../../types/User";
import { transformToFullname } from "../../utils/conversions/transformToFullname";
import { transformToLocation } from "../../utils/conversions/transformToLocation";

export type SearchUsersRes = Pick<
    IUser, 
    | 'id'
    | 'firstname'
    | 'lastname'
    | 'username'
    | 'avatar'
    | 'city'
    | 'state'
> & { am_following: boolean }

const searchUsers = async (value: string | undefined, id: number | null | undefined) => {
    let url = `/autocomplete/users?value=${value}`
    if(id) url += `&user=${id}`
    const res = await axios.get<SearchUsersRes[]>(url)
    return res.data.map<UseSearchUsersRes>(user => ({
        ...user,
        fullname: transformToFullname(user.firstname, user.lastname),
        location: transformToLocation(user.city, user.state)
    }))
}

export type UseSearchUsersRes = SearchUsersRes & {
    fullname: string | null
    location: string | null
}

export const useSearchUsers = (input: string) => {
    const id = useAuth(store => store.id)
    return useQuery<UseSearchUsersRes[], Error>({
        queryFn: () => searchUsers(input, id),
        queryKey: ['users', input]
    })
}