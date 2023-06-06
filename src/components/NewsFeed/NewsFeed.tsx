import Post from "./Post";
import PostMaker from "./PostMaker";
import { useUtils, fetchPosts } from "..";
import { useQuery } from "@tanstack/react-query";

const NewsFeed = () => {
  const utils = useUtils();

  const { status, error, data: posts } = useQuery({
    queryKey: ["allposts"],
    queryFn: fetchPosts
  })

  if (status == 'loading') {
    utils?.setLoading(true);
    return <div>loading...</div>
  } else {
    utils?.setLoading(false);
  }

  if (error) console.log(error)

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
