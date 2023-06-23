import axios from "axios";

/* unfollow a user */
export async function fetchMessages(userId: string) {
    const token = localStorage.getItem('token');

    return await axios.get(`${import.meta.env.VITE_APP_URL_LOCAL}/api/v1/message/${userId}`, {
        headers: {
            'authorisation': `Bearer ${token}`
        }
    })
}

/* Post a message */
export async function PostMessage(userId: string, message: string) {
    const token = localStorage.getItem('token');

    const config = {
        headers: {
            'authorisation': `Bearer ${token}`
        }
    }

    return await axios.post(`${import.meta.env.VITE_APP_URL_LOCAL}/api/v1/message/${userId}`, { message }, config);
}


/* get all message of our user */
export async function fetchAllMessages() {
    const token = localStorage.getItem('token');

    return await axios.get(`${import.meta.env.VITE_APP_URL_LOCAL}/api/v1/message/`, {
        headers: {
            'authorisation': `Bearer ${token}`
        }
    })
}