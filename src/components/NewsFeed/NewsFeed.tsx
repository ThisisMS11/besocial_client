import Post from "./Post";
import PostMaker from "./PostMaker";
import { useEffect, useState } from "react";
import axios from "axios";
import { useUtils } from "..";



const NewsFeed = () => {

  /* fetching the posts now */
  const [posts, setPosts] = useState([]);

  const utils = useUtils();


  useEffect(() => {

    /* fetching all posts */
    async function fetchPosts() {

      utils?.setLoading(true);
      const token = localStorage.getItem('token');
      await axios.get(`${import.meta.env.VITE_APP_URL_LOCAL}/api/v1/post/`, {
        headers: {
          'authorisation': `Bearer ${token}`
        }
      })
        .then((response) => {
          console.log(response.data.posts[0].comments);
          setPosts(response.data.posts);
        }).catch((error) => {
          console.log(error);
        })
      utils?.setLoading(false);
    }

    fetchPosts();
  }, [])


  if (!posts) {
    return <div>loading...</div>
  }


  return (
    <div>
      <PostMaker />

      {/* for api call */}
      {posts.length > 0 ? posts.map((post: any) => {
        return <Post images={post.photos} PostContent={post.PostString} user={post.user} likes={post.likes} postId={post.id} createdAt={post.createdAt} comments={post.comments} />
      }) : <div>No Posts found </div>}
    </div>
  );
};

export default NewsFeed;
