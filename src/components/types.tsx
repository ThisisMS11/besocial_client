
export interface media {
    public_id?: string;
    url: string;
    _id?: string;
}

export interface User {
    _id?: string;
    name: string;
    email?: string;
    profilePic?: media;
    isVerified?: boolean | undefined;
    unVerfiedEmail?: string;
    createdAt?: string;
    __v?: number;
}

export interface UserInfo {
    success: boolean;
    data: User
}

export interface comment {
    user: User;
    comment: string;
    likes: [
        { _id: string }
    ];
    dislikes: [
        { _id: string }
    ]
    _id: string;
}

export interface CommentParent {
    _id: string;
    postId: string;
    content: comment[];
}

export interface PostProp {
    id: string;
    PostString: string;
    user: User;
    createdAt: string;
    likes: [{
        _id: string;
    }]
    photos?: media[];
    videos?: media[];
    comments: CommentParent[];
}

export interface PostResponse {
    success: boolean;
    data: PostProp[];
}



/* Auth interface */
export interface LoginType{
    email:string,
    password:string
}
