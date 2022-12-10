import { AxiosError } from "axios";

export const checkAxiosErrorStatus = (err: AxiosError<unknown, any>): number | null => {
    if(!err.response) return null;
    return err.response.status;

}