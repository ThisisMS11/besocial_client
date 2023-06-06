import axios from "axios";
import { UserInfo, PostResponse } from '../types'
/* axios call to fetch userinfo using token */


export async function fetchUserInfo() {
    try {
        const token = localStorage.getItem('token');

        if (token) {
            const config = {
                headers: {
                    'authorisation': `Bearer ${token}`
                }
            }
            /* for fetching user information */
            const response = await axios.get<UserInfo>(`${import.meta.env.VITE_APP_URL_LOCAL}/api/v1/user/`, config);

            if (response.data.success) {
                return response.data.data;
            }

        }
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function fetchUserPosts() {
    try {
        const token = localStorage.getItem('token');
        /* for fetching user posts */
        const config = {
            headers: {
                'authorisation': `Bearer ${token}`
            }
        }
        const response = await axios.get<PostResponse>(`${import.meta.env.VITE_APP_URL_LOCAL}/api/v1/user/posts`, config)

        console.log(response.data);
        if (response.data.success) {
            return response.data.data;
        }

    } catch (error) {
        console.error(error);
        throw error;
    }
}



