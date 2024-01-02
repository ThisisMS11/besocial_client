import axios from "axios";

export async function fetchPosts() {
    try {
        const token = localStorage.getItem('token');
        return await axios.get(`${import.meta.env.VITE_APP_SERVER_URL_LOCAL}/api/v1/post/`, {
            headers: {
                'authorisation': `Bearer ${token}`
            }
        }).then((response) => {
            return response.data.posts
        })
    } catch (error) {
        console.error(error);
        throw error;
    }
}