import axios from "axios";

/* Create Post Body first */
export async function CreatePostFunc(PostString: string) {
    const token = localStorage.getItem('token');

    try {
        const PostResponse = await axios.post(`${import.meta.env.VITE_APP_SERVER_URL_LOCAL}/api/v1/post/`, { PostString: PostString }, {
            headers: {
                'authorisation': `Bearer ${token}`
            }
        })

        return PostResponse.data.data;
    } catch (error: any) {
        console.log(error);
        throw error;
    }

    // return await axios.post(`${import.meta.env.VITE_APP_SERVER_URL_LOCAL}/api/v1/post/`, { PostString: PostString }, {
    //     headers: {
    //         'authorisation': `Bearer ${token}`
    //     }
    // })
}

/* Upload Post Images to cloudinary */
export async function UploadPostImagesFunc(Formimages: any, postId: string) {

    const token = localStorage.getItem('token');

    return await axios.post(`${import.meta.env.VITE_APP_SERVER_URL_LOCAL}/api/v1/post/uploadImages/${postId}`, Formimages, {
        headers: {
            'Content-Type': 'multipart/form-data',
            'authorisation': `Bearer ${token}`
        }
    })
}

/* Upload Post Videos to cloudinary */
export async function UploadPostVideosFunc(FormVideos: any, postId: string) {

    const token = localStorage.getItem('token');

    return await axios.post(`${import.meta.env.VITE_APP_SERVER_URL_LOCAL}/api/v1/post/uploadImages/${postId}`, FormVideos, {
        headers: {
            'Content-Type': 'multipart/form-data',
            'authorisation': `Bearer ${token}`
        }
    })
}


/* Comment Section */

/* to comment on a post */
export async function CommentOnPostFunc(postId: string, comment: string) {

    const token = localStorage.getItem('token');

    return await axios.put(`${import.meta.env.VITE_APP_SERVER_URL_LOCAL}/api/v1/post/comment/${postId}`, { comment: comment }, {
        headers: {
            'authorisation': `Bearer ${token}`
        }
    })
}




