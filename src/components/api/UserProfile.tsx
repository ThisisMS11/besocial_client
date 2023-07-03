import axios from "axios";
import { UserInfo, PostResponse, getNotificationsResponse } from '../types'
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

export async function fetchUserNotifications() {
    const token = localStorage.getItem('token');

    return await axios.get<getNotificationsResponse>(`${import.meta.env.VITE_APP_URL_LOCAL}/api/v1/notification/getnotifications`, {
        headers: {
            'authorisation': `Bearer ${token}`
        }
    })
}

// function to accept a notification 
export async function acceptNotification(notificationId: string) {
    const token = localStorage.getItem('token');

    return await axios.put(`${import.meta.env.VITE_APP_URL_LOCAL}/api/v1/notification/accept/${notificationId}`, {}, {
        headers: {
            'authorisation': `Bearer ${token}`
        }
    })
}

// function to decline a notification
export async function rejectNotification(notificationId: string) {
    const token = localStorage.getItem('token');

    return await axios.put(`${import.meta.env.VITE_APP_URL_LOCAL}/api/v1/notification/reject/${notificationId}`, {}, {
        headers: {
            'authorisation': `Bearer ${token}`
        }
    })
}


/* make a follow request */
export async function followRequest(userId: string) {
    const token = localStorage.getItem('token');

    return await axios.put(`${import.meta.env.VITE_APP_URL_LOCAL}/api/v1/user/follow/${userId}`, {}, {
        headers: {
            'authorisation': `Bearer ${token}`
        }
    })
}


/* unfollow a user */
export async function unfollowUser(userId: string) {
    const token = localStorage.getItem('token');

    return await axios.put(`${import.meta.env.VITE_APP_URL_LOCAL}/api/v1/user/unfollow/${userId}`, {}, {
        headers: {
            'authorisation': `Bearer ${token}`
        }
    })
}


/* Edit User Information */
export async function updateUserInfo(name: string, email: string) {
    const token = localStorage.getItem('token');

    return await axios.put(`${import.meta.env.VITE_APP_URL_LOCAL}/api/v1/user/updateinfo/`, {
        name: name,
        email: email
    }, {
        headers: {
            'authorisation': `Bearer ${token}`
        }
    })
}


/* Update the profile image here */
export async function updateProfileImage(image: any) {
    const data = Object.fromEntries(image.entries());
    console.log(data);

    const token = localStorage.getItem('token');

    const config = {
        headers: {
            'authorisation': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
        }
    }

    return await axios.put(`${import.meta.env.VITE_APP_URL_LOCAL}/api/v1/user/updateProfilePic/`, image, config)
}