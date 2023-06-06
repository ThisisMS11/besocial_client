import axios from "axios";

export async function getSearchUsers() {
    try {
        const response = await axios.get(`${import.meta.env.VITE_APP_URL_LOCAL}/api/v1/user/allusers`, {
            headers: {
                "authorisation": `Bearer ${localStorage.getItem("token")}`
            }
        });
        return response.data.data;
    } catch (error) {
        // Handle error here
        console.error(error);
        throw error;
    }
}