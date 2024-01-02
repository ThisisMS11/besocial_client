import axios from "axios";
import { UserInfo, PostResponse } from '../types'
/* axios call to fetch userinfo using token */

export async function fetchOtherProfileInfo(userId: string | undefined) {
    try {
        const token = localStorage.getItem('token');

        if (token) {
            const config = {
                headers: {
                    'authorisation': `Bearer ${token}`
                }
            }
            /* for fetching user information */
            const response = await axios.get<UserInfo>(`${import.meta.env.VITE_APP_SERVER_URL_LOCAL}/api/v1/user/other/info/${userId}`, config);


            if (response.data.success) {
                return response.data.data;
            }

        }
    } catch (error) {
        console.error(error);
        throw error;
    }
}


export async function fetchOtherProfilePosts(userId: string | undefined) {
    try {
        const token = localStorage.getItem('token');
        /* for fetching user posts */
        const config = {
            headers: {
                'authorisation': `Bearer ${token}`
            }
        }

        const response = await axios.get<PostResponse>(`${import.meta.env.VITE_APP_SERVER_URL_LOCAL}/api/v1/user/other/posts/${userId}`, config)

        if (response.data.success) {
            return response.data.data;
        }

    } catch (error) {
        console.error(error);
        throw error;
    }
}




