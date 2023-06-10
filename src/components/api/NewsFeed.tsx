import axios from "axios";

export async function fetchPosts(utils: any) {
    try {
        utils?.setLoading(true);
        const token = localStorage.getItem('token');
        return await axios.get(`${import.meta.env.VITE_APP_URL_LOCAL}/api/v1/post/`, {
            headers: {
                'authorisation': `Bearer ${token}`
            }
        }).then((response) => {
            utils?.setLoading(false);
            return response.data.posts
        })
    } catch (error) {
        utils?.setLoading(false);
        console.error(error);
        throw error;
    }
}