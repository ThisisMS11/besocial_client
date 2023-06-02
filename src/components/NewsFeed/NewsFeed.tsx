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

    async function fetchPosts() {

      utils?.setLoading(true);
      const token = localStorage.getItem('token');
      await axios.get(`http://localhost:1983/api/v1/post/`, {
        headers: {
          'authorisation': `Bearer ${token}`
        }
      })
        .then((response) => {
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
      {posts.length > 0 ? posts.map((e: any) => {
        return <Post images={e.photos} PostContent={e.PostString} user={e.user} likes={e.likes} postId={e.id} />
      }) : <div>No Posts found </div>}
    </div>
  );
};

export default NewsFeed;
